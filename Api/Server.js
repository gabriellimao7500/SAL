const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./Config/database');
const userRoutes = require('./Routes/userRoutes');
const port = 3000;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/Api', userRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});

