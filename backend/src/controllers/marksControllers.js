const { response } = require('express');
const markModels = require('../models/markModels');




const getData = async (_req, res) => {
    try {
        const marks = await markModels.getData();
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
}


const createMark = async (req, res) => {
    const createdMark = await markModels.createMark(req.body);
    return res.status(201).json(createdMark);   
}

const deleteMark = async (req, res) => {
    const {id} = req.params;
    await markModels.deleteMark(id);
    return res.status(204).json();
}

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



module.exports = {
    getData,
    createMark,
    deleteMark,
    getDataFromId,
}