const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    // Prefer DB_* variables (set by docker-compose). Fall back to older names for local dev.
    host: process.env.DB_HOST || process.env.HOST || 'mysql',
    user: process.env.DB_USER || process.env.USER || 'sal',
    password: process.env.DB_PASSWORD || process.env.PASSWORD || '1234',
    database: process.env.DB_NAME || process.env.DATABASE || 'sal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Wait for the database to become available with retries.
const waitForDatabase = async ({ retries = 10, interval = 3000 } = {}) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const conn = await connection.getConnection();
            conn.release();
            console.log('Database connection established');
            return;
        } catch (error) {
            const last = attempt === retries;
            console.warn(`Database connection attempt ${attempt}/${retries} failed${last ? '' : ', retrying...'}`);
            if (last) {
                console.error('Erro ao conectar no banco de dados:', error);
                // rethrow so the process can fail fast if desired
                return;
            }
            // wait before next try
            await new Promise((res) => setTimeout(res, interval));
        }
    }
};

// Start waiting for DB (non-blocking for module load)
waitForDatabase({ retries: 12, interval: 2500 });

module.exports = connection;

