const markModels = require('../models/markModels');
const labsModels = require('../models/labsModels');

function calcularDiasSemana(startDate, endDate, dayOfWeek) {
    // dayOfWeek: 1=segunda, 2=terça, ..., 5=sexta
    const result = [];

    // Converte entrada para data no fuso local com hora 00:00 para evitar deslocamentos por timezone
    function toLocalDate(dateInput) {
        if (typeof dateInput === 'string') {
            const parts = dateInput.split('-').map(Number);
            if (parts.length === 3) {
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
        }
        const d = new Date(dateInput);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    let current = toLocalDate(startDate);
    const end = toLocalDate(endDate);

    while (current <= end) {
        if (current.getDay() === dayOfWeek) {
            result.push(new Date(current)); // data local (sem hora)
        }
        current.setDate(current.getDate() + 1);
    }
    return result;
}

const createMark = async (req, res) => {
    try {
        const { dataReserva, periodo, aulaReserva, idProfessor, numeroLaboratorio, tipoLaboratorio, motivo } = req.body;

        if (!dataReserva || !aulaReserva || !idProfessor || !numeroLaboratorio || !tipoLaboratorio || !motivo) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a reserva.' });
        }

        // Verifica se o laboratório está bloqueado
        const bloqueado = await labsModels.isLabBloqueado(tipoLaboratorio, numeroLaboratorio);
        if (bloqueado) {
            return res.status(403).json({ error: 'Este laboratório está bloqueado para reservas.', type: 'lab_blocked' });
        }

        const reservaData = {
            dataReserva,
            periodo,
            aulaReserva,
            idProfessor,
            numeroLaboratorio,
            tipoLaboratorio,
            motivo
        };



        const createdReserva = await markModels.createReserva(reservaData);
        console.log("Reserva criada com sucesso: ", createdReserva);
        if (createdReserva.error) {
            return res.status(403).json({ error: createdReserva.error, type: 'reservation_limit' });
        }

        return res.status(201).json({
            message: 'Reserva criada com sucesso.',
            reserva: createdReserva
        });
    } catch (err) {
        console.error('Erro ao criar a reserva:', err);
        return res.status(500).json({ error: 'Erro ao criar a reserva.' });
    }

};

const createMarkFromTo = async (req, res) => {
    // Lógica para criar marcações de um intervalo de tempo

    const instrucoesReserva = {
        endDate: req.body.endDate,
        startDate: req.body.startDate,
        periodo: req.body.periodo,
        aulaReserva: req.body.aulaReserva,
        idProfessor: req.body.idProfessor,
        tipoLaboratorio: req.body.tipoLaboratorio,
        numeroLaboratorio: req.body.numeroLaboratorio,
        svg: "",
        motivo: req.body.motivo,
        diaDaSemana: req.body.diaDaSemana
    };

    console.log(instrucoesReserva);

    // Calcula os dias corretos do intervalo
    const dias = calcularDiasSemana(instrucoesReserva.startDate, instrucoesReserva.endDate, instrucoesReserva.diaDaSemana);
    // Retorna array de datas em formato local (apenas dia) para evitar deslocamento por timezone
    const pad = (n) => n < 10 ? '0' + n : String(n);
    const datasFormatadas = dias.map(d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
    console.log("Datas calculadas:", datasFormatadas);

    //Criando reservas com base nas datas encontradas
    const reservasCriadas = await Promise.all(datasFormatadas.map(async (data) => {
        const reservaData = {
            dataReserva: data,
            periodo: instrucoesReserva.periodo,
            aulaReserva: instrucoesReserva.aulaReserva,
            idProfessor: instrucoesReserva.idProfessor,
            tipoLaboratorio: instrucoesReserva.tipoLaboratorio,
            numeroLaboratorio: instrucoesReserva.numeroLaboratorio,
            svg: "",
            motivo: instrucoesReserva.motivo,
            idProfessor: instrucoesReserva.idProfessor
        };

        //Primeiro apaga as reservas existentes usando o numero da aula, horário e dia
        console.log("Deletando reserva: ", reservaData);

        await markModels.deleteReservasExistentes(reservaData.aulaReserva, reservaData.periodo, reservaData.dataReserva);

        console.log(
            "Fazendo reserva para o professor id: ", instrucoesReserva.idProfessor,
            " na aula: ", instrucoesReserva.aulaReserva,
            " com motivo: ", instrucoesReserva.motivo
        );

        return await markModels.createReserva(reservaData);
    }));

    console.log("Reservas criadas:", reservasCriadas);
    res.status(201).json({ message: "Reservas criadas com sucesso.", reservas: reservasCriadas });
}

const getData = async (req, res) => {
    const { periodo, tipoLaboratorio, numeroLaboratorio } = req.body;

    try {
        const marks = await markModels.getData(periodo, tipoLaboratorio, numeroLaboratorio);
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
};

const deleteMark = async (req, res) => {
    const { idReserva } = req.params;
    console.log("[DATABASE] Deletando reserva:", idReserva);

    if (!idReserva) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        const result = await markModels.deleteReserva(Number(idReserva)); // Converta o ID para número

        if (result > 0) {
            console.log("[DATABASE] Reserva deletada com sucesso:", idReserva);
            return res.status(200).json({ message: 'Reserva deletada com sucesso.' });
        } else {
            console.log("[DATABASE] Reserva não encontrada:", idReserva);
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
    } catch (err) {
        console.error('Erro ao deletar a reserva:', err);
        return res.status(500).json({ error: 'Erro ao deletar a reserva.' });
    }
};

const getDataFromId = async (req, res) => {
    const { idReserva } = req.params;
    try {
        const marks = await markModels.getDataFromId(idReserva);
        return marks;
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
};

const updateReserva = async (req, res) => {
    try {
        const { idReserva } = req.params;
        const { idProfessorRequisitor, motivo } = req.body;
        console.log("Parâmetros recebidos:", req.params);
        console.log("Corpo da requisição:", req.body);
        console.log("A requisição atualizada é: " + [idReserva, idProfessorRequisitor, motivo]);

        // Verifica se a reserva existe
        const reserva = await markModels.findById(idReserva);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva não encontrada' });
        }

        // Atualiza a reserva
        await markModels.update(idReserva, { idProfessorRequisitor, motivo });

        return res.status(200).json({ message: 'Reserva atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar a reserva:', error);
        return res.status(500).json({ message: 'Erro ao atualizar a reserva', error });
    }
};

const executeRawQuery = async (query) => {
    console.log('Executando query SQL:', query);

    try {
        const result = await markModels.executeRawQuery(query);
        console.log('Query executada com sucesso:', result);

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createMark,
    getData,
    deleteMark,
    getDataFromId,
    updateReserva,
    executeRawQuery,
    createMarkFromTo // exporta o novo método
}