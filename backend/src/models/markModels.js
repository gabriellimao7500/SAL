const connection = require('./connection/connection');

const getAll = async() =>{
    const [marks] = await connection.execute("SELECT * FROM reserva");// query sql para pegar todas as reservas
    return marks;
};

module.exports = {
    getAll
};