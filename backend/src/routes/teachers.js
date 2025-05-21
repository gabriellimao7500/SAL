const express = require('express');
const router = express.Router();
const { getData, getDataFromId, updateSenha, updateImagem, deleteProfessor } = require('../models/profModels');
const e = require('express');
const connection = require('../models/connection/connection');

// Listar todos os professores
router.get('/', async (req, res) => {
    try {
        const teachers = await getData();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar professores' });
    }
});

// Adicionar um professor
router.post('/', async (req, res) => {
    const { name, email, senha } = req.body;
    try {
        await connection.query(`INSERT INTO professor (nome, email, senha) VALUES ('${name}', '${email}', '${senha}')`);
        console.log(`Professor ${name} adicionado com sucesso!`);

        res.status(201).json({ message: 'Professor adicionado com sucesso' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Erro ao adicionar professor' });
    }
});

// Editar um professor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, senha } = req.body;
    try {
        await connection.query(`UPDATE professor SET nome = '${name}', email = '${email}', senha = '${senha}' WHERE idProfessor = ${id}`);
        res.status(200).json({ message: 'Professor atualizado com sucesso' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: 'Erro ao atualizar professor' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    console.log(`ID: ${id}, Nome: ${name}, Email: ${email}`); // Logando os dados recebidos

    try {
        await deleteProfessor(id, name, email);
        res.status(200).json({ message: 'Professor atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir professor' });
    }
});

module.exports = router;
