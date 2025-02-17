-- Active: 1739237217105@@127.0.0.1@3306@sal
USE sal;

ALTER TABLE laboratorio MODIFY COLUMN tipoLaboratorio VARCHAR(70) NOT NULL;

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Informática', 1),
('Informática', 2),
('Informática', 3),
('Informática', 4);


INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Química', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Nutrição', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Microbiologia', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Farmácia', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Maker', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Sala de Leitura', 1);

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio)
VALUES
('Auditório', 1);

SELECT * FROM laboratorio;

INSERT INTO professor (nome, email, senha)
VALUES
('Prof A', 'prof.a@example.com', '123');

INSERT INTO professor (nome, email, senha)
VALUES
('Prof B', 'prof.b@example.com', '123');

INSERT INTO professor (nome, email, senha)
VALUES
('Gabriel Ortiz dos Anjos Marsura', 'biel.marsura@gmail.com', '123');


DELETE from reserva


INSERT INTO professor (nome, email, senha)
VALUES
('Coodenador Davi', 'adm@gmail.com', '123');

SELECT * FROM professor;