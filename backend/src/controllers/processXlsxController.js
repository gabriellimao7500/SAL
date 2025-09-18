const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const connection = require('../models/connection/connection'); // use o objeto connection diretamente
require('dotenv').config();

exports.handleUpload = async (req, res) => {
    const steps = [];
    steps.push("Iniciando o processamento do arquivo XLSX...");

    if (!req.file) {
        steps.push("Nenhum arquivo enviado.");
        console.error("[processXlsxController] Nenhum arquivo enviado na requisição.");
        return res.status(400).json({ error: 'Nenhum arquivo enviado.', steps });
    }

    steps.push(`Arquivo XLSX recebido: ${req.file.originalname}`);

    // Caminho do arquivo salvo
    const xlsxPath = path.resolve(req.file.path);

    steps.push(`Caminho do arquivo: ${xlsxPath}`);

    exec(`${process.env.PLATAFORM == 'LINUX' ? 'python3' : 'python'} "${path.resolve(__dirname, '../../process_xlsx.py')}" "${xlsxPath}"`, async (error, stdout, stderr) => {
        fs.unlink(xlsxPath, (err) => {
            if (err) {
                steps.push(`Erro ao excluir arquivo XLSX: ${err.message}`);
                console.error(`[processXlsxController] Erro ao excluir arquivo XLSX: ${err.message}`);
            } else {
                steps.push(`Arquivo XLSX excluído: ${xlsxPath}`);
            }
        });

        if (error) {
            steps.push("Erro ao processar XLSX.");
            if (stderr) steps.push(stderr);
            if (stdout) steps.push(stdout);
            console.error("[processXlsxController] Erro ao processar XLSX:", error);
            if (stderr) console.error("[processXlsxController] STDERR:", stderr);
            if (stdout) console.error("[processXlsxController] STDOUT:", stdout);
            return res.status(500).json({ error: 'Erro ao processar arquivo.', steps });
        }
        if (stderr) {
            steps.push("Log do processamento Python:");
            steps.push(stderr);
            console.error("[processXlsxController] STDERR do Python:", stderr);
        }
        if (stdout) {
            steps.push("Log do processamento Python:");
            steps.push(stdout);
            console.log("[processXlsxController] STDOUT do Python:", stdout);
        }

        // Caminho do arquivo SQL gerado pelo Python
        const sqlFilePath = path.resolve(__dirname, 'sql/inserir_reservas.sql');

        steps.push(`Arquivo SQL gerado: ${sqlFilePath}`);
        steps.push("Executando procedure SQL diretamente no backend...");

        try {
            // Lê o conteúdo do arquivo SQL
            let sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');
            // Remove linhas DELIMITER
            sqlContent = sqlContent
                .split('\n')
                .filter(line => !line.trim().startsWith('DELIMITER'))
                .join('\n');

            await connection.query(`DROP PROCEDURE IF EXISTS inserir_reservas`)

            // Executa o bloco inteiro da procedure como uma única query
            await connection.query(sqlContent);
            console.log("[processXlsxController] Procedure criada/executada com sucesso.");

            steps.push("Procedure criada/executada com sucesso.");

            // Executa a procedure para inserir as reservas
            await connection.query("CALL inserir_reservas;");
            console.log("[processXlsxController] Procedure inserida com sucesso.");

            steps.push("CALL inserir_reservas executado com sucesso.");
        } catch (err) {
            steps.push(`Erro ao executar procedure SQL: ${err.message}`);
            console.error(`[processXlsxController] Erro ao executar procedure SQL: ${err.message}`);
            return res.status(500).json({ error: 'Erro ao executar procedure SQL.', steps });
        }

        fs.unlink(sqlFilePath, (unlinkErr) => {
            if (unlinkErr) {
                steps.push(`Erro ao excluir arquivo SQL: ${unlinkErr.message}`);
                console.error(`[processXlsxController] Erro ao excluir arquivo SQL: ${unlinkErr.message}`);
            } else {
                steps.push(`Arquivo SQL excluído: ${sqlFilePath}`);
            }
        });

        steps.push("Arquivo processado, agendamentos inseridos e procedure executada.");
        res.json({
            message: 'Arquivo processado, agendamentos inseridos e procedure executada.',
            steps
        });
    });
};