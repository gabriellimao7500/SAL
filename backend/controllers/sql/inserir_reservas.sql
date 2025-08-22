DROP PROCEDURE IF EXISTS inserir_reservas;
DELIMITER $$
CREATE PROCEDURE inserir_reservas()
BEGIN
    DECLARE data_inicio DATE DEFAULT '2025-06-30';
    DECLARE data_fim DATE DEFAULT '2025-12-31';
    DECLARE data_atual DATE DEFAULT data_inicio;

    WHILE data_atual <= data_fim DO

        -- QUARTA  (Laboratório 1 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 1, 3, 1, 'PDTCC -3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- QUARTA  (Laboratório 1 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 2, 3, 1, 'PDTCC -3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- QUARTA  (Laboratório 1 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 3, 3, 1, 'PDTCC -3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- QUARTA  (Laboratório 1 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 4, 3, 1, 'BD II - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - ALINE /  ');

        -- QUARTA  (Laboratório 1 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 5, 3, 1, 'BD II - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - ALINE /  ');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 1, 3, 1, 'FI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR /THAYANI');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 2, 3, 1, 'FI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR /THAYANI');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 1, 'IPSS - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR / ');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 4, 3, 1, 'IPSS  - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR / ');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 1, 'SE - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR /THAYANI');

        -- QUINTA (Laboratório 1 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 6, 3, 1, 'SE - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - JUNIOR /THAYANI');

        -- SEXTA (Laboratório 1 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 1, 3, 1, 'PAMII - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - DANADONI / ALLAN');

        -- SEXTA (Laboratório 1 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 2, 3, 1, 'PAMII -3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - DANADONI / ALLAN');

        -- SEXTA (Laboratório 1 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 4, 3, 1, 'DS - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - THAYANI / ALLAN');

        -- SEXTA (Laboratório 1 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 5, 3, 1, 'DS - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - THAYANI / ALLAN');

        -- SEXTA (Laboratório 1 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 6, 3, 1, 'DS - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - THAYANI / ALLAN');

        -- TERÇA (Laboratório 2 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 2, 'Pll - VANESSA / ANNIE');

        -- TERÇA (Laboratório 2 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 6, 3, 2, 'Pll - VANESSA / ANNIE');

        -- QUINTA (Laboratório 2 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 2, 3, 2, 'PI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM ADMINISTRAÇAO - MTEC  - VANESSA / ANNIE');

        -- QUINTA (Laboratório 2 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 2, 'PI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM ADMINISTRAÇAO - MTEC  - VANESSA / ANNIE');

        -- QUINTA (Laboratório 2 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 2, 'IAQ  - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM QUIMICA - MTEC - ELVIS / CARLOS');

        -- QUINTA (Laboratório 2 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 6, 3, 2, 'IAQ  - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM QUIMICA - MTEC - ELVIS / CARLOS');

        -- SEGUNDA (Laboratório 3 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 1, 3, 3, 'TIA - THAYANI/ MAURICIO');

        -- SEGUNDA (Laboratório 3 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 2, 3, 3, 'TIA - THAYANI/ MAURICIO');

        -- SEGUNDA (Laboratório 3 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 5, 3, 3, 'AI - ELVIS /');

        -- SEGUNDA (Laboratório 3 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 6, 3, 3, 'AI - ELVIS / ');

        -- TERÇA (Laboratório 3 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 4, 3, 3, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM QUIMICA - MTEC - FELIPE  / HELLEN');

        -- TERÇA (Laboratório 3 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 3, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM QUIMICA - MTEC - FELIPE  / ALBERTO ');

        -- QUINTA (Laboratório 3 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 3, '1º MODULAR NUTRIÇÃO E DIETÉTICA - DANADONI');

        -- QUINTA (Laboratório 3 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 4, 3, 3, '1º MODULAR NUTRIÇÃO E DIETÉTICA - DANADONI');

        -- QUINTA (Laboratório 3 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 3, '1º MODULAR NUTRIÇÃO E DIETÉTICA - DANADONI');

        -- SEGUNDA (Laboratório 4 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 3, 3, 4, 'DD  - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - THAYANI/');

        -- SEGUNDA (Laboratório 4 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 5, 3, 4, 'PWIII - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON / THAYANI');

        -- SEGUNDA (Laboratório 4 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Manhã', 6, 3, 4, 'PWIII - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON  / THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 1, 3, 4, 'QTS - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON/ THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 2, 3, 4, 'QTS - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON /THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 3, 3, 4, 'BD I - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON/THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 4, 3, 4, 'BD I - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON/THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 4, 'APS - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON/THAYANI');

        -- TERÇA (Laboratório 4 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 6, 3, 4, 'APS - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON/THAYANI');

        -- QUARTA  (Laboratório 4 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 1, 3, 4, 'PWII - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON / ');

        -- QUARTA  (Laboratório 4 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 2, 3, 4, 'PWII - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - EVERSON /');

        -- QUARTA  (Laboratório 4 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 4, 3, 4, 'DD  - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - THAYANI/');

        -- QUARTA  (Laboratório 4 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 5, 3, 4, 'PW I - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON /THAYANI');

        -- QUARTA  (Laboratório 4 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 6, 3, 4, 'PWI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - EVERSON /THAYANI');

        -- QUINTA (Laboratório 4 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 4, 'PAM I - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - THAYANI / EVERSON');

        -- QUINTA (Laboratório 4 - Manhã) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 4, 3, 4, 'PAM I - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESNVOLVIMENTO DE SISTEMAS - MTEC - THAYANI / EVERSON');

        -- QUINTA (Laboratório 4 - Manhã) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 4, 'PDTCC - PIO / CLEYTON');

        -- QUINTA (Laboratório 4 - Manhã) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 6, 3, 4, 'PDTCC - PIO / CLEYTON');

        -- SEXTA (Laboratório 4 - Manhã) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 1, 3, 4, 'TPA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- SEXTA (Laboratório 4 - Manhã) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 2, 3, 4, 'TPA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- SEXTA (Laboratório 4 - Manhã) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 3, 3, 4, 'TPA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM DESENVOLVIMENTO DE SISTEMAS - MTEC - ALINE / THAYANI');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 1, 3, 1, 'SW II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON / CARLOS');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 2, 3, 1, 'SW II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON / CARLOS');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 3, 3, 1, 'CNWI - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - ELVIS / CARLOS');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 4, 3, 1, 'CNWI - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - ELVIS / CARLOS');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 5, 3, 1, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - JOÃO / CARLOS');

        -- SEGUNDA (Laboratório 1 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Tarde', 6, 3, 1, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - JOÃO / CARLOS');

        -- TERÇA (Laboratório 1 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 1, 'DDMI - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - JOÃO / DANADONI');

        -- TERÇA (Laboratório 1 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 1, 'DDMI - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - JOÃO/ DANADONI');

        -- TERÇA (Laboratório 1 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 1, 'DDM II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS / DANADONI');

        -- TERÇA (Laboratório 1 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 1, 'DDM II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS / DANADONI');

        -- TERÇA (Laboratório 1 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 6, 3, 1, 'GCW - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS');

        -- QUARTA  (Laboratório 1 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 1, 3, 1, 'PA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON /THAYANI');

        -- QUARTA  (Laboratório 1 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 2, 3, 1, 'PA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON /THAYANI');

        -- QUARTA  (Laboratório 1 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 3, 3, 1, 'PA - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON /THAYANI');

        -- QUARTA  (Laboratório 1 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 4, 3, 1, 'AD - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS');

        -- QUARTA  (Laboratório 1 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 6, 3, 1, 'UDIAD - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - / ELVIS');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 1, 3, 1, 'SW I - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - / EVERSON ');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 2, 3, 1, 'SW I - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC -  / EVERSON ');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 3, 3, 1, 'BD - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - / EVERSON');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 4, 3, 1, 'BD - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - / EVERSON');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 5, 3, 1, 'IW II - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - / EVERSON');

        -- QUINTA (Laboratório 1 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 6, 3, 1, 'IW II - 2º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC - / EVERSON');

        -- SEXTA (Laboratório 1 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 5, 3, 1, 'CNW II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - DANADONI');

        -- SEXTA (Laboratório 1 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 6, 3, 1, 'CNW II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - DANADONI');

        -- TERÇA (Laboratório 2 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 2, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM NUTRIÇÃO E DIETÉTICA - MTEC - NATALIA C /GEOVANA');

        -- TERÇA (Laboratório 2 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 2, 'PDTCC - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM NUTRIÇÃO E DIETÉTICA - MTEC - NATALIA C /GEOVANA');

        -- TERÇA (Laboratório 2 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 2, 'PI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM RECURSOS HUMANOS - MTEC - LILIAN /');

        -- TERÇA (Laboratório 2 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 5, 3, 2, 'PI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM RECURSOS HUMANOS - MTEC - LILIAN /');

        -- QUINTA (Laboratório 2 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 1, 3, 2, 'AI - MODULAR - ELVIS  / CARLOS');

        -- QUINTA (Laboratório 2 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 2, 3, 2, 'AI - MODULAR - ELVIS  / CARLOS');

        -- QUINTA (Laboratório 2 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 3, 3, 2, 'AI - MODULAR - ELVIS  / CARLOS');

        -- SEXTA (Laboratório 2 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 3, 3, 2, 'AI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM RECURSOS HUMANOS - MTEC - ELVIS/ RYNALDO');

        -- SEXTA (Laboratório 2 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 4, 3, 2, 'AI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM RECURSOS HUMANOS - MTEC - ELVIS/ RYNALDO');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 3, 'GCW - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 3, 'PDTCC - LILIAN / ANNIE');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 3, 'PDTCC - LILIAN / ANNIE');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 3, 'TIAA - 3º ADM MODULAR - ELVIS  ');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 5, 3, 3, 'TIAA - 3º ADM MODULAR - ELVIS  ');

        -- TERÇA (Laboratório 3 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 6, 3, 3, 'TIAA - 3º ADM MODULAR - ELVIS  ');

        -- QUINTA (Laboratório 3 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 4, 3, 3, 'DTCC - 3º ADM MODULAR - SANDRA / PRISCILA');

        -- QUINTA (Laboratório 3 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 5, 3, 3, 'DTCC - 3º ADM MODULAR - SANDRA / PRISCILA');

        -- QUINTA (Laboratório 3 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 6, 3, 3, 'DTCC - 3º ADM MODULAR - SANDRA / PRISCILA');

        -- SEXTA (Laboratório 3 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 3, 3, 3, 'AI - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM NUTRIÇÃO E DIETÉTICA - MTEC - MAURICIO');

        -- SEXTA (Laboratório 3 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 4, 3, 3, 'AI - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM NUTRIÇÃO E DIETÉTICA - MTEC - MAURICIO / FERNANDO');

        -- TERÇA (Laboratório 4 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 4, 'IWI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON /THAYANI');

        -- TERÇA (Laboratório 4 - Tarde) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 4, 'IWI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - EVERSON /THAYANI');

        -- TERÇA (Laboratório 4 - Tarde) - Aula 3
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 4, 'APW - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - JOÃO /');

        -- TERÇA (Laboratório 4 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 4, 'APW - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - JOÃO /');

        -- QUARTA  (Laboratório 4 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 1, 3, 4, 'DDM II - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS / DANADONI');

        -- QUINTA (Laboratório 4 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 4, 3, 4, 'AD - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS');

        -- SEXTA (Laboratório 4 - Tarde) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 1, 3, 4, 'UDIAD - 3º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - / ELVIS');

        -- SEXTA (Laboratório 4 - Tarde) - Aula 4
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 4, 3, 4, 'AD - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS');

        -- SEXTA (Laboratório 4 - Tarde) - Aula 5
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 5, 3, 4, 'FI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS / ');

        -- SEXTA (Laboratório 4 - Tarde) - Aula 6
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 6, 3, 4, 'FI - 1º ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL TÉCNICA EM INFORMÁTICA PARA INTERNET - MTEC  - CARLOS / ');

        -- SEGUNDA (Laboratório 1 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Noite', 2, 3, 1, 'PTCC - 2º TST - RYNALDO');

        -- TERÇA (Laboratório 1 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 1, 3, 1, 'AI - 1º QUÍMICA - CLAUDIO / ELVIS');

        -- TERÇA (Laboratório 1 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 2, 3, 1, 'AI - 1º TST - ELVIS / CLAUDIO');

        -- QUARTA  (Laboratório 1 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 1, 3, 1, 'TIAA - 3º ADM - CLÁUDIO / CARLOS ');

        -- QUARTA  (Laboratório 1 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 2, 3, 1, 'AI - 1º ADM - CLÁUDIO / CARLOS ');

        -- QUINTA  (Laboratório 1 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 1, 3, 1, 'DTCC - 3º TST - LUCILEIDE ');

        -- QUINTA  (Laboratório 1 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 2, 3, 1, 'DTCC - 3º FARMÁCIA - FELIPE ');

        -- SEXTA (Laboratório 1 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 1, 3, 1, 'RDST - 2º TST - ELVIS / CLAUDIO');

        -- SEXTA (Laboratório 1 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 2, 3, 1, 'AI - 2º FARMÁCIA - ELVIS / CLAUDIO');

        -- SEGUNDA (Laboratório 2 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 0 DAY, 'Noite', 2, 3, 2, 'PTCC - 2º QUÍM - JULIA');

        -- TERÇA (Laboratório 2 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 1, 3, 2, 'DTCC - 3º QUÍMICA - JULIA / RODOLFO');

        -- QUARTA  (Laboratório 2 - Noite) - Aula 2
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 2, 3, 2, 'DTCC - 3º ADM - SANDRA  / MARCOS ');

        -- QUINTA  (Laboratório 2 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 1, 3, 2, 'PTCC - 2º ADM - SANDRA');

        -- SEXTA (Laboratório 2 - Noite) - Aula 1
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo)
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 1, 3, 2, 'PTCC - 2º FARMÁCIA - FELIPE');

        SET data_atual = data_atual + INTERVAL 7 DAY;
    END WHILE;
END $$
DELIMITER ;
CALL inserir_reservas;
