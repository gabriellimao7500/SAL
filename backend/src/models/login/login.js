const connection = require('../connection/connection');

const velUser = async (email, senha) => {
    const query = "SELECT idProfessor,nome,email,imagem FROM professor WHERE email = ? AND senha = ?";
        const [rows] = await connection.execute(query, [email, senha])
        return rows;
    
};

module.exports = {
    velUser
};
