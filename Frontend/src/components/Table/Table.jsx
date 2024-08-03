import React, { useState, useEffect, createElement } from 'react';
import styles from './Table.module.css';
import Reserva from '../Reserva/Reserva';

function Table() {
    const date = new Date();
    const dia = date.getDate();
    const ano = date.getFullYear();
    const mesatu = date.getMonth();
    let mes = 6;
    let day = 1;

    const mes2 = 7;
    const day2 = 1;
    const year2 = 2024;

    const primeiroDiaMesSeguinte = new Date(ano, mes + 1, 1);
    const ultimoDiaMesAtual = new Date(primeiroDiaMesSeguinte - 1);
    const diasNoMes = ultimoDiaMesAtual.getDate();

    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentMes, setCurrentMes] = useState(mes);
    const [currentAno, setCurrentAno] = useState(ano);
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

    

    const weeksPass = getWeeksPassed(2024, 7, 1);

    const DiasDoMes = [31, ano % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

    for (let i = 0; i < weeksPass + 2; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }

    useEffect(() => {
        setPrevDisabled(currentWeek === 0);
        setNextDisabled(currentWeek === weeks.length - 1);
    }, [currentWeek, weeks.length]);

    const changeWeek = (direction) => {
        setCurrentWeek((prevWeek) => {
            const newWeek = prevWeek + direction;
            if (newWeek < 0 || newWeek >= weeks.length) {
                return prevWeek;
            }
            if (newWeek > prevWeek && (newWeek === 5 || newWeek === 9 || newWeek === 14 || newWeek === 18 || newWeek === 22 || newWeek === 26 || newWeek === 31 || newWeek === 35 || newWeek === 40 || newWeek === 44 || newWeek === 49 || newWeek === 0)) {
                setCurrentMes((currentMes + 1));
                if (currentMes === 11) {
                    setCurrentAno(currentAno + 1);
                }
            }
            if (newWeek < prevWeek && (newWeek + 1 === 5 || newWeek + 1 === 9 || newWeek + 1 === 14 || newWeek + 1 === 18 || newWeek + 1 === 22 || newWeek + 1 === 26 || newWeek + 1 === 31 || newWeek + 1 === 35 || newWeek + 1 === 40 || newWeek + 1 === 44 || newWeek + 1 === 49 || newWeek + 1 === 0)) {
                setCurrentMes((currentMes - 1));
                if (currentMes === 12) {
                    setCurrentAno(currentAno - 1);
                }
            }
            return newWeek;
        });
    };

    useEffect(() => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function applyChanges() {
            for (let i = 0; i < Math.ceil(weeksPass + 2); i++) {
                const botao = document.getElementById("ir");
                if (botao) {
                    botao.click();
                    await sleep(4);
                }
            }
            const voltar = document.getElementById("voltar");
            if (voltar) {
                voltar.click();
            }
        }

        applyChanges();
    }, []);

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
        const week = weeks[currentWeek];
        const isMonthTransition = week.some(day => day === 1);
    
        if (currentWeek !== 0 && isMonthTransition) {
            // Se a semana não for a primeira e há transição de mês
            const nextMonth = (currentMes + 1) % 12;
            return (
                <div>
                    {monthLabels[currentMes % 12]} - {monthLabels[nextMonth]}
                </div>
            );
        } else {
            // Caso contrário, apenas exibe o mês atual
            return (
                <div>
                    {monthLabels[currentMes % 12]}
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

    var reserva = [
        {
          idReserva: 1,
          dataReserva: "2024-08-01T03:00:00.000Z",
          periodo: "Manhã",
          aulaReserva: 1,
          nome: "pedro",
          email:"pedro@pedrin.com",
          tipoLaboratorio: "quimica",
          numeroLaboratorio:"1",
          svg: "bbbbb",
          motivo: "Experimento de química",
          turma: "Turma A"
        },
        {
          idReserva: 1,
          dataReserva: "2024-08-02T03:00:00.000Z",
          periodo: "Manhã",
          aulaReserva: 2,
          nome: "pedro",
          email:"pedro@pedrin.com",
          tipoLaboratorio: "quimica",
          numeroLaboratorio:"1",
          svg: "bbbbb",
          motivo: "Experimento de química",
          turma: "Turma A"
        },
        {
            idReserva: 1,
            dataReserva: "2024-08-02T03:00:00.000Z",
            periodo: "Manhã",
            aulaReserva: 3 ,
            nome: "pedro",
            email:"pedro@pedrin.com",
            tipoLaboratorio: "quimica",
            numeroLaboratorio:"1",
            svg: "bbbbb",
            motivo: "Experimento de química",
            turma: "Turma A"
          },{
            idReserva: 1,
            dataReserva: "2024-08-07T03:00:00.000Z",
            periodo: "Manhã",
            aulaReserva: 5,
            nome: "pedro",
            email:"pedro@pedrin.com",
            tipoLaboratorio: "quimica",
            numeroLaboratorio:"1",
            svg: "bbbbb",
            motivo: "Experimento de química",
            turma: "Turma A"
          }
    ]

    var idx = []
    reserva.map((reserva, id) => {
        var dt = new Date(reserva.dataReserva);
        var d = dt.getUTCDate();
        var m = dt.getUTCMonth() + 1;
        var a = dt.getUTCFullYear();
        let wp = getWeeksPassed2(year2,mes2,day2,a,m,d)
        var multi = 5 * wp
        var aula = (wp * 7) + reserva.aulaReserva
        var sem = getDayOfWeek(dt)
  
      var indice = ((aula-1)*5+sem-1) - multi

      idx.push(indice)
    });
      
    var idxAtu = 0
    var atu = 0

    const getClassName = () => {
        if (idx[atu] === idxAtu) {
            idxAtu++;
            atu ++
            return 'ocupado';
        } else {
            idxAtu++;
            return styles.select;
        }
    };

    const [onReserva, setOnReserva] = useState(false);
    const [type, setType] = useState(false);
    const [targetReserva, setTargetReserva] = useState(0);
    function reser(event) {
        const target = event.target;
        if (target.classList.contains('ocupado')) {
            setType(false)
            setOnReserva(true)
        } else {
            setType(true)
            setOnReserva(true)
        }

    }
    function reservasOff() {
        setOnReserva(false)
    }

    const obj = document.querySelectorAll(".ocupado")
    obj.forEach((element, index) => {
        element.addEventListener('click', () => {
            setTargetReserva(index)
        })
    })

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
    var indie = 0

    const [dateReserva,setDateReserva] = useState('')

    const allButtons = document.querySelectorAll(".indice")
    allButtons.forEach((element, index) => {
        element.addEventListener('click', () => {
            indie = index
            let aula = Math.floor(indie / 5) + 1;
            let diaSem = (indie % 5) + 1;
            
            let wp = 0;
            while (aula > 6) {
                aula -= 6;
                wp++;
            }
            let temp = calculateDate( day2, mes2, year2, wp, diaSem)
            var formatoISO = temp.toISOString();
            setDateReserva(formatoISO);
        })
    })

    return (
        <section className={styles.calendar}>
            {onReserva == true ? (<Reserva onBotaoClique={reservasOff} reserva={reserva[targetReserva]} type={type} date={dateReserva}></Reserva>) : ''}
            <section className={styles.hours}>
                <div>{windowWidth > 430 ? '7:00 - 7:50' : '1°'}</div>
                <div>{windowWidth > 430 ? '7:50 - 8:40' : '2°'}</div>
                <div>{windowWidth > 430 ? '8:40 - 9:30' : '3°'}</div>
                <div>{windowWidth > 430 ? '9:50 - 10:40' : '4°'}</div>
                <div>{windowWidth > 430 ? '10:40 - 11:30' : '5°'}</div>
                <div>{windowWidth > 430 ? '11:30 - 12:20' : '6°'}</div>
            </section>
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
                                        {Array(5).fill().map((_, colIndex) => (
                                            <td key={colIndex}>
                                                <div className={`${getClassName()} indice`} onClick={reser} type={type}/>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className={styles.month}>
                    {renderMonthLabel()}
                    <div>{currentAno}</div>
                </div>
            </div>
            <div className={styles.navigation}>
                <button id="ir" onClick={() => changeWeek(1)} disabled={nextDisabled}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <button id="voltar" onClick={() => changeWeek(-1)} disabled={prevDisabled}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
        </section>
    );
}

export default Table;