const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsControllers = require('./controllers/labsControllers');
const marksControllers = require('./controllers/marksControllers');
const reqController = require('./controllers/reqsControllers');

const conflictsController = require('./controllers/conflictResolutionController');

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


// Atualização em Massa e conflitos
router.post('/mass-update/compare', conflictsController.compareSql);
router.post('/mass-update/accept', conflictsController.acceptConflict);
router.post('/mass-update/reject', conflictsController.rejectConflict);
router.post('/mass-update/reject', conflictsController.resolveConflict);

module.exports = router;
