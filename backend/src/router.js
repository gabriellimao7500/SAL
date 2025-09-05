const express = require('express');
const multer = require('multer');
const path = require('path');

const profController = require('./controllers/profControllers');
const loginController = require('./controllers/loginControllers');
const labsControllers = require('./controllers/labsControllers');
const marksControllers = require('./controllers/marksControllers');
const reqController = require('./controllers/reqsControllers');

const conflictsController = require('./controllers/conflictResolutionController');

const autoAgendamentoController = require('./controllers/AutoAgendamentoController');
const processXlsxController = require('./controllers/processXlsxController');

const router = express.Router();
router.use(express.json());

// Configuração do multer para manter a extensão original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém a extensão original
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });

// Login
router.post('/login', loginController.velLogin);

// Professores
router.get('/prof', profController.getData);
router.get('/prof/:idProfessor', profController.getDataFromId);
router.put('/updImage/:idProfessor', profController.updateImagem);
router.put('/updPass/:idProfessor', profController.updateSenha);

// Laboratórios
router.get('/labs', labsControllers.getAll);
router.get('/labs/all', labsControllers.getAllLabs);
router.get('/labsType/:tipoLaboratorio', labsControllers.getDataFromType);
// router.post('/labs/bloquear', labsControllers.bloquearLab);
// router.post('/labs/desbloquear', labsControllers.desbloquearLab);
router.post('/labs/bloqueio', labsControllers.bloqueio);

// Reservas
router.post('/marks', marksControllers.getData);
router.get('/marks/:idReserva', marksControllers.getDataFromId);
router.post('/createMarks', marksControllers.createMark);
router.put('/marks/:idReserva', marksControllers.updateReserva);
router.delete('/marks/:idReserva', marksControllers.deleteMark);
router.post('/createMarksFromTo', marksControllers.createMarkFromTo);
router.get('/marks/of/:idLaboratorio/:aulaReserva/:periodo/:dia', marksControllers.getMarkOfTheHour);

// Requisições
router.get('/reqs', reqController.getData);
router.get('/reqs/:idRequisicao', reqController.getDataFromId);
router.post('/createReqs', reqController.createRequisicao);
router.delete('/reqs/:idRequisicao', reqController.deleteReq);

router.post('/auto-agendamento', autoAgendamentoController.criarAgendamentosEmSerie);
router.post('/schedules/upload', upload.single('file'), processXlsxController.handleUpload);

module.exports = router;
