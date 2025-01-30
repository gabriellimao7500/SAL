const connection = require('./connection/connection');
const { format, startOfWeek, endOfWeek } = require('date-fns');

const countWeeklyReservations = async (idProfessor, dataReserva) => {
    const startOfWeekDate = format(startOfWeek(new Date(dataReserva)), 'yyyy-MM-dd');
    const endOfWeekDate = format(endOfWeek(new Date(dataReserva)), 'yyyy-MM-dd');

    const query = `
        SELECT COUNT(*) as count
        FROM reserva
        WHERE idProfessor = ? AND dataReserva BETWEEN ? AND ?
    `;

    const [rows] = await connection.execute(query, [idProfessor, startOfWeekDate, endOfWeekDate]);
    return rows[0].count;
};

const createReserva = async (reservaData) => {
    const { dataReserva, periodo, aulaReserva, idProfessor, numeroLaboratorio, tipoLaboratorio, motivo } = reservaData;

    const formattedDataReserva = format(new Date(dataReserva), 'yyyy-MM-dd');

    const reservationCount = await countWeeklyReservations(idProfessor, formattedDataReserva);
    if (reservationCount >= 4) {
        return { error: 'Você já fez 4 agendamentos nesta semana. Você só pode fazer novos agendamentos na próxima semana.', reservationCount };
    }

    const query = `
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (?, ?, ?, ?, (SELECT idLaboratorio FROM laboratorio WHERE numeroLaboratorio = ? AND tipoLaboratorio = ?), ?)
    `;
    try {
        const [result] = await connection.execute(query, [formattedDataReserva, periodo, aulaReserva, idProfessor, numeroLaboratorio, tipoLaboratorio, motivo]);
        return { insertId: result.insertId, reservationCount };
    } catch (err) {
        console.error('Erro ao criar a reserva no banco de dados:', err.message);
        return { error: 'Erro ao criar a reserva no banco de dados.', details: err.message };
    }
};

const getData = async(periodo,tipoLaboratorio,numeroLaboratorio) =>{
    const query = `select idReserva, dataReserva, periodo, aulaReserva, nome, email, tipoLaboratorio, numeroLaboratorio,svg,motivo FROM reserva
                        INNER JOIN professor ON reserva.idProfessor = professor.idProfessor
                        INNER JOIN laboratorio ON reserva.idLaboratorio = laboratorio.idLaboratorio
                   WHERE periodo = ? AND tipoLaboratorio = ? AND numeroLaboratorio = ?
                   ORDER BY 
                        WEEK(dataReserva) ASC,   
                        aulaReserva ASC,         
                        DAYOFWEEK(dataReserva) ASC`;
                        
    const [marks] = await connection.execute(query,[periodo,tipoLaboratorio,numeroLaboratorio]);// query sql para pegar todas as reservas
    return marks;
};

const deleteReserva = async (idReserva) => {

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

const getDataFromDate = async(dataReserva)=>{
    const query = "SELECT * FROM reserva WHERE dataReserva = ?";
    const [marks] = await connection.execute(query,[dataReserva]);//query sql para pegar uma reserva especifica
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


module.exports = {
    createReserva,
    getData, 
    deleteReserva, 
    getDataFromDate,
    updateReserva,
    countWeeklyReservations
};