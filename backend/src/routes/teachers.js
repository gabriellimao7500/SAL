const express = require('express');
const router = express.Router();
const { getData, getDataFromId, updateSenha, updateImagem } = require('../models/profModels');

// Listar todos os professores
router.get('/', async (req, res) => {
    try {
        const teachers = await getData();
        console.log(teachers);

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

module.exports = router;
