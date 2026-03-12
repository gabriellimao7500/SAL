const mysql = require('mysql2/promise');

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: '192.168.1.211',
            user: 'sal',
            password: '1234',
            database: 'sal'
        });

        console.log("✅ Conectado ao banco!");
        await connection.end();
    } catch (error) {
        console.error("❌ Erro ao conectar no banco:", error);
    }
})();
