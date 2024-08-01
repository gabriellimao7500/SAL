const app = require('./app');
const express = require('../../node_modules/express')
const routes = require('./router')
const cors = require('../../node_modules/cors')
require('../../node_modules/dotenv').config();

const PORT = process.env.PORT || 3333;
app.use(cors)
app.use(express.json())
app.use(routes)
app.listen(PORT, () => console.log("funcionando na porta " + PORT));
