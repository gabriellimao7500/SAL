const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/agendamentos', userController.createAgendamentos);
router.get('/agendamentos', userController.getAgendamentos);
router.get('/agendamentos/:id', userController.getAgendamentosById);
router.put('/agendamentos/:id', userController.updateAgendamentos);
router.delete('/agendamentos/:id', userController.deleteAgendamentos);





module.exports = router;
