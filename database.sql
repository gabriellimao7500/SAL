-- Active: 1722448001420@@127.0.0.1@3306@sal
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

DELIMITER //

CREATE PROCEDURE sp_createReserva(
    IN p_dataReserva DATE,
    IN p_periodo VARCHAR(5),
    IN p_aulaReserva INT,
    IN p_idProfessor INT,
    IN p_numeroLaboratorio INT,
    IN p_tipoLaboratorio VARCHAR(70),
    IN p_motivo VARCHAR(150),
    OUT p_result VARCHAR(255)
)
BEGIN
    DECLARE v_reservationCount INT;
    DECLARE v_idLaboratorio INT;

    -- Calculate the start and end of the week for the given date
    SET @startOfWeek = DATE_SUB(p_dataReserva, INTERVAL WEEKDAY(p_dataReserva) DAY);
    SET @endOfWeek = DATE_ADD(@startOfWeek, INTERVAL 6 DAY);

    -- Count the number of reservations for the professor in the given week
    SELECT COUNT(*) INTO v_reservationCount
    FROM reserva
    WHERE idProfessor = p_idProfessor AND dataReserva BETWEEN @startOfWeek AND @endOfWeek;

    -- Check if the reservation count exceeds the limit
    IF v_reservationCount >= 3 THEN
        SET p_result = 'Limite de 3 agendamentos por semana atingido para este professor.';
    ELSE
        -- Get the idLaboratorio based on numeroLaboratorio and tipoLaboratorio
        SELECT idLaboratorio INTO v_idLaboratorio
        FROM laboratorio
        WHERE numeroLaboratorio = p_numeroLaboratorio AND tipoLaboratorio = p_tipoLaboratorio;

        -- Insert the new reservation
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (p_dataReserva, p_periodo, p_aulaReserva, p_idProfessor, v_idLaboratorio, p_motivo);

        SET p_result = 'Reserva criada com sucesso.';
    END IF;
END //

DELIMITER ;

