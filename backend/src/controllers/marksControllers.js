const labsModels = require('../models/markModels');




const getAll = async (_req, res) => {
    try {
        const marks = await labsModels.getAll();
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}
module.exports = {
    getAll
}