const connection = require('./connection/connection');

const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

const createMark = async(reserva)=>{
    const {idReserva} = reserva;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO reserva(idReserva, dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [createdMark] = await connection.execute(query, [idReserva,dateUTC, reserva.periodo, reserva.aulaReserva, reserva.idProfessor, reserva.idLaboratorio, reserva.motivo, reserva.turma ] );   
    return {insertId: createdMark.insertId};
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
    getData,
    createMark, 
    deleteMark, 
    getDataFromId
};