const app = require('./app');
const express = require('express')
const routes = require('./router')
const cors = require('cors')
require('dotenv').config();
const nodemailer = require('nodemailer');

/*
const requisicao = {
    idRequisicao: '2',
    dataRequisicao: '25-06-2021',
    nomeRequisitor: 'Roberto Carlos',
    nomeRequisitado: 'Matheus Vinicius',
    emailRequisitado: 'matheus.vinicius.mvrb@gmail.com',
    motivo: 'Por favor eu deixo você gozar dentro, deixa eu dar',
    idLaboratorio: '1',
    periodo: 'Manhã',
    aulaRequisicao: 'Aula 1 e 2',
    statusRequisicao: 'Pendente',
    dataReserva: '28-06-2021'
}*/

function requisitar(requisicao) {
    const { idRequisicao, dataRequisicao, nomeRequisitor, nomeRequisitado, emailRequisitado, motivo, idLaboratorio, periodo, aulaRequisicao, statusRequisicao, dataReserva } = requisicao;

    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: 'salverificacao@outlook.com',
            pass: 'S4l3tec@2024'
        }
    });

    const enviarVerificaoEmail = (emailRequisitado) => {
        return transporter.sendMail({
            from: 'Sal Requisição <salverificacao@outlook.com>',
            to: emailRequisitado,
            subject: 'Você tem uma nova requisição de laboratório!',
            html: `
            <p>Olá professor(a) ${nomeRequisitado},</p>
            <p>Você recebeu uma nova requisição de laboratório.</p>
            <p><strong>Detalhes da requisição:</strong></p>
            <ul>
                <li>Professor(a) requisitor(a): ${nomeRequisitor}</li>
                <li>Período: ${periodo}</li>
                <li>Data da reserva: ${dataReserva}</li>
                <li>Aula: ${aulaRequisicao}</li>
                <li>Motivo da requisição: ${motivo}</li>
            </ul>
            <p>Por favor, verifique a requisição nas notificações do SAL o mais rápido possível.</p>
            <p>Atenciosamente,<br>Equipe SAL</p>
        `, 
            text: `Olá professor(a) ${nomeRequisitado},

                Você recebeu uma nova requisição de laboratório.

                Detalhes da requisição:

                Professor(a) requisitor(a): ${nomeRequisitor}
                Período: ${periodo}
                Data da reserva: ${dataReserva}
                Aula: ${aulaRequisicao}
                Motivo da requisição: ${motivo}
                Por favor, verifique a requisição nas notificações do SAL o mais rápido possível.

                Atenciosamente,
                Equipe SAL`
        })
        .then(() => {
            console.log('Email enviado com sucesso!');
        })
        .catch((err) => {
            console.error('Erro ao enviar email: ', err);
            throw err;
        });
    }
    enviarVerificaoEmail(emailRequisitado);
    
}

module.exports = requisitar;