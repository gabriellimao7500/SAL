const markModels = require('../models/markModels');

const createMark = async (req, res) => {
    try {
        
        const { dataReserva, periodo, aulaReserva, idProfessor,numeroLaboratorio,tipoLaboratorio, motivo} = req.body;


        if (!dataReserva || !aulaReserva || !idProfessor || !numeroLaboratorio||!tipoLaboratorio || !motivo) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a reserva.' });
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
        return res.status(201).json({
            message: 'Reserva criada com sucesso.',
            reserva: createdReserva
        });
    } catch (err) {
        console.error('Erro ao criar a reserva:', err);
        return res.status(500).json({ error: 'Erro ao criar a reserva.' });
    }
};

const getData = async (req, res) => {
    const{periodo,tipoLaboratorio,numeroLaboratorio} = req.body;
    
    try {
        const marks = await markModels.getData(periodo,tipoLaboratorio,numeroLaboratorio);
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}

const deleteMark = async (req, res) => {
    const { idReserva } = req.params;
    console.log("A reserva deletada é: " + idReserva)
    if (!idReserva) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        const result = await markModels.deleteReserva(Number(idReserva)); // Converta o ID para número
        
        if (result > 0) {
            return res.status(200).json({ message: 'Reserva deletada com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }
    } catch (err) {
        console.error('Erro ao deletar a reserva:', err);
        return res.status(500).json({ error: 'Erro ao deletar a reserva.' });
    }
};

const getDataFromId = async (req, res) =>{
    const {idReserva} = req.params;
    try{
        const marks = await markModels.getDataFromId(idReserva);
        return marks;
    }catch(error){
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




module.exports = {
    createMark,
    getData,
    deleteMark,
    getDataFromId,
    updateReserva,
}