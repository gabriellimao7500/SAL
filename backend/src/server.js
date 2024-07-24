const app = require('./app');
const express = require('express')
const routes = require('./router')
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 3333;
app.use(cors)
app.use(express.json())
app.use(routes)
app.listen(PORT, () => console.log("funcionando na porta " + PORT));
