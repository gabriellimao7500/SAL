const connection = require('./connection/connection');

const getAll = async() =>{
    const marks = await connection.execute();// query sql para pegar todos os agendamentos
    return marks;
};


module.exports = {
    getAll
};