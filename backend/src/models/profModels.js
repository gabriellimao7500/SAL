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

const createProfessor = async (name, email, senha) => {
    try {
        const query = "INSERT INTO professor (nome, email, senha) VALUES (?, ?, ?)";
        const [result] = await connection.execute(query, [name, email, senha]);

        if (result.affectedRows > 0) {
            return { success: true, message: 'Professor criado com sucesso' };
        } else {
            return { success: false, message: 'Erro ao criar professor' };
        }
    } catch (error) {
        console.error('Erro ao criar professor:', error);
        throw new Error('Erro ao criar professor no banco de dados');
    }
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

const updateProfessor = async (idProfessor, nome, email) => {
    try {
        const query = "UPDATE professor SET nome = ?, email = ? WHERE idProfessor = ?";
        const [result] = await connection.execute(query, [nome, email, idProfessor]);

        if (result.affectedRows > 0) {
            return { success: true, message: 'Professor atualizado com sucesso' };
        } else {
            return { success: false, message: 'Nenhum professor encontrado com o ID especificado' };
        }
    } catch (error) {
        console.error('Erro ao atualizar professor:', error);
        throw new Error('Erro ao atualizar professor no banco de dados');
    }
}

const deleteProfessor = async (idProfessor, nome, email) => {
    try {
        const query = "DELETE FROM professor WHERE idProfessor = ? AND nome = ? AND email = ?";
        const [result] = await connection.execute(query, [idProfessor, nome, email]);

        if (result.affectedRows > 0) {
            return { success: true, message: 'Professor excluído com sucesso' };
        } else {
            return { success: false, message: 'Nenhum professor encontrado com os dados especificados' };
        }
    } catch (error) {
        console.error('Erro ao excluir professor:', error);
        throw new Error('Erro ao excluir professor no banco de dados');
    }
}

module.exports = {
    getData,
    getDataFromId,
    updateSenha,
    updateImagem,
    updateProfessor,
    deleteProfessor,
    createProfessor,
};
