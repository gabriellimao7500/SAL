const profModels = require('../models/profModels');
const reqsModels = require('../models/reqsModels');


const createRequisicao = async (req, res) => {
    try {
        console.log("O corpo da requisição é:", req.body);

        const { dataRequisicao, idProfessorRequisor, idProfessorRequisitado, motivo, statusRequisicao, idReserva } = req.body;

        if (!dataRequisicao || !idProfessorRequisor || !idProfessorRequisitado || !motivo || statusRequisicao === undefined || !idReserva) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a requisição.' });
        }

        const requisicaoData = {
            dataRequisicao,
            idProfessorRequisor,
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
    const prof = await profModels.getData();
    return res.status(200).json(prof);
};

const getDataFromId = async (req, res) => {
    const { idReserva } = req.params;
    try {
        const marks = await reqsModels.getDataFromId(idReserva);
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({ message: 'Error retrieving data' });
    }
};

module.exports = {
    createRequisicao,
    getData,
    getDataFromId,

};