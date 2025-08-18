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
const bloquearLab = async (req, res) => {
    const { tipoLaboratorio, numeroLaboratorio } = req.body;
    try {
        await labsModels.bloquearLab(tipoLaboratorio, numeroLaboratorio);
        return res.status(200).json({ message: 'Laboratório bloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao bloquear laboratório:', error);
        return res.status(500).json({ message: 'Erro ao bloquear laboratório.' });
    }
};

// Desbloquear laboratório
const desbloquearLab = async (req, res) => {
    const { tipoLaboratorio, numeroLaboratorio } = req.body;
    try {
        await labsModels.desbloquearLab(tipoLaboratorio, numeroLaboratorio);
        return res.status(200).json({ message: 'Laboratório desbloqueado com sucesso.' });
    } catch (error) {
        console.error('Erro ao desbloquear laboratório:', error);
        return res.status(500).json({ message: 'Erro ao desbloquear laboratório.' });
    }
};

// Verificar se laboratório está bloqueado
const isLabBloqueado = async (req, res) => {
    const { tipoLaboratorio, numeroLaboratorio } = req.query;
    try {
        const bloqueado = await labsModels.isLabBloqueado(tipoLaboratorio, numeroLaboratorio);
        return res.status(200).json({ bloqueado });
    } catch (error) {
        console.error('Erro ao verificar bloqueio:', error);
        return res.status(500).json({ message: 'Erro ao verificar bloqueio.' });
    }
};
module.exports = {
    getAll,
    getDataFromType,
    bloquearLab,
    desbloquearLab,
    isLabBloqueado,
    getAllLabs
}