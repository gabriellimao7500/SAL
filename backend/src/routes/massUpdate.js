const express = require('express');
const router = express.Router();
const { compareSql, acceptConflict, rejectConflict, resolveConflict } = require('../controllers/conflictResolutionController');

router.post('/compare', compareSql);
router.post('/accept', acceptConflict);
router.post('/reject', rejectConflict);
router.post('/resolve', resolveConflict);

module.exports = router;
