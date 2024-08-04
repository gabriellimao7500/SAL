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
module.exports = {
    getAll,
    getDataFromType
}