const express = require('express');
const router = express.Router();
const { getConflicts, acceptConflict, rejectConflict } = require('../controllers/conflictsController');
const { acceptUpdate, rejectUpdate } = require('../controllers/massUpdateController');

router.get('/', getConflicts);
router.post('/accept', acceptConflict);
router.post('/reject', rejectConflict);
router.post('/mass-update/accept', acceptUpdate);
router.post('/mass-update/reject', rejectUpdate);

module.exports = router;