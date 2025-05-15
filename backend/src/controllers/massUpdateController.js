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
                idReserva INT AUTO_INCREMENT PRIMARY KEY,
                idLaboratorio INT,
                periodo VARCHAR(50),
                aulaReserva VARCHAR(50),
                dataReserva DATE,
                idProfessor INT,
                motivo VARCHAR(255)
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

        const newReservationsFromTemp = nrt[0];
        const existingReservations = er[0];

        console.log("Antigas reservas: ", existingReservations[0]);
        console.log("Novas reservas:", newReservationsFromTemp[0]);

        newReservationsFromTemp.forEach((newRes) => {
            existingReservations.forEach((existingRes) => {
                if (
                    newRes.idLaboratorio === existingRes.idLaboratorio &&
                    newRes.periodo === existingRes.periodo &&
                    newRes.aulaReserva === existingRes.aulaReserva
                ) {
                    conflicts.push({
                        idReserva: existingRes.idReserva,
                        dataReserva: existingRes.dataReserva,
                        periodo: existingRes.periodo,
                        aulaReserva: existingRes.aulaReserva,
                        idProfessor: existingRes.idProfessor,
                        idLaboratorio: existingRes.idLaboratorio,
                        motivo: existingRes.motivo
                    });
                }
            });
        });

        console.log("Conflitos identificados:", conflicts);
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

module.exports = { compareSql, acceptUpdate, rejectUpdate };
