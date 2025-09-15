const connection = require('./connection/connection');
const { format, startOfWeek, endOfWeek } = require('date-fns');

const createReserva = async (reservaData) => {
    const { dataReserva, periodo, aulaReserva, idProfessor, numeroLaboratorio, tipoLaboratorio, motivo } = reservaData;
    //console.log('Dados da reserva:', reservaData);


    const [y, m, d] = dataReserva.split('-').map(Number);
    const data = new Date(y, m - 1, d); // cria no horário local
    const formattedDataReserva = format(data, 'yyyy-MM-dd');


    console.log('Data da reserva formatada:', formattedDataReserva);

    const callQuery = `
        CALL sp_createReserva(?, ?, ?, ?, ?, ?, ?, @result);
    `;
    const selectQuery = `
        SELECT @result AS result;
    `;
    try {
        await connection.query(callQuery, [formattedDataReserva, periodo, aulaReserva, idProfessor, numeroLaboratorio, tipoLaboratorio, motivo]);
        const [rows] = await connection.query(selectQuery);
        const result = rows[0].result;

        if (result === 'Limite de 3 agendamentos por semana atingido para este professor.') {
            return { error: result, type: 'reservation_limit' };
        }
        console.log("Reserva do dia ", formattedDataReserva, " feita.");


        return { message: result };
    } catch (err) {
        console.error('Erro ao criar a reserva no banco de dados:', err.message);
        return { error: 'Erro ao criar a reserva no banco de dados.', details: err.message };
    }
};

const getData = async (periodo, tipoLaboratorio, numeroLaboratorio) => {
    const query = `select idReserva, dataReserva, periodo, aulaReserva, nome, email, tipoLaboratorio, numeroLaboratorio,svg,motivo FROM reserva
                        INNER JOIN professor ON reserva.idProfessor = professor.idProfessor
                        INNER JOIN laboratorio ON reserva.idLaboratorio = laboratorio.idLaboratorio
                   WHERE periodo = ? AND tipoLaboratorio = ? AND numeroLaboratorio = ?
                   ORDER BY 
                        WEEK(dataReserva) ASC,   
                        aulaReserva ASC,         
                        DAYOFWEEK(dataReserva) ASC`;

    const [marks] = await connection.execute(query, [periodo, tipoLaboratorio, numeroLaboratorio]);// query sql para pegar todas as reservas
    return marks;
};

const deleteReserva = async (idReserva) => {
    console.log("[DATABASE MODEL] Deletando reserva:", idReserva);

    const query = 'DELETE FROM reserva WHERE idReserva = ?';
    const values = [idReserva];

    try {
        const [result] = await connection.execute(query, values);
        return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (err) {
        console.error('Erro ao deletar a reserva:', err);
        throw err;
    }
};

const getDataFromDate = async (dataReserva) => {
    const query = "SELECT * FROM reserva WHERE dataReserva = ?";
    const [marks] = await connection.execute(query, [dataReserva]);//query sql para pegar uma reserva especifica
    return marks;
};

const updateReserva = {
    async findById(idReserva) {
        try {
            const [rows] = await connection.query('SELECT * FROM reservas WHERE id = ?', [idReserva]);
            return rows[0];
        } catch (err) {
            console.error('Erro ao buscar reserva:', err);
            throw err;
        }
    },

    async update(idReserva, { idProfessorRequisitor, motivo }) {
        try {
            await connection.query(
                'UPDATE reservas SET idProfessor = ?, motivo = ? WHERE id = ?',
                [idProfessorRequisitor, motivo, idReserva]
            );
        } catch (err) {
            console.error('Erro ao atualizar reserva:', err);
            throw err;
        }
    },

    // Outros métodos conforme necessário
};

const executeRawQuery = async (query) => {
    console.log('Executando query SQL:', query);
    try {
        const [result] = await connection.query(query);
        console.log('Query executada com sucesso:', result);
        return result;
    } catch (err) {
        console.error('Erro ao executar query SQL:', err.message, '\nStack:', err.stack);
        throw err;
    }
};

const deleteReservasExistentes = async (aulaReserva, periodo, dataReserva, idLaboratorio) => {
    //apaga a reserva se existir
    const values = [aulaReserva, periodo, dataReserva, idLaboratorio];
    console.log("Dados para delete:", values);

    // First check if record exists
    const checkQuery = 'SELECT * FROM reserva WHERE aulaReserva = ? AND periodo = ? AND dataReserva = ? AND idLaboratorio = ?';
    let r = await connection.execute(checkQuery, values);
    // console.log("Resultado: ", r);

    const [rows] = r;

    if (rows.length > 0) {
        console.log("Reserva existente encontrada. Deletando...");
        const query = 'DELETE FROM reserva WHERE aulaReserva = ? AND periodo = ? AND dataReserva = ? AND idLaboratorio = ?';
        try {
            const [result] = await connection.execute(query, values);
            console.log(`Reserva ${dataReserva} Deletada.`);

            return result.affectedRows; // Retorna o número de linhas afetadas
        } catch (err) {
            console.error('Erro ao deletar reservas existentes:', err);
            throw err;
        }
    } else {
        console.log("Nenhuma reserva existente encontrada.");
    }

};


const getMarkOfTheHour = async (periodo, aulaReserva, idLaboratorio, dia) => {
    try {
        //console.log("Obtendo marcação da hora:", { periodo, aulaReserva, idLaboratorio, dia });

        const query = "SELECT * FROM reserva WHERE periodo = ? AND aulaReserva = ? AND idLaboratorio = ? AND dataReserva = ?";
        const [marks] = await connection.execute(query, [periodo, aulaReserva, idLaboratorio, dia]);
        return marks;
    } catch (error) {
        console.error("Erro ao obter marcação da hora:", error);
        throw error;
    }
};

const isProfessorAdmin = async (idProfessor) => {
    const query = "SELECT * FROM professor WHERE idProfessor = ? AND rule = 'admin'";
    const [rows] = await connection.execute(query, [idProfessor]);
    return rows.length > 0;
};

module.exports = {
    createReserva,
    getData,
    deleteReserva,
    getMarkOfTheHour,
    getDataFromDate,
    updateReserva,
    executeRawQuery,
    deleteReservasExistentes,
    isProfessorAdmin
};