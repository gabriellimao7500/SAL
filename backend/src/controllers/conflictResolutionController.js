const db = require('../models/connection/connection'); // Certifique-se de que você tem um módulo para conectar ao banco de dados

const conflicts = [];

const compareSql = async (req, res) => {
    const { sql } = req.body;
    console.log("Recebendo query SQL do frontend:", sql);

    try {
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

        console.log("Analisando conflitos...");
        newReservations.forEach((newRes) => {
            existingReservations.forEach((existingRes) => {
                const newResDate = new Date(newRes.dataReserva).toISOString().split('T')[0];
                const existingResDate = new Date(existingRes.dataReserva).toISOString().split('T')[0];

                if (
                    newRes.idLaboratorio == existingRes.idLaboratorio &&
                    newRes.aulaReserva == existingRes.aulaReserva &&
                    newRes.periodo == existingRes.periodo &&
                    newResDate == existingResDate
                ) {
                    conflicts.push({
                        existingRes,
                        newRes
                    });
                }
            });
        });

        console.log("Conflitos identificados:", conflicts);
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
    console.log("Resolvendo conflitos:", resolution);

    try {
        for (const { action, oldReservation, newReservation } of resolution) {
            if (action === 'acceptNew') {
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
            }
        }

        res.status(200).send("Conflitos resolvidos com sucesso.");
    } catch (error) {
        console.error("Erro ao resolver conflitos:", error);
        res.status(500).json({ error: "Erro ao resolver conflitos." });
    }
};

module.exports = { compareSql, acceptConflict, rejectConflict, resolveConflict };
