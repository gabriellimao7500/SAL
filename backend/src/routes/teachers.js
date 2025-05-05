const express = require('express');
const router = express.Router();
const { getData, getDataFromId, updateSenha, updateImagem, deleteProfessor } = require('../models/profModels');

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
    const { name, email } = req.body;
    try {
        await connection.query('INSERT INTO teachers (name, email) VALUES ($1, $2)', [name, email]);
        res.status(201).json({ message: 'Professor adicionado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar professor' });
    }
});

// Editar um professor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await connection.query('UPDATE teachers SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
        res.json({ message: 'Professor atualizado com sucesso' });
    } catch (error) {
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
