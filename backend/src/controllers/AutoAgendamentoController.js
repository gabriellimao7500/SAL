const connection = require('../models/connection/connection');

const criarAgendamentosEmSerie = async (req, res) => {
    console.log("criarAgendamentosEmSerie");
    try {
        const { horarios, dataInicio, dataFim, sobrescrever } = req.body;
        if (!horarios || horarios.length === 0) {
            return res.status(400).json({ error: 'Nenhum horário fornecido.' });
        }
        if (!dataInicio || !dataFim) {
            return res.status(400).json({ error: 'Datas de início e fim não fornecidas.' });
        }
        if (new Date(dataFim) < new Date(dataInicio)) {
            return res.status(400).json({ error: 'A data final deve ser igual ou posterior à data inicial.' });
        }

        // Função para obter todas as datas do dia da semana entre dataInicio e dataFim
        function getDatasRecorrentes(diaSemana, dataInicio, dataFim) {
            const dias = [];
            let atual = new Date(dataInicio);
            const fim = new Date(dataFim);
            // 0 = segunda, 2 = terça, ..., 4 = sexta
            const alvo = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'].indexOf(diaSemana.toLowerCase());
            //console.log(alvo);

            // Ajusta para o primeiro dia útil
            while (atual.getDay() !== alvo) {
                atual.setDate(atual.getDate() + 1);
            }
            while (atual <= fim) {
                dias.push(new Date(atual));
                atual.setDate(atual.getDate() + 7);
            }
            //console.log("Atual: ", atual);
            //console.log("dias: ", dias);
            return dias;
        }

        let conflitos = [];
        for (const horario of horarios) {
            const datas = getDatasRecorrentes(horario.diaSemana, dataInicio, dataFim);
            for (const data of datas) {
                // Verifica se já existe reserva para o mesmo horário/data
                const [rows] = await connection.execute(
                    `SELECT idReserva FROM reserva 
                     WHERE dataReserva = ? AND periodo = ? AND aulaReserva = ? AND idLaboratorio = ?`,
                    [
                        data.toISOString().slice(0, 10),
                        horario.periodo,
                        horario.aulaReserva,
                        horario.idLaboratorio
                    ]
                );

                if (rows.length > 0) {
                    if (sobrescrever) {
                        // Deleta o(s) conflito(s)
                        await connection.execute(
                            `DELETE FROM reserva 
                             WHERE dataReserva = ? AND periodo = ? AND aulaReserva = ? AND idLaboratorio = ?`,
                            [
                                data.toISOString().slice(0, 10),
                                horario.periodo,
                                horario.aulaReserva,
                                horario.idLaboratorio
                            ]
                        );
                    } else {
                        conflitos.push({
                            dataReserva: data.toISOString().slice(0, 10),
                            periodo: horario.periodo,
                            aulaReserva: horario.aulaReserva,
                            idLaboratorio: horario.idLaboratorio
                        });
                        continue; // pula a inserção deste
                    }
                }

                // Insere o novo agendamento
                await connection.execute(
                    `INSERT INTO reserva 
                        (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        data.toISOString().slice(0, 10),
                        horario.periodo,
                        horario.aulaReserva,
                        horario.idProfessor,
                        horario.idLaboratorio,
                        horario.motivo
                    ]
                );
            }
        }

        if (conflitos.length > 0 && !sobrescrever) {
            return res.status(200).json({
                error: 'Conflitos encontrados.',
                conflitos
            });
        }

        return res.status(201).json({ message: 'Agendamentos criados com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar agendamentos em série.' });
    }
};

module.exports = { criarAgendamentosEmSerie };