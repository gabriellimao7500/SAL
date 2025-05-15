const db = require('../models/connection/connection'); // Certifique-se de que você tem um módulo para conectar ao banco de dados

const getConflicts = async (req, res) => {
    const { sql } = req.body; // Recebe a query SQL do frontend
    console.log("Recebendo query SQL do frontend:", sql);

    try {
        // Executa a query SQL enviada pelo usuário para obter as novas reservas
        console.log("Executando query SQL para novas reservas...");
        const newReservations = await db.query(sql);
        console.log("Novas reservas obtidas:", newReservations);

        // Busca todas as reservas existentes no banco de dados
        console.log("Buscando reservas existentes no banco de dados...");
        const existingReservations = await db.query('SELECT * FROM reservas');
        console.log("Reservas existentes obtidas:", existingReservations);

        // Analisa os conflitos entre as novas reservas e as existentes
        console.log("Analisando conflitos...");
        const conflicts = [];
        newReservations.forEach((newRes, index) => {
            existingReservations.forEach((existingRes) => {
                if (
                    newRes.laboratorio === existingRes.laboratorio &&
                    newRes.periodo === existingRes.periodo &&
                    newRes.aula === existingRes.aula &&
                    newRes.data === existingRes.data
                ) {
                    console.log(`Conflito detectado: Nova reserva ${JSON.stringify(newRes)} entra em conflito com reserva existente ${JSON.stringify(existingRes)}`);
                    conflicts.push({
                        id: conflicts.length + 1,
                        description: `Conflito detectado no laboratório ${newRes.laboratorio}, período ${newRes.periodo}, aula ${newRes.aula}`,
                        existing: {
                            lab: existingRes.laboratorio,
                            period: existingRes.periodo,
                            class: existingRes.aula,
                            professor: existingRes.professor,
                            description: existingRes.descricao,
                            date: existingRes.data
                        },
                        new: {
                            lab: newRes.laboratorio,
                            period: newRes.periodo,
                            class: newRes.aula,
                            professor: newRes.professor,
                            description: newRes.descricao,
                            date: newRes.data
                        }
                    });
                }
            });
        });

        console.log("Conflitos identificados:", conflicts);
        res.json(conflicts);
    } catch (error) {
        console.error("Erro ao buscar conflitos:", error);
        res.status(500).json({ error: "Erro ao processar a query SQL." });
    }
};

const acceptConflict = async (req, res) => {
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

const rejectConflict = (req, res) => {
    const { id } = req.body;
    console.log(`Recebendo solicitação para rejeitar conflito com ID ${id}.`);
    // Lógica para rejeitar o conflito (opcional, pode ser apenas uma resposta)
    res.status(200).send("Conflito rejeitado.");
};

module.exports = { getConflicts, acceptConflict, rejectConflict };
