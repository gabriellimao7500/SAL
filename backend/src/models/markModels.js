const connection = require('./connection/connection');

const getData = async() =>{
    const query = "SELECT * FROM reserva";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};
const createMark = async (markData) => {
    // Verifica se markData é undefined e evita passar valores undefined para a consulta
    if (!Object.values(markData).includes(undefined)) {
        const query = "INSERT INTO marks SET ?";
        const [result] = await connection.execute(query, [markData]);
        return result;
    } else {
        throw new Error("Os parâmetros de ligação não devem conter indefinidos. Para passar SQL NULL, especifique JS null.");
    }
};

const getDataFromId = async(idReserva)=>{
    const query = "SELECT * FROM reserva WHERE idReserva = ?";
    const [marks] = await connection.execute(query,[idReserva]);//query sql para pegar uma reserva especifica
    return marks;
};



module.exports = {
    getData,
    createMark, 
    getDataFromId
};