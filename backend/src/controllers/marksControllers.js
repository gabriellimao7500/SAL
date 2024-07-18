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
    try {
        console.log('Corpo da requisição:', req.body); // Verifique o conteúdo do req.body

        const { idReserva, dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma } = req.body;

        // Verificação básica dos dados recebidos
        if (!idReserva || !dataReserva || !periodo || !aulaReserva || !idProfessor || !idLaboratorio || !motivo || !turma) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const createdMark = await markModels.createMark(req.body);

        res.status(201).json(createdMark);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao criar a marcação.' });
    }
};

    

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