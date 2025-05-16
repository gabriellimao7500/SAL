const e = require('express');
const db = require('../models/connection/connection'); // Certifique-se de que você tem um módulo para conectar ao banco de dados

const compareSql = async (req, res) => {
    const { sql } = req.body; // Recebe a query SQL do frontend
    //console.log("Recebendo query SQL do frontend:", sql);

    try {
        // Cria uma tabela temporária para armazenar as novas reservas
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

        // Simula a execução da query SQL para obter as novas reservas sem alterar o banco
        console.log("Simulando execução da query SQL para novas reservas...");

        // Separar múltiplos comandos INSERT e executar um por vez
        const sqlCommands = sql.split(';').filter(cmd => cmd.trim() !== '');
        const newReservations = [];

        // Insere os dados simulados na tabela temporária
        console.log("Inserindo novas reservas na tabela temporária...");
        for (const command of sqlCommands) {
            if (command.trim().toUpperCase().startsWith('INSERT')) {
                await db.query(command.trim().replace('INSERT INTO reserva', 'INSERT INTO temp_reservas'));
            }
        }

        // Busca todas as reservas existentes no banco de dados
        console.log("Buscando reservas existentes no banco de dados...");
        let er = await db.query('SELECT * FROM reserva');

        // Busca as reservas da tabela temporária
        console.log("Buscando reservas da tabela temporária...");
        let nrt = await db.query('SELECT * FROM temp_reservas');

        // Analisa os conflitos entre as novas reservas e as existentes
        console.log("Analisando conflitos...");
        const conflicts = [];

        const newReservationsFromTemp = nrt[0]; // Certifique-se de acessar o índice correto
        const existingReservations = er[0]; // Certifique-se de acessar o índice correto

        //console.log("Antigas reservas: ", existingReservations);
        // console.log("Novas reservas:", newReservationsFromTemp);

        //console.log("Uma nova reserva: ", newReservationsFromTemp[0]);
        //console.log("Uma Antigas reservas: ", existingReservations[0]);

        // Ajuste a lógica de comparação para garantir que os conflitos sejam identificados
        newReservationsFromTemp.forEach((newRes) => {
            existingReservations.forEach((existingRes) => {
                //console.log("Comparando reservas:", newRes, existingRes);

                // Converte as datas para o mesmo formato (YYYY-MM-DD) antes de comparar
                const newResDate = new Date(newRes.dataReserva).toISOString().split('T')[0];
                const existingResDate = new Date(existingRes.dataReserva).toISOString().split('T')[0];

                if (
                    newRes.idLaboratorio == existingRes.idLaboratorio && // Verifica se o laboratório é o mesmo
                    newRes.aulaReserva == existingRes.aulaReserva &&     // Verifica se a aula reservada é a mesma
                    newRes.periodo == existingRes.periodo &&             // Verifica se o período é o mesmo
                    newResDate == existingResDate                        // Verifica se a data é a mesma
                ) {
                    conflicts.push({
                        oldReservation: {
                            idReserva: existingRes.idReserva,
                            dataReserva: existingRes.dataReserva,
                            periodo: existingRes.periodo,
                            aulaReserva: existingRes.aulaReserva,
                            idProfessor: existingRes.idProfessor,
                            idLaboratorio: existingRes.idLaboratorio,
                            motivo: existingRes.motivo
                        },
                        newReservation: {
                            idReserva: newRes.idReserva,
                            dataReserva: newRes.dataReserva,
                            periodo: newRes.periodo,
                            aulaReserva: newRes.aulaReserva,
                            idProfessor: newRes.idProfessor,
                            idLaboratorio: newRes.idLaboratorio,
                            motivo: newRes.motivo
                        }
                    });
                }
            });
        });

        console.log("Conflitos identificados:", conflicts);
        console.log("Total de " + conflicts.length + " conflitos encontrados.");

        res.json({ conflicts, pendingQuery: sql }); // Retorna os conflitos e a query pendente
    } catch (error) {
        console.error("Erro ao buscar conflitos:", error);
        res.status(500).json({ error: "Erro ao processar a query SQL." });
    } finally {
        // Remove a tabela temporária após o uso
        console.log("Removendo tabela temporária...");
        await db.query('DROP TEMPORARY TABLE IF EXISTS temp_reservas');
    }
};

const acceptUpdate = async (req, res) => {
    const { id, updateQuery } = req.body; // Recebe o ID do conflito e a query para aplicar a atualização
    console.log(`Recebendo solicitação para aceitar conflito com ID ${id}. Executando query:`, updateQuery);

    try {
        // Executa a query para aplicar a atualização no banco de dados
        console.log("Aplicando atualização no banco de dados...");
        await db.query(updateQuery);
        console.log("Atualização aplicada com sucesso.");
        res.status(200).send("Conflito aceito e atualização aplicada.");
    } catch (error) {
        console.error("Erro ao aceitar o conflito:", error);
        res.status(500).json({ error: "Erro ao aplicar a atualização." });
    }
};

const rejectUpdate = (req, res) => {
    const { id } = req.body;
    console.log(`Recebendo solicitação para rejeitar conflito com ID ${id}.`);
    // Lógica para rejeitar o conflito (opcional, pode ser apenas uma resposta)
    res.status(200).send("Conflito rejeitado.");
};

const resolveConflict = async (req, res) => {
    const { resolution } = req.body; // Recebe as resoluções do usuário
    console.log("Resolvendo conflitos:", resolution);

    try {
        for (const { action, oldReservation, newReservation } of resolution) {
            if (action === 'acceptNew') {
                // Sobrescreve a reserva antiga com a nova
                await db.query(
                    `UPDATE reserva SET dataReserva = ?, periodo = ?, aulaReserva = ?, idProfessor = ?, idLaboratorio = ?, motivo = ? WHERE idReserva = ?`,
                    [
                        newReservation.dataReserva,
                        newReservation.periodo,
                        newReservation.aulaReserva,
                        newReservation.idProfessor,
                        newReservation.idLaboratorio,
                        newReservation.motivo,
                        oldReservation.idReserva
                    ]
                );
            } else if (action === 'rejectNew') {
                // Mantém a reserva antiga, nenhuma ação necessária
                console.log(`Reserva antiga mantida: ${oldReservation.idReserva}`);
            }
        }

        res.status(200).send("Conflitos resolvidos com sucesso.");
    } catch (error) {
        console.error("Erro ao resolver conflitos:", error);
        res.status(500).json({ error: "Erro ao resolver conflitos." });
    }
};

module.exports = { compareSql, acceptUpdate, rejectUpdate, resolveConflict };
