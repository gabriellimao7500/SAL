import React, { useState, useEffect, createElement } from 'react';
import Swal from 'sweetalert2';

import styles from './Table.module.css';
import ReservaModal from './ReservaModal';
import AdminReservaModal from './AdminReservaModal';
import Hours from '../Hours/Hours';

import arrow_left from '../../assets/arrow_left.svg'
import arrow_right from '../../assets/arrow_right.svg'

import axios from 'axios';
import config from "../../../config"
import { set } from 'date-fns';

function Table({
    reserva,
    pullMarks,
    serieMode,
    horariosSelecionados,
    setHorariosSelecionados,
    adminSelectMode,
    handleToggleSelectMode
}) {
    // Modal customizado para admin
    const [adminModalOpen, setAdminModalOpen] = useState(false);
    const [adminCampos, setAdminCampos] = useState({
        professor: '',
        disciplina: '',
        motivo: '',
        dataInicio: '',
        dataFim: '',
        diaDaSemana: 0
    });
    const [editandoAdmin, setEditandoAdmin] = useState(false);

    // Controle do modo seleção e células/ids selecionados para exclusão
    // const [selectedIndices, setSelectedIndices] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    let diaDaSemanaGlobal = 0;

    const date = new Date();
    const dia = date.getDate();
    const mesatu = date.getMonth();

    //data inicial
    //ano inicial
    const ano = 2025;
    //mes inicial
    let mes = 1;
    mes--;
    //dia inicial
    let day = 6;



    const a = ano;
    const m = mes + 1;
    const d = day;

    //data de referencia
    //ano de referencia
    const anoR = 2024
    const mesR = 1
    const diaR = 1





    const mes2 = mes;
    const day2 = day;
    const year2 = ano;

    var semanasPraMais = 2;







    if (JSON.parse(sessionStorage.getItem('professor'))) {
        let user = JSON.parse(sessionStorage.getItem('professor'));
        if (user.rule === "admin") {
            semanasPraMais = 52;
        } else {
            semanasPraMais = 2;
        }
    }


    const ebb = getWeeksPassed(a, m, d);
    const yearPlus = getYearsPassed(a, m, d, ebb);

    const [wp, setWp] = useState(getWeeksPassed2(anoR, mesR, diaR, a, m, d));
    const [realWeek, setRealWeek] = useState(wp);
    const [currentWeek, setCurrentWeek] = useState(ebb);
    const [isTransition, setIsTransition] = useState(m === 12 ? false : true);
    const [currentMes, setCurrentMes] = useState(currentWeek % 52 >= 48 ? 11 : currentWeek % 52 >= 44 ? 10 : currentWeek % 52 >= 40 ? 9 : currentWeek % 52 >= 35 ? 8 : currentWeek % 52 >= 31 ? 7 : currentWeek % 52 >= 26 ? 6 : currentWeek % 52 >= 22 ? 5 : currentWeek % 52 >= 18 ? 4 : currentWeek % 52 >= 13 ? 3 : currentWeek % 52 >= 9 ? 2 : currentWeek % 52 >= 5 ? 1 : currentWeek % 52 === 0 && !isTransition ? 11 : 0);
    const [currentAno, setCurrentAno] = useState(ano + yearPlus);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);


    function getWeeksPassed(initialYear, initialMonth, initialDay) {
        const initialDate = new Date(initialYear, initialMonth - 1, initialDay);
        const currentDate = new Date();
        const diffInMs = currentDate - initialDate;
        const msInAWeek = 1000 * 60 * 60 * 24 * 7;
        const weeksPassed = diffInMs / msInAWeek;
        return Math.floor(weeksPassed);
    }

    function getWeeksPassed2(initialYear, initialMonth, initialDay, endYear, endMonth, endDay) {
        const initialDate = new Date(initialYear, initialMonth - 1, initialDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const diffInMs = endDate - initialDate;
        const msInAWeek = 1000 * 60 * 60 * 24 * 7;
        const weeksPassed = diffInMs / msInAWeek;
        return Math.floor(weeksPassed);

    }
    function getYearsPassed(initialYear, initialMonth, initialDay, weeks) {

        const initialDate = new Date(initialYear, initialMonth - 1, initialDay);


        const daysToAdd = weeks * 7;


        const finalDate = new Date(initialDate);
        finalDate.setDate(finalDate.getDate() + daysToAdd);
        return finalDate.getFullYear() - initialDate.getFullYear();
    }



    const weeksPass = ebb;

    const DiasDoMes = [31, currentAno % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const verify = (day, temp) => {
        day += temp;


        if (mes > 11) {
            mes = 0;
        }
        if (day > DiasDoMes[mes]) {
            day = day - DiasDoMes[mes];
            mes += 1;
        }
        return day;
    };

    const weeks = [
        [day, day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]
    ];

    for (let i = 0; i < weeksPass + semanasPraMais; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }

    useEffect(() => {


        setPrevDisabled(currentWeek === 0);
        setNextDisabled(currentWeek === weeks.length - 1);
    }, [currentWeek, weeks.length]);


    const week = weeks[currentWeek];
    const isMonthTransition = week.includes(1) && week.some(day => [28, 29, 30, 31].includes(day));
    const isYearTransition = isMonthTransition && currentWeek % 52 === 0;




    const changeWeek = (direction) => {

        if (isMonthTransition) {
            setIsTransition(true)
        } else {
            setIsTransition(false)
        }

        setRealWeek((prevWeek) => {



            var newWeek = prevWeek + direction;
            var bool = (newWeek + ebb) % 52;




            if (newWeek > prevWeek && (bool === 1 || bool === 5 || bool === 9 || bool === 13 || bool === 18 || bool === 22 || bool === 26 || bool === 31 || bool === 35 || bool === 40 || bool === 44 || bool === 48)) {
                if (bool === 1 && (newWeek + ebb) != 1) {
                    setCurrentAno(currentAno + 1);
                    setCurrentMes(currentMes + 1);
                } else if (newWeek + ebb != 1) {
                    setCurrentMes(currentMes + 1);
                }
            } else if (newWeek < prevWeek && ((bool + 1) === 1 || (bool + 1) === 5 || (bool + 1) === 9 || (bool + 1) === 13 || (bool + 1) === 18 || (bool + 1) === 22 || (bool + 1) === 26 || (bool + 1) === 31 || (bool + 1) === 35 || (bool + 1) === 40 || (bool + 1) === 44 || (bool + 1) === 48)) {

                if ((bool + 1) === 1 && (newWeek + ebb) != 1) {
                    setCurrentAno(currentAno - 1);
                    if (currentMes <= 0) {
                        setCurrentMes(0);
                    } else {
                        setCurrentMes(currentMes - 1);
                    }
                } else if (newWeek + ebb != 1) {
                    setCurrentMes(currentMes - 1);
                }
            }
            if (newWeek > prevWeek) {
                setCurrentWeek(currentWeek + 1);
            } else if (currentWeek <= 0) {
                setCurrentWeek(0);
            } else {
                setCurrentWeek(currentWeek - 1)
            }
            return newWeek;
        });


    };

    const monthLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderMonthLabel = () => {

        if (currentWeek !== 0 && isMonthTransition) {

            const nextMonth = (currentMes + 1) % 12;
            return (
                <div>
                    {monthLabels[currentMes % 12]} - {monthLabels[nextMonth % 12]}
                </div>
            );
        } else if (currentWeek === 0 && isMonthTransition) {
            const nextMonth = (currentMes + 1) % 12;
            return (
                <div>
                    {monthLabels[currentMes % 12]} - {monthLabels[nextMonth % 12]}
                </div>
            );
        } else {

            return (
                <div>
                    {monthLabels[currentMes % 12]}
                </div>
            );
        }
    };


    const renderYearLabel = () => {
        if (isYearTransition) {

            return (
                <div>
                    {currentAno} - {currentAno + 1}
                </div>
            );
        } else {


            return (
                <div>
                    {currentAno}
                </div>
            );
        }
    };

    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const day = date.getUTCDay();
        // Ajustar para que segunda-feira seja 1 e sexta-feira seja 5
        return day === 0 || day === 6 ? null : day;
    }

    var idx = []
    reserva.map((reserva, id) => {
        var dt = new Date(reserva.dataReserva);
        var dia = dt.getUTCDate();
        var mes = dt.getUTCMonth() + 1;
        var ano = dt.getUTCFullYear();
        let wp = getWeeksPassed2(a, m, d, ano, mes, dia);
        var multi = 5 * wp;
        var aula = (wp * 7) + reserva.aulaReserva;
        var sem = getDayOfWeek(dt);

        var indice = ((aula - 1) * 5 + sem - 1) - multi;
        idx.push(indice)
        reserva.index = indice
    });

    function submitReserva() {
        // Lógica para submeter a reserva
        const instrucoesReserva = {
            endDate: adminCampos.dataFim,
            startDate: adminCampos.dataInicio,
            periodo: localStorage.getItem('periodo'),
            aulaReserva: aulaAtu,
            idProfessor: JSON.parse(sessionStorage.getItem('professor')).idProfessor,
            tipoLaboratorio: localStorage.getItem('typeLab'),
            numeroLaboratorio: localStorage.getItem('numLab'),
            svg: "",
            motivo: adminCampos.motivo,
            diaDaSemana: adminCampos.diaDaSemana
        };
        console.log("Instruções de Reserva:", instrucoesReserva);

        axios.post(`${config.apiUrl}/createMarksFromTo`, instrucoesReserva, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("Reserva submetida:", instrucoesReserva);
                pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
                //recarrega as reservas
                if (res.status == 201) {
                    Swal.fire({ icon: 'success', title: 'Reserva criada!', text: res.data.message });
                } else { Swal.fire({ icon: 'success', title: 'Reserva criada!', text: 'Agendamento realizado com sucesso.' }) };
            })
            .catch(err => {
                const msg = err?.response?.data?.error || 'Erro ao agendar. Verifique se o laboratório está bloqueado.';
                Swal.fire({ icon: 'error', title: 'Erro ao agendar', text: msg });
            });
    }

    const onDelete = async (idReserva) => {

        const startDate = adminCampos.dataInicio;
        const endDate = adminCampos.dataFim;

        if (!Array.isArray(idReserva)) {
            if (idReserva.length === 0) {
                alert('ID da reserva não disponível para exclusão.');
                return;
            }
            console.log("Excluindo reserva:", idReserva);
            await axios.delete(`${config.apiUrl}/marksFromTo/${startDate}/${endDate}`).catch(err => {
                console.error(`Erro ao excluir reserva ${idReserva}:`, err);
                return;
            });
            console.log(`Reserva ${idReserva} excluída com sucesso.`);

        } else {
            console.log("Várias reservas para exclusão");

            for (const reservaId of idReserva) {
                await axios.delete(`${config.apiUrl}/marks/${reservaId}`).catch(err => {
                    console.error(`Erro ao excluir reserva ${reservaId}:`, err);
                    return;
                });
                console.log(`Reserva ${reservaId} excluída com sucesso.`);
            }

        }

        // try {
        //     await axios.delete(`${config.apiUrl}/marks/${idReserva}`);
        //     Swal.fire({ icon: 'success', title: 'Reserva excluída!', text: 'A reserva foi excluída com sucesso.' });
        //     pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
        // } catch (err) {
        //     console.error('Erro ao excluir reserva:', err);
        //     Swal.fire({ icon: 'error', title: 'Erro ao excluir', text: 'Não foi possível excluir a reserva. Tente novamente.' });
        // }
    };

    const getClassName = (index) => {

        let reservasFiltradas = reserva.filter(reserva => reserva.index === index);


        /*{
        "idReserva": 0,
        "dataReserva": "0000-00-00T00:00:00.000Z",
        "periodo": "",
        "aulaReserva": 0,
        "nome": "",
        "email": "",
        "tipoLaboratorio": "",
        "numeroLaboratorio": 0,
        "svg": "",
        "motivo": ""
    } */





        if (idx.includes(index)) {
            var email = reservasFiltradas[0].email;
            if (JSON.parse(sessionStorage.getItem('professor'))) {
                var profEmail = JSON.parse(sessionStorage.getItem('professor')).email;
            }
            if (email === profEmail) {
                return `ocupado ${index} isYou`
            }
            return `ocupado ${index}`;
        } else {
            return styles.select;
        }
    };

    const [onReserva, setOnReserva] = useState(false);
    const [type, setType] = useState("no");


    function reservasOff() {
        setOnReserva(false)
        pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
    }


    function calculateDate(startDay, startMonth, startYear, weeksPassed, weekDay) {
        // Cria uma nova data com base nos parâmetros fornecidos
        let startDate = new Date(startYear, startMonth - 1, startDay);

        // Calcula o número total de dias a serem adicionados
        let totalDays = weeksPassed * 7 + (weekDay - 1);

        // Adiciona os dias à data inicial
        startDate.setDate(startDate.getDate() + totalDays);

        // Retorna a data final no formato YYYY-MM-DD
        let year = startDate.getFullYear();
        let month = (startDate.getMonth() + 1).toString().padStart(2, '0');
        let day = startDate.getDate().toString().padStart(2, '0');

        var dateReserva = new Date(Date.UTC(year, month - 1, day, 3, 0, 0));

        return dateReserva;
    }


    const [aulaAtu, setAulaAtu] = useState(1)
    const [dateReserva, setDateReserva] = useState('')


    const [objDefault, setObjDefault] = useState([{}])

    const onReser = async (rowIndex, colIndex, event) => {
        const index = rowIndex * 5 + colIndex
        var indie = index
        let aula = Math.floor(indie / 5) + 1;
        let diaSem = (indie % 5) + 1;
        setAdminCampos({ ...adminCampos, diaDaSemana: diaSem });
        console.log("Dia da semana global:", diaDaSemanaGlobal);

        let wp = currentWeek;
        while (aula > 6) {
            aula -= 6;
            wp++;
        }
        let temp = calculateDate(d, m, a, wp, diaSem)
        var formatoISO = temp.toISOString();

        setDateReserva(formatoISO)
        setAulaAtu(aula)

        const target = event.target;
        const user = JSON.parse(sessionStorage.getItem('professor'));
        if (user && user.rule === "admin") {
            // ADMIN: abre modal customizado
            let campos = {
                professor: user?.nome || '',
                disciplina: '',
                motivo: '',
                dataInicio: formatoISO.substring(0, 10),
                dataFim: formatoISO.substring(0, 10),
                diaDaSemana: diaSem
            };
            if (target.classList.contains('ocupado')) {
                var e = target.className;
                var b = e.split(" ");
                var bb = parseInt(b[1]);
                const reservasFiltradas = reserva.filter(reserva => reserva.index === bb);
                setObjDefault(reservasFiltradas);
                if (reservasFiltradas.length > 0) {
                    campos.professor = reservasFiltradas[0].nome || '';
                    campos.disciplina = reservasFiltradas[0].disciplina || '';
                    campos.motivo = reservasFiltradas[0].motivo || '';
                    campos.dataInicio = reservasFiltradas[0].dataReserva?.substring(0, 10) || formatoISO.substring(0, 10);
                    campos.dataFim = reservasFiltradas[0].dataReserva?.substring(0, 10) || formatoISO.substring(0, 10);
                    campos.idReserva = reservasFiltradas[0].id || reservasFiltradas[0].idReserva;
                    setEditandoAdmin(true);
                } else {
                    setEditandoAdmin(false);
                }
            } else {
                setEditandoAdmin(false);
            }
            setAdminCampos(campos);
            setAdminModalOpen(true);
        } else {
            // NÃO ADMIN: modal padrão
            let data2;
            if (date && typeof date.setHours === 'function') {
                date.setHours(0, 0, 0, 0);
                data2 = date.toISOString();
            } else {
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                data2 = hoje.toISOString();
            }
            if (target.classList.contains('ocupado')) {
                var e = target.className;
                var b = e.split(" ");
                var bb = parseInt(b[1]);
                const reservasFiltradas = reserva.filter(reserva => reserva.index === bb);
                setObjDefault(reservasFiltradas)
                if (formatoISO.substring(0, 10) >= data2.substring(0, 10)) {
                    if (target.classList.contains('isYou')) {
                        setType("me")
                    } else {
                        setType("other")
                    }
                    setOnReserva(true)
                } else {
                    setType("other")
                    setOnReserva(true)
                }
            } else {
                if (formatoISO.substring(0, 10) >= data2.substring(0, 10)) {
                    if (localStorage.getItem('periodo') === "Noite" && rowIndex > 1) {
                        erroDeAgendamento('Você só pode agendar uma aula disponivel!')
                    } else {
                        setType("nothing")
                        setOnReserva(true)
                    }
                } else {
                    erroDeAgendamento('Você não pode agendar um dia anterior ao dia atual!')
                }
            }
        }
        let data2;
        if (date && typeof date.setHours === 'function') {
            date.setHours(0, 0, 0, 0);
            data2 = date.toISOString();
        } else {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            data2 = hoje.toISOString();
        }



        if (target.classList.contains('ocupado')) {

            var e = target.className;
            var b = e.split(" ");
            var bb = parseInt(b[1]);

            const reservasFiltradas = reserva.filter(reserva => reserva.index === bb);
            setObjDefault(reservasFiltradas)

            if (formatoISO.substring(0, 10) >= data2.substring(0, 10)) {
                if (target.classList.contains('isYou')) {
                    setType("me")
                } else {
                    setType("other")
                }
                setOnReserva(true)
            } else {
                setType("other")
                setOnReserva(true)
            }

        } else {
            if (formatoISO.substring(0, 10) >= data2.substring(0, 10)) {
                console.log('data selecionada: ', formatoISO);

                if (localStorage.getItem('periodo') === "Noite" && rowIndex > 1) {
                    erroDeAgendamento('Você só pode agendar uma aula disponivel!')
                } else {
                    setType("nothing")
                    setOnReserva(true)
                }
            } else {
                erroDeAgendamento('Você não pode agendar um dia anterior ao dia atual!')
            }
        }

    }

    const handleDelete = async () => {
        // Tenta obter o id a partir dos campos mais comuns
        const id = adminCampos.idReserva || adminCampos.id || adminCampos.id_reserva;
        if (!id) {
            alert('ID da reserva não disponível para exclusão.');
            return;
        }
        if (!window.confirm('Confirma exclusão desta reserva?')) return;

        try {
            if (onDelete && typeof onDelete === 'function') {
                await onDelete(id);
            } else {
                console.warn('onDelete não fornecido');
            }
            setAdminModalOpen(false);
            console.log(`Reserva ${id} excluída com sucesso.`);
        } catch (err) {
            console.error('Erro ao apagar reserva:', err);
            alert('Erro ao apagar a reserva. Tente novamente.');
        }
    };

    const handleDeleteMany = async (ids) => {
        console.log(`Tentando excluir reservas: ${ids.join(', ')}`);

        if (!ids.length) {
            alert('IDs das reservas não disponíveis para exclusão.');
            return;
        }
        if (!window.confirm('Confirma exclusão destas reservas?')) return;

        ids.forEach(async element => {
            try {
                let r = await axios.delete(`${config.apiUrl}/marks/${element}`);
                if (r.status === 200) {
                    console.log(`Reserva ${element} excluída com sucesso.`);

                } else {
                    console.error(`Erro ao excluir reserva ${element}:`, r.data);
                }
            } catch (err) {
                console.error('Erro ao apagar reservas:', err);
                alert(`Erro ao apagar a reserva ${element}. Tente novamente.`);
            }
        });
        setSelectedIds([]);
        handleToggleSelectMode(false);
        // Recarrega as reservas após exclusão
        await pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
        pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
        pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
        setAdminModalOpen(false);
        console.log(`Reservas excluídas com sucesso.`);
    };

    function erroDeAgendamento(erro) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: erro
        });
    }


    const toggleHorarioSelecionado = (rowIndex, colIndex) => {
        const aula = rowIndex + 1;
        const diaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'][adminCampos.diaDaSemana - 1];
        const laboratorio = localStorage.getItem('typeLab');
        const periodo = localStorage.getItem('periodo');
        const numeroLaboratorio = localStorage.getItem('numLab');
        const key = `${aula}-${colIndex}`;

        // Verifica se já está selecionado
        const exists = horariosSelecionados.find(h => h.key === key);
        if (exists) {
            setHorariosSelecionados(horariosSelecionados.filter(h => h.key !== key));
            return;
        }

        // Verifica se está ocupado usando o mesmo critério do getClassName
        const index = (rowIndex * 5 + colIndex) + 30 * currentWeek;
        const ocupado = reserva.some(reservaItem => reservaItem.index === index);

        let sobrescrever = false;
        if (ocupado) {
            sobrescrever = window.confirm('Este horário já está ocupado. Deseja sobrescrever?');
        }

        setHorariosSelecionados([
            ...horariosSelecionados,
            {
                key,
                diaSemana,
                aula,
                laboratorio,
                periodo,
                numeroLaboratorio,
                sobrescrever
            }
        ]);
    };

    const handleAgendarSerie = async (horariosSelecionados, dataInicio, dataFim) => {
        console.log("no table");

        // Validação das datas
        if (!dataInicio || !dataFim) {
            alert('Preencha as datas de início e fim.');
            return;
        }
        if (new Date(dataFim) < new Date(dataInicio)) {
            alert('A data final deve ser igual ou posterior à data inicial.');
            return;
        }
        if (!horariosSelecionados.length) {
            alert('Selecione pelo menos um horário.');
            return;
        }

        // Pegue dados do usuário logado
        const user = JSON.parse(sessionStorage.getItem('professor')) || {};
        const motivo = window.prompt("Informe o motivo para todos os agendamentos em série:", "");

        // Validação dos campos de cada horário
        for (const h of horariosSelecionados) {
            if (
                !h.diaSemana ||
                !h.aula ||
                !h.laboratorio ||
                !h.periodo ||
                !h.numeroLaboratorio ||
                !motivo ||
                !user.nome ||
                !user.email
            ) {
                alert('Todos os campos dos horários devem estar preenchidos (dia da semana, aula, laboratório, período, número do laboratório, motivo, nome e email do professor).');
                return;
            }
        }

        // Monta os objetos no padrão esperado
        const horariosPadronizados = horariosSelecionados.map(h => ({
            dataReserva: null,
            periodo: h.periodo,
            aulaReserva: h.aula,
            nome: user.nome,
            email: user.email,
            tipoLaboratorio: h.laboratorio,
            numeroLaboratorio: h.numeroLaboratorio,
            svg: '',
            motivo: motivo,
            diaSemana: h.diaSemana,
        }));

        try {
            await axios.post(`${config.apiUrl}/auto-agendamento`, {
                horarios: horariosPadronizados,
                dataInicio,
                dataFim
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
            alert('Agendamentos criados com sucesso!');
        } catch (err) {
            console.log(err);
            alert('Erro ao criar agendamentos em série');
        }
    };

    // Função para alternar seleção de célula para exclusão (apenas 1 agendamento por célula)
    const toggleCellDeletion = (rowIndex, colIndex) => {
        const globalIndex = (rowIndex * 5 + colIndex) + 30 * currentWeek;
        const reservasCelula = reserva.filter(r => r.index === globalIndex);
        if (reservasCelula.length === 0) return;
        // Seleciona apenas o primeiro agendamento da célula
        const idCelula = reservasCelula[0].id ?? reservasCelula[0].idReserva;
        if (!idCelula) return;

        if (selectedIds.includes(idCelula)) {
            console.log(`Deselecionando célula: ${rowIndex}, ${colIndex} com ID ${idCelula}`);
            setSelectedIds(prev => prev.filter(id => id !== idCelula));
        } else {
            setSelectedIds(prev => [...prev, idCelula]);
            console.log(`Selecionando célula: ${rowIndex}, ${colIndex} com ID ${idCelula}`);
        }
    };

    return (
        <section className={styles.calendar}>
            {/* Renderiza apenas o modal correto */}
            {
                (() => {
                    const user = JSON.parse(sessionStorage.getItem('professor'));
                    if (user && user.rule === "admin") {

                        return (
                            <AdminReservaModal
                                open={adminModalOpen}
                                campos={adminCampos}
                                editando={editandoAdmin}
                                onChange={setAdminCampos}
                                onClose={() => setAdminModalOpen(false)}
                                onSubmit={e => {
                                    e.preventDefault();
                                    // Passe o colIndex correto, por exemplo, do objDefault[0]
                                    const colIndex = (objDefault[0]?.index ?? 0) % 5;
                                    submitReserva();
                                    setAdminModalOpen(false);
                                }}
                                onDelete={handleDelete}
                                diaSemana={adminCampos.diaDaSemana}
                                onSuccess={() => {
                                    // Recarregar as reservas após o sucesso
                                    pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
                                }}
                            // <-- passa controle para o Table
                            />
                        );
                    } else {
                        return (
                            <ReservaModal
                                open={onReserva}
                                reserva={objDefault[0]}
                                type={type}
                                date={dateReserva}
                                aula={aulaAtu}
                                pullMarks={pullMarks}
                                onClose={reservasOff}
                            />
                        );
                    }
                })()
            }

            <Hours windowWidth={windowWidth}></Hours>

            <div className={styles["schedule-container"]}>
                <div className={styles["schedule-wrapper"]} style={{ transform: `translateX(-${currentWeek * 100}%)` }}>
                    {weeks.map((week, index) => (
                        <table key={index} className={styles[`week-${index + 1}`]}>
                            <thead>
                                <tr>
                                    {week.map((day, idx) => (
                                        <th key={idx}
                                            className={day === dia && ((currentMes === mesatu && currentAno === ano) || (currentMes + 1 === mesatu && currentAno === ano)) && currentWeek === weeksPass ? styles.in : ""}>
                                            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][idx]}
                                            <br />
                                            <span className={styles.day}>{day}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array(6).fill().map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Array(5).fill().map((_, colIndex) => {
                                            const key = `${rowIndex + 1}-${colIndex}`;
                                            const horarioSelecionado = horariosSelecionados.find(h => h.key === key);

                                            const globalIndex = (rowIndex * 5 + colIndex) + 30 * currentWeek;
                                            // Busca os ids dos agendamentos desta célula
                                            const reservasCelula = reserva.filter(r => r.index === globalIndex);
                                            const idCelula = reservasCelula[0]?.id ?? reservasCelula[0]?.idReserva;
                                            const isMarkedForDeletion = adminSelectMode && idCelula && selectedIds.includes(idCelula);

                                            return (
                                                <td key={colIndex}>
                                                    <div
                                                        className={
                                                            `${getClassName(globalIndex)} indice ` +
                                                            `${serieMode && horarioSelecionado ? styles.selected : ''} ` +
                                                            `${horarioSelecionado && horarioSelecionado.sobrescrever ? styles.sobrescrever : ''}`
                                                        }
                                                        onClick={(event) => {
                                                            if (adminSelectMode) {
                                                                toggleCellDeletion(rowIndex, colIndex);
                                                            } else if (serieMode) {
                                                                toggleHorarioSelecionado(rowIndex, colIndex);
                                                            } else {
                                                                onReser(rowIndex, colIndex, event);
                                                            }
                                                        }}
                                                        type={type}
                                                        style={
                                                            isMarkedForDeletion
                                                                ? { outline: '3px dashed rgba(239,68,68,0.9)', outlineOffset: '-6px' }
                                                                : undefined
                                                        }
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className={styles.month}>
                    {renderMonthLabel()}
                    <div>{renderYearLabel()}</div>
                </div>
            </div>

            {/* Botão flutuante para excluir selecionadas (visível só para admin e em modo seleção) */}
            {
                adminSelectMode && (
                    <div style={{ position: 'fixed', right: 20, bottom: 90, zIndex: 11000 }}>
                        <button
                            onClick={() => handleDeleteMany(selectedIds)}
                            style={{
                                background: '#ef4444',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 10,
                                padding: '12px 16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 6px 20px rgba(239,68,68,0.18)'
                            }}
                        >
                            Excluir selecionadas ({selectedIds.length})
                        </button>
                        <button
                            onClick={() => { handleToggleSelectMode(false); setSelectedIds([]); }}
                            style={{
                                marginTop: 8,
                                background: '#333',
                                color: '#fff',
                                border: '1px solid #8b5cf6',
                                borderRadius: 8,
                                padding: '8px 12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}
                        >
                            Cancelar seleção
                        </button>
                    </div>
                )
            }

            <div className={styles.navigation}>
                <button id="ir" onClick={() => changeWeek(1)} disabled={nextDisabled}>
                    <img src={arrow_right} alt="svg" />
                </button>
                <button id="voltar" onClick={() => changeWeek(-1)} disabled={prevDisabled}>
                    <img src={arrow_left} alt="svg" />
                </button>
            </div>
        </section >
    );
}

export default Table;
