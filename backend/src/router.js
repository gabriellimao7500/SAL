const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsConstrollers = require('./controllers/labsConstrollers');


const router = express.Router();


router.get('/login', loginController.velLogin);

router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);
router.get('/lab', labsConstrollers.getAll);
router.get('/labs/:idLaboratorio', labsConstrollers.getDataFromId);



module.exports = router;
