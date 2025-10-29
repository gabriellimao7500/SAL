const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();
const teachersRoutes = require('./routes/teachers');

// Middleware
app.use(express.json());
app.use(cors());

app.use(router);
app.use('/teachers', teachersRoutes);

module.exports = app;





