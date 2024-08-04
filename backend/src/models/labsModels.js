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


const getAll = async() =>{
    const query = `SELECT 
    tipoLaboratorio,
    GROUP_CONCAT(DISTINCT svg) AS svg
FROM 
    laboratorio
GROUP BY 
    tipoLaboratorio;
`;
    const [labs] = await connection.execute(query);// query sql para pegar todas as reservas
    return labs;
};

module.exports = {
    getDataFromType,
    getAll
};