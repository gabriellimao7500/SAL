const connection = require('./connection/connection');

const createMark = async (reservaData) => {
    const query = `
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        reservaData.dataReserva,
        reservaData.periodo,
        reservaData.aulaReserva,
        reservaData.idProfessor,
        reservaData.idLaboratorio,
        reservaData.motivo,
        reservaData.turma
    ];

    try {
        const [result] = await connection.execute(query, values);
        return { 
            insertId: result.insertId, 
            ...reservaData 
        };
    } catch (err) {
        console.error('Erro ao criar a reserva:', err);
        throw err;
    }
};


const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};
  
const deleteMark = async (id) => {
    const deletedTask = await connection.execute("DELETE FROM tasks WHERE id = ?",[id]);
    return deletedTask;
};

const getDataFromId = async(idReserva)=>{
    const query = "SELECT * FROM reserva WHERE idReserva = ?";
    const [marks] = await connection.execute(query,[idReserva]);//query sql para pegar uma reserva especifica
    return marks;
};



module.exports = {
    createMark,
    getData, 
    deleteMark, 
    getDataFromId
};