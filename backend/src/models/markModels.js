const connection = require('./connection/connection');

const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

const createMark = async (markData) => {
    const query = `
        INSERT INTO reserva (idReserva, dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo, turma)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [
            markData.idReserva,
            markData.dataReserva,
            markData.periodo,
            markData.aulaReserva,
            markData.idProfessor,
            markData.idLaboratorio,
            markData.motivo,
            markData.turma
        ], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
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