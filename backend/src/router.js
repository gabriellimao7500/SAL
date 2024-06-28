const express = require('express');

const router = express.Router();

router.get('/marks', (req, res) => res.status(200).send("Funcionando"));




module.exports = router;