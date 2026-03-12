const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: '192.168.1.211',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const testConnection = async () => {
    try {
        await connection.getConnection();
        console.log("Database connection established");
    } catch (error) {
        console.error("Erro ao conectar no banco de dados:", error);
    }
}
        
testConnection();

module.exports = connection;

