const express = require('express');
const router = express.Router();
const { getConflicts, acceptConflict, rejectConflict } = require('../controllers/conflictsController');

router.get('/', getConflicts);
router.post('/accept', acceptConflict);
router.post('/reject', rejectConflict);

module.exports = router;