const express = require('express');
const router = express.Router();
const { getConflicts, acceptConflict, rejectConflict } = require('../controllers/conflictsController'); // Ajustado para src

router.get('/', getConflicts);
router.post('/accept', acceptConflict);
router.post('/reject', rejectConflict);

module.exports = router;
