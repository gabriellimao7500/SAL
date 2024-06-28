const connection = require('./connection/connection');

const getData = async () => {
    try {
       
        const [rows] = await connection.execute('SELECT idProfessor, nome, email, email2, senha, imagem FROM professores WHERE id = ?'); // Substitua pelo ID da sessão do professor
        const professor = rows[0];

        const { id, nome, email, email2, senha, imagem } = professor;

        
        return {
            id,
            nome,
            email,
            email2,
            senha,
            imagem
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

module.exports = getData ;
