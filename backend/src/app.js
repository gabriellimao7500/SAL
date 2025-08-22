const express = require('../../node_modules/express');
const cors = require('../../node_modules/cors');  // Adicionando a importação do cors
const router = require('./router');
const app = express();
const bodyParser = require('../../node_modules/body-parser');
const teachersRoutes = require('./routes/teachers');

app.use(express.json());
app.use(bodyParser.json())
app.use(cors()); // Usando o middleware cors

app.use(router);
app.use('/teachers', teachersRoutes);

module.exports = app;





