const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsConstrollers = require('./controllers/labsConstrollers');
const marksControllers = require('./controllers/marksControllers');
const reqController = require('./controllers/reqsControllers');

const router = express.Router();
router.use(express.json());
// gets
router.post('/login', loginController.velLogin);
// profs
router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
// labs
router.get('/labs', labsConstrollers.getAll);
router.get('/labs/:idLaboratorio', labsConstrollers.getDataFromId);
// reservas
router.get('/marks', marksControllers.getData);
router.get('/marks/:idReserva', marksControllers.getDataFromId);
router.post('/createMarks', marksControllers.createMark);
router.put('/marks/:idReserva', marksControllers.updateReserva);
router.delete('/marks/:idReserva', marksControllers.deleteMark);

// reqs
router.get('/reqs', reqController.getData);
router.get('/reqs/:idRequisicao', reqController.getDataFromId);
router.post('/createReqs', reqController.createRequisicao);
router.delete('/reqs/:idRequisicao', reqController.deleteReq);



// puts professor
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);

module.exports = router;
