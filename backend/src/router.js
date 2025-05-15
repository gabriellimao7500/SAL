const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsControllers = require('./controllers/labsControllers');
const marksControllers = require('./controllers/marksControllers');
const reqController = require('./controllers/reqsControllers');
const conflictsController = require('./controllers/conflictsController');
const massUpdateController = require('./controllers/massUpdateController');

const router = express.Router();
router.use(express.json());

// Login
router.post('/login', loginController.velLogin);

// Professores
router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);

// Laboratórios
router.get('/labs', labsControllers.getAll);
router.get('/labsType/:tipoLaboratorio', labsControllers.getDataFromType);

// Reservas
router.post('/marks', marksControllers.getData);
router.get('/marks/:idReserva', marksControllers.getDataFromId);
router.post('/createMarks', marksControllers.createMark);
router.put('/marks/:idReserva', marksControllers.updateReserva);
router.delete('/marks/:idReserva', marksControllers.deleteMark);

// Requisições
router.get('/reqs', reqController.getData);
router.get('/reqs/:idRequisicao', reqController.getDataFromId);
router.post('/createReqs', reqController.createRequisicao);
router.delete('/reqs/:idRequisicao', reqController.deleteReq);

// Conflitos
router.get('/conflicts', conflictsController.getConflicts);
router.post('/conflicts/accept', conflictsController.acceptConflict);
router.post('/conflicts/reject', conflictsController.rejectConflict);

// Atualização em Massa
router.post('/mass-update/compare', massUpdateController.compareSql);
router.post('/mass-update/accept', massUpdateController.acceptUpdate);
router.post('/mass-update/reject', massUpdateController.rejectUpdate);

module.exports = router;
