const connection = require('../models/connection/connection');

const criarAgendamentosEmSerie = async (req, res) => {
    console.log("criarAgendamentosEmSerie");
    console.log(req.body);
    try {
        const { horarios, dataInicio, dataFim } = req.body;

        // Função para obter todas as datas do dia da semana entre dataInicio e dataFim
        function getDatasRecorrentes(diaSemana, dataInicio, dataFim) {
            const dias = [];
            let atual = new Date(dataInicio);
            const fim = new Date(dataFim);
            // 0 = segunda, 2 = terça, ..., 4 = sexta
            const alvo = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'].indexOf(diaSemana.toLowerCase());
            console.log(alvo);

            // Ajusta para o primeiro dia útil
            while (atual.getDay() !== alvo) {
                atual.setDate(atual.getDate() + 1);
            }
            while (atual <= fim) {
                dias.push(new Date(atual));
                atual.setDate(atual.getDate() + 7);
            }
            console.log("Atual: ", atual);
            console.log("dias: ", dias);
            return dias;
        }

        for (const horario of horarios) {
            const datas = getDatasRecorrentes(horario.diaSemana, dataInicio, dataFim);
            for (const data of datas) {
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

        return res.status(201).json({ message: 'Agendamentos criados com sucesso!', quantidade: horarios.length });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar agendamentos em série.' });
    }
};

module.exports = { criarAgendamentosEmSerie };