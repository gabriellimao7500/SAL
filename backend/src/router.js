const express = require('express');
const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');

const router = express.Router();


router.get('/login', loginController.velLogin);

router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);


module.exports = router;
