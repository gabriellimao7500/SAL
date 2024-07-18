const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();

app.use(router);
app.use(express.json());
// Middleware para parsear JSON
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
// Middleware para parsear dados de formulários URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));


module.exports = app;




