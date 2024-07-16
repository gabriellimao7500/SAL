const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsConstrollers = require('./controllers/labsConstrollers');
const marksControllers = require('./controllers/marksControllers');


const router = express.Router();

//gets
router.get('/login', loginController.velLogin);
    //profs
router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
    //labs
router.get('/labs', labsConstrollers.getAll);
router.get('/labs/:idLaboratorio', labsConstrollers.getDataFromId);
    //reservas
router.get('/marks', marksControllers.getData);
router.get('/marks/:idReserva', marksControllers.getDataFromId);
router.post('/marks', marksControllers.createMark);


//puts professor
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);



module.exports = router;
