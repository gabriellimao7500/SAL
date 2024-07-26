const connection = require('./connection/connection');

const = {
    async createRequisicao(requisicaoData) {
        const { dataRequisicao, idProfessorRequisor, idProfessorRequisitado, motivo, statusRequisicao, idReserva } = requisicaoData;
        const query = `
            INSERT INTO requisicao (dataRequisicao, idProfessorRequisor, idProfessorRequisitado, motivo, statusRequisicao, idReserva)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await pool.execute(query, [dataRequisicao, idProfessorRequisor, idProfessorRequisitado, motivo, statusRequisicao, idReserva]);
            return { insertId: result.insertId };
        } catch (err) {
            throw err;
        }
    }
};

const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

const getDataFromId = async(idReserva)=>{
    const query = "SELECT * FROM reserva WHERE idReserva = ?";
    const [marks] = await connection.execute(query,[idReserva]);
    return marks;
};



module.exports = {
    createRequisicao,
    getData,
    getDataFromId
};

