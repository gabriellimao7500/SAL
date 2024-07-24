const express = require('express');
const cors = require('cors');  // Adicionando a importação do cors
const router = require('./router');
const app = express();

app.use(express.json());
app.use(cors()); // Usando o middleware cors

app.use(router);


module.exports = app;





