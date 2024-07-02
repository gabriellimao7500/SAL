const profModels = require('../models/profModels');


const getData = async (_req, res) => {
    try {
        const prof = await profModels.getData();
        return res.status(200).json(prof);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
};

const getDataFromId = async (req, res) => {
    const { idProfessor } = req.params;
    try {
        const prof = await profModels.getDataFromId(idProfessor);
        return res.status(200).json(prof);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}

const updateImagem = async (req, res) => {
    const { idProfessor } = req.params;
    const { imagem } = req.body;
    
    try {
        const result = await profModels.updateImagem(idProfessor, imagem);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar imagem do professor:', error);
        return res.status(500).json({ message: "Erro ao atualizar imagem do professor" });
    }
};

const updateSenha = async (req, res) => {
    const { idProfessor } = req.params;
    const { senha } = req.body;
    
    try {
        const result = await profModels.updateSenha(idProfessor, senha);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar imagem do professor:', error);
        return res.status(500).json({ message: "Erro ao atualizar imagem do professor" });
    }
};



module.exports = {
    getData,
    getDataFromId,
    updateImagem,
    updateSenha
};
