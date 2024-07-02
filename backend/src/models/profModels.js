const connection = require('./connection/connection');

const getData = async () => {
    const [professor] = await connection.execute("SELECT * FROM professor");
    return professor;
};

const getDataFromId = async (idProfessor) => {
    const query = "SELECT * FROM professor WHERE idProfessor = ?";
    const [professor] = await connection.execute(query, [idProfessor]);
    return professor;
};

const updateImagem = async (idProfessor, imagem) => {
    try {
        const query = "UPDATE professor SET imagem = ? WHERE idProfessor = ?";
        const [result] = await connection.execute(query, [imagem, idProfessor]);

        if (result.affectedRows > 0) {
            return { success: true, message: 'Imagem do professor atualizada com sucesso' };
        } else {
            return { success: false, message: 'Nenhum professor encontrado com o ID especificado' };
        }
    } catch (error) {
        console.error('Erro ao atualizar imagem do professor:', error);
        throw new Error('Erro ao atualizar imagem do professor no banco de dados');
    }
}

const updateSenha = async (idProfessor, senha) => {
    try {
        const query = "UPDATE professor SET senha = ? WHERE idProfessor = ?";
        const [result] = await connection.execute(query, [senha, idProfessor]);

        if (result.affectedRows > 0) {
            return { success: true, message: 'Senha do professor atualizada com sucesso' };
        } else {
            return { success: false, message: 'Nenhum professor encontrado com o ID especificado' };
        }
    } catch (error) {
        console.error('Erro ao atualizar imagem do professor:', error);
        throw new Error('Erro ao atualizar imagem do professor no banco de dados');
    }
}

module.exports = {
    getData,
    getDataFromId,
    updateSenha,
    updateImagem
};
