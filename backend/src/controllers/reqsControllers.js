const profModels = require('../models/reqsModels');

const getData = async (_req,res)=>{
    const prof = await profModels.getData();
    return res.status(200).json(prof);
};

module.exports = {
    getData
};