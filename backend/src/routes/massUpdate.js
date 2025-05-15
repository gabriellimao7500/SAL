const express = require('express');
const router = express.Router();
const { compareSql, acceptUpdate, rejectUpdate } = require('../controllers/massUpdateController')

router.post('/compare', compareSql);
router.post('/accept', acceptUpdate);
router.post('/reject', rejectUpdate);

module.exports = router;
