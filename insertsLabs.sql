-- Active: 1724677433889@@127.0.0.1@3306@sal
alter table laboratorio MODIFY COLUMN tipoLaboratorio VARCHAR(70) NOT NULL




insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Informática', 1, ""),
('Informática',2,""),
('Informática', 3, ""),
('Informática', 4, "")

insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Química', 1, "")


insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Segurança do Trabalho', 1 , "")

insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Nutrição', 1, "")


insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Microbiologia', 1, "")

insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Farmácia', 1, "")

insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Maker', 1, "")


insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Sala de Leitura', 1, "")

insert into laboratorio(tipoLaboratorio, numeroLaboratorio, svg)
VALUES
('Auditório', 1 , "")

select * from laboratorio


insert into professor (nome, email, senha) VALUES
('Prof A', 'prof.a@example.com', '123')

select * from professor


