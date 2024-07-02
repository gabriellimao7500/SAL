const tryLogin = require('../models/login/login');

const velLogin = async (req, res) => {
    //req pelo body
    const { email, senha } = req.body;
    //const email = "jj"; // Parâmetro manual para teste
    //const senha = "bbbbbbb"; // Parâmetro manual para teste
    
    try {
        const result = await tryLogin.velUser(email, senha);
        console.log(result.rowsCont); // Para depuração
        return result.rowsCont === 1 
            ? res.status(200).json({ message: "tem" }) 
            : res.status(200).json({ message: "não tem" });
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

module.exports = {
    velLogin
};
