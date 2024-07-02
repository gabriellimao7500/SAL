const labsModels = require('../models/labsModels');



const getDataFromId = async (req, res) => {
    const { idLaboratorio } = req.params;
    try {
        const lab = await labsModels.getDataFromId(idLaboratorio);
        return res.status(200).json(lab);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}
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
    getDataFromId
}