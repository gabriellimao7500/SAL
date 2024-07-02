const connection = require('./connection/connection');



const getAll = async() =>{
    const query = "SELECT * FROM reserva"
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

module.exports = {
    getAll
};