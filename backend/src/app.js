const express = require('../../node_modules/express');
const cors = require('../../node_modules/cors');  // Adicionando a importação do cors
const router = require('./router');
const app = express();
const bodyParser = require('../../node_modules/body-parser');

app.use(express.json());
app.use(bodyParser.json())
app.use(cors()); // Usando o middleware cors

app.use(router);


module.exports = app;





