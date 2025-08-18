const connection = require('./connection/connection');

const getDataFromType = async (tipoLaboratorio) => {
    if (!tipoLaboratorio) {
        throw new Error("Tipo de laboratório não fornecido");
    }

    const query = "SELECT tipoLaboratorio, numeroLaboratorio FROM laboratorio WHERE tipoLaboratorio = ? ORDER BY numeroLaboratorio ASC";

    try {
        const [labs] = await connection.execute(query, [tipoLaboratorio]);
        return labs;
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw new Error("Erro ao obter dados do laboratório");
    }
};



const getAll = async () => {
    const query = `SELECT * FROM laboratorio WHERE idLaboratorio IN (SELECT MIN(idLaboratorio) FROM laboratorio GROUP BY tipoLaboratorio) ORDER BY tipoLaboratorio ASC;`;
    const [labs] = await connection.execute(query);
    return labs;
};

const getAllLabs = async () => {
    const query = `SELECT * FROM laboratorio ORDER BY tipoLaboratorio ASC;`;
    const [labs] = await connection.execute(query);
    return labs;
};

// Métodos para bloqueio usando atributo na tabela laboratorio
const bloquearLab = async (tipoLaboratorio, numeroLaboratorio) => {
    const query = `UPDATE laboratorio SET bloqueado = 1 WHERE tipoLaboratorio = ? AND numeroLaboratorio = ?;`;
    await connection.execute(query, [tipoLaboratorio, numeroLaboratorio]);
    return true;
};

const desbloquearLab = async (tipoLaboratorio, numeroLaboratorio) => {
    const query = `UPDATE laboratorio SET bloqueado = 0 WHERE tipoLaboratorio = ? AND numeroLaboratorio = ?;`;
    await connection.execute(query, [tipoLaboratorio, numeroLaboratorio]);
    return true;
};

const isLabBloqueado = async (tipoLaboratorio, numeroLaboratorio) => {
    const query = `SELECT bloqueado FROM laboratorio WHERE tipoLaboratorio = ? AND numeroLaboratorio = ? LIMIT 1;`;
    const [rows] = await connection.execute(query, [tipoLaboratorio, numeroLaboratorio]);
    return rows.length > 0 && rows[0].bloqueado === 1;
};

module.exports = {
    getDataFromType,
    getAll,
    bloquearLab,
    desbloquearLab,
    isLabBloqueado,
    getAllLabs
};