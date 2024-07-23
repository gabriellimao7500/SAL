const markModels = require('../models/markModels');

const createMark = async (req, res) => {
    try {
        // Verifica se o corpo da requisição contém todos os dados necessários
        if (!req.body) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a reserva.' });
        }

        const { dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma } = req.body;

        if (!dataReserva || !aulaReserva || !idProfessor || !idLaboratorio || !motivo) {
            return res.status(400).json({ error: 'Dados insuficientes para criar a reserva.' });
        }
        // Chama a função do modelo para criar a reserva
        const reservaData = {
            dataReserva,
            periodo,
            aulaReserva,
            idProfessor,
            idLaboratorio,
            motivo,
            turma
        };

        const createdReserva = await createMark(reservaData);

        // Retorna a resposta com o status 201 (Created) e os dados da reserva criada
        return res.status(201).json({
            message: 'Reserva criada com sucesso.',
            reserva: createdReserva
        });
    } catch (err) {
        // Em caso de erro, retorna a resposta com o status 500 (Internal Server Error) e a mensagem de erro
        console.error('Erro ao criar a reserva:', err);
        return res.status(500).json({ error: 'Erro ao criar a reserva.' });
    }
};

const getData = async (_req, res) => {
    try {
        const marks = await markModels.getData();
        return res.status(200).json(marks);
    } catch (error) {
        console.error('Erro ao obter dados:', error);
        return res.status(500).json({ message: "Erro ao obter dados" });
    }
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
    createMark,
    getData,
    deleteMark,
    getDataFromId,
}