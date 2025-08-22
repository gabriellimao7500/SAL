const db = require('../models/connection/connection'); // Certifique-se de que você tem um módulo para conectar ao banco de dados
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { log } = require('console');

const conflicts = [];

const compareSql = async (req, res) => {
    const { sql } = req.body;
    console.log("Recebendo query SQL do frontend:", sql);

    try {
        conflicts.length = 0; // Limpa os conflitos antes de cada requisição
        console.log("Criando tabela temporária para novas reservas...");
        await db.query(`
            CREATE TEMPORARY TABLE IF NOT EXISTS temp_reservas (
                idReserva INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                dataReserva DATE NOT NULL,
                periodo VARCHAR(5),
                aulaReserva INT NOT NULL,
                idProfessor INT NOT NULL,
                idLaboratorio INT NOT NULL,
                motivo VARCHAR(150)
            )
        `);

        console.log("Inserindo novas reservas na tabela temporária...");
        const sqlCommands = sql.split(';').filter(cmd => cmd.trim() !== '');
        for (const command of sqlCommands) {
            if (command.trim().toUpperCase().startsWith('INSERT')) {
                await db.query(command.trim().replace('INSERT INTO reserva', 'INSERT INTO temp_reservas'));
            }
        }

        console.log("Buscando reservas existentes e temporárias...");
        const [existingReservations] = await db.query('SELECT * FROM reserva');
        const [newReservations] = await db.query('SELECT * FROM temp_reservas');

        console.log("Total de reservas existentes:", existingReservations.length);
        console.log("Total de novas reservas:", newReservations.length);



        console.log("Analisando conflitos...");
        let totalComparisons = 0;
        let totalConflicts = 0;

        newReservations.forEach((newRes, i) => {
            existingReservations.forEach((existingRes, j) => {
                totalComparisons++;
                const newResDate = new Date(newRes.dataReserva).toISOString().split('T')[0];
                const existingResDate = new Date(existingRes.dataReserva).toISOString().split('T')[0];

                if (
                    newRes.idLaboratorio == existingRes.idLaboratorio &&
                    newRes.aulaReserva == existingRes.aulaReserva &&
                    newRes.periodo == existingRes.periodo &&
                    newResDate == existingResDate
                ) {
                    conflicts.push({
                        conflictId: conflicts.length + 1,
                        sql: `INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) VALUES ('${newRes.dataReserva}', '${newRes.periodo}', ${newRes.aulaReserva}, ${newRes.idProfessor}, ${newRes.idLaboratorio}, '${newRes.motivo}')`,
                        existingRes,
                        newRes
                    });
                    totalConflicts++;
                }
                // Log a cada 1000 comparações
                if (totalComparisons % 1000 === 0) {
                    console.log(`Progresso: ${totalComparisons} comparações realizadas, ${totalConflicts} conflitos encontrados até agora...`);
                }
            });
        });
        console.log(`Análise finalizada: ${totalComparisons} comparações, ${totalConflicts} conflitos encontrados.`);
        //console.log("Conflitos identificados:", conflicts);
        res.json({ conflicts, pendingQuery: sql });
    } catch (error) {
        console.error("Erro ao buscar conflitos:", error);
        res.status(500).json({ error: "Erro ao processar a query SQL." });
    } finally {
        console.log("Removendo tabela temporária...");
        await db.query('DROP TEMPORARY TABLE IF EXISTS temp_reservas');
    }
    console.log("Total de conflitos encontrados:", conflicts.length);

};

const acceptConflict = async (req, res) => {
    const { updateQuery } = req.body;
    console.log("Aplicando atualização no banco de dados:", updateQuery);

    try {
        await db.query(updateQuery);
        res.status(200).send("Conflito aceito e atualização aplicada.");
    } catch (error) {
        console.error("Erro ao aceitar o conflito:", error);
        res.status(500).json({ error: "Erro ao aplicar a atualização." });
    }
};

const rejectConflict = (req, res) => {
    console.log("Conflito rejeitado.");
    res.status(200).send("Conflito rejeitado.");
};

const resolveConflict = async (req, res) => {
    const { resolution } = req.body;
    //console.log("Resolvendo conflitos:", resolution[0]);

    const acceptedConflicts = resolution.filter(r => r.action === "acceptNew");
    console.log("Conflitos aceitos:", acceptedConflicts);

    try {
        for (const { action, oldReservation, newReservation } of resolution) {
            if (action === "acceptNew") {
                const formattedDate = new Date(newReservation.dataReserva).toISOString().split('T')[0]; // Formatar a data
                await db.query(
                    `UPDATE reserva SET dataReserva = ?, periodo = ?, aulaReserva = ?, idProfessor = ?, idLaboratorio = ?, motivo = ? WHERE idReserva = ?`,
                    [
                        formattedDate, // Usar a data formatada
                        newReservation.periodo,
                        newReservation.aulaReserva,
                        newReservation.idProfessor,
                        newReservation.idLaboratorio,
                        newReservation.motivo,
                        oldReservation.idReserva
                    ]
                );
            } else if (action === "rejectNew") {
                console.log(`Conflito rejeitado para nova reserva: ${newReservation.idReserva}`);
            }
        }

        res.status(200).send("Conflitos resolvidos com sucesso.");
    } catch (error) {
        console.error("Erro ao resolver conflitos:", error);
        res.status(500).json({ error: "Erro ao resolver conflitos." });
    }
};


const compareSqlFile = async (req, res) => {
    const filePath = req.file.path;
    let connection;
    try {
        let sql = fs.readFileSync(filePath, 'utf8');

        // Remove todos os DELIMITERs
        sql = sql.replace(/^DELIMITER.*$/gmi, '');

        // Troca END $$ ou END$$ ou END\n$$ por END;
        sql = sql.replace(/END\s*\$\$/gmi, 'END;');

        // Extrai o bloco CREATE PROCEDURE ... END;
        const createProcMatch = sql.match(/CREATE PROCEDURE[\s\S]+?END;/i);

        if (!createProcMatch) {
            throw new Error('Procedure não encontrada no arquivo SQL.');
        }

        // Troca todos os INSERT INTO reserva por INSERT INTO temp_reservas
        let procSql = createProcMatch[0].replace(/INSERT INTO reserva/gi, 'INSERT INTO temp_reservas');

        // Usa sempre a mesma conexão!
        connection = await db.getConnection();

        // Cria a tabela temporária
        await connection.query(`
            CREATE TEMPORARY TABLE IF NOT EXISTS temp_reservas (
                idReserva INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                dataReserva DATE NOT NULL,
                periodo VARCHAR(5),
                aulaReserva INT NOT NULL,
                idProfessor INT NOT NULL,
                idLaboratorio INT NOT NULL,
                motivo VARCHAR(150)
            )
        `);

        // Remove a procedure antiga e cria a nova
        await connection.query('DROP PROCEDURE IF EXISTS inserir_reservas');
        await connection.query(procSql);

        // Executa a procedure
        await connection.query('CALL inserir_reservas()');

        // Busca os dados para comparação
        const [existingReservations] = await connection.query('SELECT * FROM reserva');
        const [newReservations] = await connection.query('SELECT * FROM temp_reservas');
        console.log("Total de reservas existentes:", existingReservations.length);
        console.log("Total de novas reservas:", newReservations.length);



        console.log("Analisando conflitos...");
        let totalComparisons = 0;
        let totalConflicts = 0;

        newReservations.forEach((newRes, i) => {
            existingReservations.forEach((existingRes, j) => {
                totalComparisons++;
                const newResDate = new Date(newRes.dataReserva).toISOString().split('T')[0];
                const existingResDate = new Date(existingRes.dataReserva).toISOString().split('T')[0];

                if (
                    newRes.idLaboratorio == existingRes.idLaboratorio &&
                    newRes.aulaReserva == existingRes.aulaReserva &&
                    newRes.periodo == existingRes.periodo &&
                    newResDate == existingResDate
                ) {
                    conflicts.push({
                        conflictId: conflicts.length + 1,
                        sql: `INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) VALUES ('${newRes.dataReserva}', '${newRes.periodo}', ${newRes.aulaReserva}, ${newRes.idProfessor}, ${newRes.idLaboratorio}, '${newRes.motivo}')`,
                        existingRes,
                        newRes
                    });
                    totalConflicts++;
                }
                // Log a cada 1000 comparações
                // if (totalComparisons % 1000 === 0) {
                //     console.log(`Progresso: ${totalComparisons} comparações realizadas, ${totalConflicts} conflitos encontrados até agora...`);
                // }
            });
        });
        console.log(`Análise finalizada: ${totalComparisons} comparações, ${totalConflicts} conflitos encontrados.`);
        //console.log("Conflitos identificados:", conflicts);
        res.json({ conflicts, pendingQuery: sql });

        fs.unlinkSync(filePath);
    } catch (error) {
        console.log("Erro ao processar o arquivo SQL:", error);
        res.status(500).json({ error: 'Erro ao processar o arquivo SQL.' });
    } finally {
        if (connection) connection.release();
    }
}
module.exports = { compareSql, acceptConflict, rejectConflict, resolveConflict, compareSqlFile };
