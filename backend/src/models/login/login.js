const connection = require('../connection/connection');

const velUser = async (email, senha) => {
    const query = "SELECT idProfessor FROM reserva WHERE email = ? AND senha = ?";
    
    try {
        const [rows] = await connection.execute(query, [email, senha]);
        const rowsCont = rows.length;
        return { verification: rows, rowsCont: rowsCont };
    } catch (error) {
        console.error('Deu erro:', error);
        throw error;
    }
};

module.exports = {
    velUser
};
