const connection = require('./connection/connection');

const createRequisicao = async (requisicaoData) => {
    const { dataRequisicao, idProfessorRequisitor, idProfessorRequisitado, motivo, statusRequisicao, idReserva } = requisicaoData;
    const query = `
        INSERT INTO requisicao (dataRequisicao, idProfessorRequisitor, idProfessorRequisitado, motivo, statusRequisicao, idReserva)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    // eslint-disable-next-line no-useless-catch
    try {
        const [result] = await connection.execute(query, [dataRequisicao, idProfessorRequisitor, idProfessorRequisitado, motivo, statusRequisicao, idReserva]);
        return { insertId: result.insertId };
    } catch (err) {
        throw err;
    }
};

const getData = async() =>{
    const query = "SELECT * FROM requisicao";
    const [marks] = await connection.execute(query);// query sql para pegar todas as reservas
    return marks;
};

const getDataFromId = async(idRequisicao)=>{
    const query = "SELECT * FROM requisao WHERE idRequisicao = ?";
    const [marks] = await connection.execute(query,[idRequisicao]);
    return marks;
};

const deleteReq = async (idRequisicao) => {

    const query = 'DELETE FROM requisicao WHERE idRequisicao = ?';
    const values = [idRequisicao]; 

    try {
        const [result] = await connection.execute(query, values);
        return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (err) {
        console.error('Erro ao deletar a requisição:', err);
        throw err;
    }
};



module.exports = {
    createRequisicao,
    getData,
    getDataFromId,
    deleteReq
};

