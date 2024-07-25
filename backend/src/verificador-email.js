const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do Nodemailer para emails do Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Função para gerar um código aleatório de 4 dígitos
function gerarCodigoVerificacao() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Variável para armazenar o código
let codigoArmazenado = '';

// Função para enviar o código de verificação para o e-mail do usuário
function enviarVerificaoEmail(userEmail) {
    const codigoVerificacao = gerarCodigoVerificacao();
    codigoArmazenado = codigoVerificacao;  // Armazena o código gerado

    return transporter.sendMail({
        from: 'Sal Verificador <salverificacao@outlook.com>',
        to: userEmail,
        subject: 'Seu código para verificação',
        html: `<h1>Olá Professor!</h1> <p>Seu código para verificação é: ${codigoVerificacao}</p>`,
        text: `Olá professor! Seu código para verificação é: ${codigoVerificacao}`
    })
    .then(() => {
        console.log('Email enviado com sucesso!');
        return codigoVerificacao;  // Retorna o código gerado (retirar isso no futuro)
    })
    .catch((err) => {
        console.error('Erro ao enviar email: ', err);
        throw err;
    });
}

// Função para verificar o código digitado pelo usuário
function verificarCodigo(codigoInserido) {
    if (codigoInserido === codigoArmazenado) {
        console.log('Código verificado com sucesso!');
        return true;
    } else {
        console.log('Código de verificação incorreto.');
        return false;
    }
}

// Exemplo de uso da função de verificação de e-mail
const userEmail = 'matheus.vinicius.mvrb@gmail.com';
enviarVerificaoEmail(userEmail)
    .then(() => {
        // solicitar que o usuário digite o código
        const userInputCode = '1234';  // Exemplo: código digitado pelo usuário
        const isVerified = verificarCodigo(userInputCode);
        console.log('Verificação:', isVerified);
    })
    .catch((err) => {
        console.error('Erro no processo de verificação: ', err);
    });
    