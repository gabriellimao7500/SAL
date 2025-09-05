const labsModels = require('../models/labsModels');



const getDataFromType = async (req, res) => {
    const { tipoLaboratorio } = req.params;

    if (!tipoLaboratorio) {
        return res.status(400).json({ message: "O campo tipoLaboratorio é obrigatório" });
    }

    try {
        const lab = await labsModels.getDataFromType(tipoLaboratorio);
        return res.status(200).json(lab);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
};

const getAll = async (req, res) => {
    try {
        const labs = await labsModels.getAll();
        return res.status(200).json(labs);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}

const getAllLabs = async (req, res) => {
    try {
        const labs = await labsModels.getAllLabs();
        return res.status(200).json(labs);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
};

// Bloquear laboratório
const bloqueio = async (req, res) => {
    const { tipoLaboratorio, numeroLaboratorio, periodo, action } = req.body;
    if (action == "bloquear") {
        try {
            await labsModels.bloquearLab(tipoLaboratorio, numeroLaboratorio, periodo);
            return res.status(200).json({ message: 'Laboratório bloqueado com sucesso para o período ' + periodo + '.' });
        } catch (error) {
            console.error('Erro ao bloquear laboratório:', error);
            return res.status(500).json({ message: 'Erro ao bloquear laboratório.' });
        }
    } else if (action == "desbloquear") {
        try {
            await labsModels.desbloquearLab(tipoLaboratorio, numeroLaboratorio, periodo);
            return res.status(200).json({ message: 'Laboratório desbloqueado com sucesso para o período ' + periodo + '.' });
        } catch (error) {
            console.error('Erro ao desbloquear laboratório:', error);
            return res.status(500).json({ message: 'Erro ao desbloquear laboratório.' });
        }
    }
};



// Verificar se laboratório está bloqueado
const isLabBloqueado = async (req, res) => {
    const { tipoLaboratorio, numeroLaboratorio, periodo } = req.query;
    try {
        const bloqueado = await labsModels.isLabBloqueado(tipoLaboratorio, numeroLaboratorio, periodo);
        return res.status(200).json({ bloqueado });
    } catch (error) {
        console.error('Erro ao verificar bloqueio:', error);
        return res.status(500).json({ message: 'Erro ao verificar bloqueio.' });
    }
};
module.exports = {
    getAll,
    getDataFromType,
    bloqueio,
    getAllLabs
}