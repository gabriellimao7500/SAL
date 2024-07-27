const reqsModels = require('../models/reqsModels');

const createRequisicao = async (req, res) => {
    try {
        console.log("O corpo da requisição é:", req.body);

        const { dataRequisicao, idProfessorRequisitor, idProfessorRequisitado, motivo, statusRequisicao, idReserva } = req.body;

        if (!dataRequisicao || !idProfessorRequisitor || !idProfessorRequisitado || !motivo || statusRequisicao === undefined || !idReserva) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a requisição.' });
        }

        const requisicaoData = {
            dataRequisicao,
            idProfessorRequisitor,
            idProfessorRequisitado,
            motivo,
            statusRequisicao,
            idReserva
        };

        const createdRequisicao = await reqsModels.createRequisicao(requisicaoData);
        return res.status(201).json({
            message: 'Requisição criada com sucesso.',
            requisicao: createdRequisicao
        });
    } catch (err) {
        console.error('Erro ao criar a requisição:', err);
        return res.status(500).json({ error: 'Erro ao criar a requisição.' });
    }
};

const getData = async (_req,res)=>{
    const requisicao = await reqsModels.getData();
    return res.status(200).json(requisicao);
};

const getDataFromId = async (req, res) => {
    const { idRequisicao } = req.params;
    try {
        const marks = await reqsModels.getDataFromId(idRequisicao);
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({ message: 'Error retrieving data' });
    }
};

const deleteReq = async (req, res) => {
    const { idRequisicao } = req.params;
    console.log("A requisição deletada é: " + idRequisicao);
    if (!idRequisicao) {
        return res.status(400).json({ error: 'ID não fornecido.' });
    }

    try {
        const result = await reqsModels.deleteReq(Number(idRequisicao)); // Converta o ID para número
        
        if (result > 0) {
            return res.status(200).json({ message: 'Requisição deletada com sucesso.' });
        } else {
            return res.status(404).json({ error: 'Requisição não encontrada.' });
        }
    } catch (err) {
        console.error('Erro ao deletar a requisição:', err);
        return res.status(500).json({ error: 'Erro ao deletar a requisição.' });
    }
};

module.exports = {
    createRequisicao,
    getData,
    getDataFromId,
    deleteReq

};