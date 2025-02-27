use sal;



delete from reserva;



DROP PROCEDURE if EXISTS inserir_reservas;


-- Loop para cada semana a partir de 03/03/2025 até 30/06/2025
DELIMITER $$









CREATE PROCEDURE inserir_reservas()
BEGIN
    DECLARE data_inicio DATE DEFAULT '2025-03-03';
    DECLARE data_fim DATE DEFAULT '2025-06-30';
    DECLARE data_atual DATE DEFAULT data_inicio;

    WHILE data_atual <= data_fim DO
        -- Segunda-feira (Laboratório 1 - Manhã)
        

        -- Segunda-feira (Laboratório 1 - Tarde)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 1, 3, 1, 'SW II - com professores Everton/Carlos - 3º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 2, 3, 1, 'SW II - com professores Everton/Carlos - 3º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 3, 3, 1, 'CNWI - com professores Elvis/Carlos - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 4, 3, 1, 'CNWI - com professores Elvis/Carlos - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 5, 3, 1, 'PDTCC - com professores João/Carlos - 3º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Tarde', 6, 3, 1, 'PDTCC - com professores João/Carlos - 3º MTEC Informática para internet');

        -- Segunda-feira (Laboratório 1 - Noite)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Noite', 2, 3, 1, 'PTCC com professor Rynaldo - 2º TST');




    -- Segunda-feira (Laboratório 2 - Manhã)

    -- Segunda-feira (Laboratório 2 - Tarde)

    -- Segunda-feira (Laboratório 2 - Noite)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Noite', 2, 3, 2, 'PTCC com Professora Julia - 2º Quím');






        -- Segunda-feira (Laboratório 3 - Manhã)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 1, 3, 3, 'TIA - com professores Thayani/Mauricio');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 2, 3, 3, 'TIA - com professores Thayani/Mauricio');


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 5, 3, 3, 'AI - com professor Elvis');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 6, 3, 3, 'AI - com professor Elvis');




        -- Segunda-feira (Laboratório 4 - Manhã)
        

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 3, 3, 4, 'DD - professora Thayani - 1º MTEC Desenvolvimento de Sistemas');

        

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 5, 3, 4, 'PW3 - com professores Everson/Thayane - 3º MTEC Desenvolvimento de Sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual, 'Manhã', 6, 3, 4, 'PW3 - com professores Everson/Thayane - 3º MTEC Desenvolvimento de Sistemas');









        -- Terça-feira (Laboratório 1 - Manhã)

        -- Terça-feira (Laboratório 1 - Tarde)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 1, 'DDMI - com professores João/Danadoni - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 1, 'DDMI - com professores João/Danadoni - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 1, 'DDMI2 - com professores Carlos/Danadoni - 3º MTEC Informática para internet');
        

        -- Terça-feira (Laboratório 1 - Noite)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 1, 3, 1, 'AI - com professores CLÁUDIO/ELVIS - 1º Química');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 2, 3, 1, 'AI - com professores ELVIS/CLAUDIO - 1º TST');









        -- Terça-feira (Laboratório 2 - Manhã)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 2, 'PII - com professores VANESSA / ANNIE');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 6, 3, 2, 'PII - com professores VANESSA / ANNIE');



        -- Terça-feira (Laboratório 2 - Tarde)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 2, 'PDTCC - com professores NATALIA C /GEOVANA - 3º MTEC NUTRIÇÃO E DIETÉTICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 2, 'PDTCC - com professores NATALIA C /GEOVANA - 3º MTEC NUTRIÇÃO E DIETÉTICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 2, 'PI - com professora LILIAN - 3º MTEC RECURSOS HUMANOS');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 5, 3, 2, 'PI - com professora LILIAN - 3º MTEC RECURSOS HUMANOS');

        -- Terça-feira (Laboratório 2 - Noite)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Noite', 1, 3, 2, 'DTCC - com professores JULIA/RODOLFO - 3º Química');










        
        -- Terça-feira (Laboratório 3 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 4, 3, 3, 'PDTCC - com professores FELIPE  / ALBERTO - 3º MTEC QUÍMICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 3, 'PDTCC - com professores FELIPE  / ALBERTO - 3º MTEC QUÍMICA');




        -- Terça-feira (Laboratório 3 - Tarde)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 3, 'PDTCC - com professores LILIAN / ANNIE - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 3, 'PDTCC - com professores LILIAN / ANNIE - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 3, 'PDTCC - com professores LILIAN / ANNIE - 2º MTEC Informática para internet');


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 3, 'PDTCC - com professor ELVIS - 3º AMD');
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 5, 3, 3, 'PDTCC - com professor ELVIS - 3º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 6, 3, 3, 'PDTCC - com professor ELVIS - 3º ADM');










        -- Terça-feira (Laboratório 4 - Manhã)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 1, 3, 4, 'QTS - com professores EVERSON/ THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 2, 3, 4, 'QTS - com professores EVERSON/ THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 3, 3, 4, 'BD1 - com professores EVERSON/ THAYANI - 1º MTEC Desenvolvimento de sistemas');


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 4, 3, 4, 'BD1 - com professores EVERSON/ THAYANI - 1º MTEC Desenvolvimento de sistemas');
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 5, 3, 4, 'APS - com professores EVERSON/ THAYANI - 1º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Manhã', 6, 3, 4, 'APS - com professores EVERSON/ THAYANI - 1º MTEC Desenvolvimento de sistemas');



    -- Terça-feira (Laboratório 4 - Tarde)


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 1, 3, 4, 'IWI - com professores EVERSON/ THAYANI - 1º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 2, 3, 4, 'IWI - com professores EVERSON/ THAYANI - 1º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 3, 3, 4, 'APW - com professores JOÂO - 1º MTEC Informática para internet');


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 1 DAY, 'Tarde', 4, 3, 4, 'APW - com professores JOÂO - 1º MTEC Informática para internet');
        
    







        -- Quarta-feira (Laboratório 1 - Manhã)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 1, 3, 1, 'PDTCC - com professores ALINE / THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 2, 3, 1, 'PDTCC - com professores ALINE / THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 3, 3, 1, 'PDTCC - com professores ALINE / THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 4, 3, 1, 'BD2 - com professores ALINE - 2º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 5, 3, 1, 'BD2 - com professores ALINE - 2º MTEC Desenvolvimento de sistemas');


        -- Quarta-feira (Laboratório 1 - Tarde)


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 1, 3, 1, 'PA - com professores EVERSON /THAYANI - 1º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 2, 3, 1, 'PA - com professores EVERSON /THAYANI - 1º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 3, 3, 1, 'PA - com professores EVERSON /THAYANI - 1º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 6, 3, 1, 'UDIAD - com professor ELVIS - 3º MTEC Informática para internet');




        -- Quarta-feira (Laboratório 1 - Noite)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 1, 3, 1, 'TIAA - com professores CLÁUDIO / CARLOS - 3º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 2, 3, 1, 'AI - com professores CLÁUDIO / CARLOS - 1º ADM');












    -- Quarta-feira (Laboratório 2 - Manhã)

    -- Quarta-feira (Laboratório 2 - Tarde)

    -- Quarta-feira (Laboratório 2 - Noite)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Noite', 2, 3, 2, 'DTCC - com professores SANDRA  / MARCOS - 3º ADM');




    -- Quarta-feira (Laboratório 3 - Manhã)

    -- Quarta-feira (Laboratório 3 - Tarde)




    -- Quarta-feira (Laboratório 4 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 1, 3, 4, 'PW2 - com professor EVERSON - 2º MTEC Desenvolvimento de sistemas');
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 2, 3, 4, 'PW2 - com professor EVERSON - 2º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 4, 3, 4, 'DD - com professora THAYANI - 1º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 5, 3, 4, 'PW1 - com professores EVERSON /THAYANI - 1º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Manhã', 6, 3, 4, 'PW1 - com professores EVERSON /THAYANI - 1º MTEC Desenvolvimento de sistemas');



    -- Quarta-feira (Laboratório 4 - Tarde)


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 2 DAY, 'Tarde', 3, 3, 4, 'PW1 - com professores CARLOS / DANADONI - 3º MTEC Informática para internet');




        -- Quinta-feira (Laboratório 1 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 1, 3, 1, 'FI - com professores JUNIOR /THAYANI - 1º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 2, 3, 1, 'FI - com professores JUNIOR /THAYANI - 1º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 1, 'IPSS - com professor JUNIOR - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 4, 3, 1, 'IPSS - com professor JUNIOR - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 1, 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 6, 3, 1, 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas');


        -- Quinta-feira (Laboratório 1 - Tarde)
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 1, 3, 1, 'SW1 - com professor  EVERSON  - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 2, 3, 1, 'SW1 - com professor  EVERSON  - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 3, 3, 1, 'BD - com professor  EVERSON  - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 4, 3, 1, 'BD - com professor  EVERSON  - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 5, 3, 1, 'IW1 - com professor  EVERSON  - 2º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 6, 3, 1, 'IW1 - com professor  EVERSON  - 2º MTEC Informática para internet');


        -- Quinta-feira (Laboratório 1 - Noite)
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 1, 3, 1, 'DTCC - com professor LUCILEIDE - 3º TST');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 2, 3, 1, 'DTCC - com professor FELIPE  - 3º FARMÁCIA');

        


        -- Quinta-feira (Laboratório 2 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 2, 3, 2, 'PI - com professores VANESSA / ANNIE - 1º MTEC ADMINISTRAÇÃO');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 3, 3, 2, 'PI - com professores VANESSA / ANNIE - 1º MTEC ADMINISTRAÇÃO');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 2, 'IAQ - com professores ELVIS / CARLOS - 1º MTEC Química');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 6, 3, 2, 'SE - com professores ELVIS / CARLOS - 1º MTEC Química');


        -- Quinta-feira (Laboratório 2 - Tarde)
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 1, 3, 2, 'AI - com professores  ELVIS  / CARLOS   - 1º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 2, 3, 2, 'AI - com professores  ELVIS  / CARLOS   - 1º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 3, 3, 2, 'AI - com professores  ELVIS  / CARLOS   - 1º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 4, 3, 2, 'DTCC - com professores  SANDRA / PRISCILA  - 3º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 5, 3, 2, 'DTCC - com professores  SANDRA / PRISCILA  - 3º ADM');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Tarde', 6, 3, 2, 'DTCC - com professores  SANDRA / PRISCILA  - 3º ADM');


        -- Quinta-feira (Laboratório 2 - Noite)
        
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Noite', 1, 3, 2, 'PTCC - com professora SANDRA - 2 ADM');




    -- Quinta-feira (Laboratório 3 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 4, 3, 3, 'AI - com professor DANADONI - 1º NUTRIÇÃO E DIETÉTICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 3 DAY, 'Manhã', 5, 3, 3, 'AI - com professor DANADONI - 1º NUTRIÇÃO E DIETÉTICA');





        -- Sexta-feira (Laboratório 1 - Manhã)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 1, 3, 1, 'PAM2 - com professores DANADONI / ALLAN - 3º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 2, 3, 1, 'PAM2 - com professores DANADONI / ALLAN - 3º Desenvolvimento de sistemas');


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 4, 3, 1, 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 5, 3, 1, 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 6, 3, 1, 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas');
        
        
        
        -- Sexta-feira (Laboratório 1 - Tarde)


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 4, 3, 1, 'GCW - com professor CARLOS - 3º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 5, 3, 1, 'CNW2 - com professor FERNANDO - 3º MTEC Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 6, 3, 1, 'CNW2 - com professor FERNANDO - 3º MTEC Informática para internet');


    -- Sexta-feira (Laboratório 1 - Noite)


        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 1, 3, 1, 'RDST - com professores ELVIS / CLAUDIO - 2º TST');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 2, 3, 1, 'AI - com professores ELVIS / CLAUDIO - 2º FARMÁCIA');





    -- Sexta-feira (Laboratório 2 - Manhã)

    -- Sexta-feira (Laboratório 2 - Tarde)
        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 4, 3, 2, 'AI - com professores MAURICIO / FERNANDO - 3º MTEC NUTRIÇÃO E DIETÉTICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 5, 3, 2, 'AI - com professores MAURICIO / FERNANDO - 3º MTEC NUTRIÇÃO E DIETÉTICA');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 6, 3, 2, 'AI - com professores ELVIS/ RYNALDO - 3º MTEC RECURSOS HUMANOS');



    -- Sexta-feira (Laboratório 2 - Noite)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Noite', 1, 3, 2, 'PTCC - com professor FELIPE - 2º FARMÁCIA');







        
    -- Sexta-feira (Laboratório 3 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 5, 3, 3, 'PDTCC - com professores  PIO - 3º MTEC ADMINISTRAÇÃO');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 6, 3, 3, 'PDTCC - com professores  PIO - 3º MTEC ADMINISTRAÇÃO');








    -- Sexta-feira (Laboratório 4 - Manhã)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 1, 3, 4, 'TPA - com professores  ALINE / THAYANI - 1º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 2, 3, 4, 'TPA - com professores  ALINE / THAYANI - 1º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Manhã', 3, 3, 4, 'TPA - com professores  ALINE / THAYANI - 1º Desenvolvimento de sistemas');



     -- Sexta-feira (Laboratório 4 - Tarde)

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 3, 3, 4, 'AD - com professor CARLOS - 1º Informática para internet');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 5, 3, 4, 'FI - com professor CARLOS - 1º Desenvolvimento de sistemas');

        INSERT INTO reserva (dataReserva, periodo, aulaReserva, idProfessor, idLaboratorio, motivo) 
        VALUES (data_atual + INTERVAL 4 DAY, 'Tarde', 6, 3, 4, 'FI - com professor CARLOS - 1º Desenvolvimento de sistemas');








        -- Avança para a próxima semana
        SET data_atual = data_atual + INTERVAL 7 DAY;
    END WHILE;
END $$

DELIMITER ;




CALL inserir_reservas()