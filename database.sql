CREATE DATABASE sal;
USE sal;

-- Criar tabela professor
CREATE TABLE professor (
    idProfessor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(16) NOT NULL,
    imagem LONGBLOB
);

-- Criar tabela laboratorio
CREATE TABLE laboratorio (
    idLaboratorio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoLaboratorio VARCHAR(70) NOT NULL,
    numeroLaboratorio INT NOT NULL,
    svg TEXT
);

-- Criar tabela reserva
CREATE TABLE reserva (
    idReserva INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dataReserva DATE NOT NULL,
    periodo VARCHAR(5),
    aulaReserva INT NOT NULL,
    idProfessor INT NOT NULL,
    idLaboratorio INT NOT NULL,
    motivo VARCHAR(150),
    FOREIGN KEY (idProfessor) REFERENCES professor(idProfessor),
    FOREIGN KEY (idLaboratorio) REFERENCES laboratorio(idLaboratorio)
);

-- Criar tabela requisicao
CREATE TABLE requisicao (
    idRequisicao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dataRequisicao DATE NOT NULL,
    idProfessorRequisitor INT NOT NULL,
    idProfessorRequisitado INT NOT NULL,
    motivo VARCHAR(200) NOT NULL,
    statusRequisicao BIT,
    idReserva INT NOT NULL,
    FOREIGN KEY (idProfessorRequisitor) REFERENCES professor(idProfessor),
    FOREIGN KEY (idProfessorRequisitado) REFERENCES professor(idProfessor),
    FOREIGN KEY (idReserva) REFERENCES reserva(idReserva)
);