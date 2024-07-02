const connection = require('./connection/connection');

const getDataFromId = async(idLaboratorio) =>{
    const query = "SELECT * FROM laboratorio WHERE idLaboratorio = ?"
    const [labs] = await connection.execute(query,[idLaboratorio]);// query sql para pegar todas as reservas
    return labs;
};

const getAll = async() =>{
    const query = "SELECT * FROM laboratorio"
    const [labs] = await connection.execute(query);// query sql para pegar todas as reservas
    return labs;
};

module.exports = {
    getDataFromId,
    getAll
};