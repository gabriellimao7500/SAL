-- Active: 1739237217105@@127.0.0.1@3306@sal
USE sal;

ALTER TABLE laboratorio MODIFY COLUMN tipoLaboratorio VARCHAR(70) NOT NULL;

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Informática', 1, ""),
('Informática', 2, ""),
('Informática', 3, ""),
('Informática', 4, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Química', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Segurança do Trabalho', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Nutrição', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Microbiologia', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Farmácia', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Maker', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Sala de Leitura', 1, "");

INSERT INTO laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Auditório', 1, "");

SELECT * FROM laboratorio;

INSERT INTO professor (nome, email, senha)
VALUES
('Prof A', 'prof.a@example.com', '123');

INSERT INTO professor (nome, email, senha)
VALUES
('Prof B', 'prof.b@example.com', '123');



DELETE from reserva



INSERT INTO professor (nome, email, senha)
VALUES
('Coodenador Davi', 'adm@gmail.com', '199');

SELECT * FROM professor;