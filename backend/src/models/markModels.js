const connection = require('./connection/connection');

const createReserva = async (reservaData) => {
    const { dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma } = reservaData;
    const query = `
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    // eslint-disable-next-line no-useless-catch
    try {
        const [result] = await connection.execute(query, [dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma]);
        return { insertId: result.insertId };
    } catch (err) {
        throw err;
    }
};

const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

const deleteReserva = async (idReserva) => {

    const query = 'DELETE FROM reserva WHERE idReserva = ?';
    const values = [idReserva]; 

    try {
        const [result] = await connection.execute(query, values);
        return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (err) {
        console.error('Erro ao deletar a reserva:', err);
        throw err;
    }
};

const getDataFromId = async(idReserva)=>{
    const query = "SELECT * FROM reserva WHERE idReserva = ?";
    const [marks] = await connection.execute(query,[idReserva]);//query sql para pegar uma reserva especifica
    return marks;
};

const updateReserva = {
    async findById(idReserva) {
        const [rows] = await connection.query('SELECT * FROM reservas WHERE id = ?', [idReserva]);
        return rows[0];
    },
    async update(idReserva, idRequisicao) {
        const { idProfessorRequisor, motivo} = await this.findById(idRequisicao);
        await connection.query('UPDATE reserva SET idProfessor = ?, motivo = ?, WHERE idReserva = ?', [idProfessorRequisor, motivo, idReserva]);
    },
    // Outros métodos conforme necessário
};

module.exports = {
    createReserva,
    getData, 
    deleteReserva, 
    getDataFromId,
    updateReserva
};