import React, { useState, useEffect, createElement } from 'react';
import styles from './Table.module.css';
import Reserva from '../Reserva/Reserva';

function Table({reserva, pullMarks}) {
    reserva.push({
        "dataReserva": "0000-00-00T00:00:00.000Z",
        "periodo": "",
        "aulaReserva": 0,
        "nome": "",
        "email": "",
        "tipoLaboratorio": "",
        "numeroLaboratorio": 0,
        "svg": "",
        "motivo": "",
        "turma": null
      })
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
          nome: "Pedro Alvares Cabral",
          email:"pedro@pedrin.com",
          tipoLaboratorio: "quimica",
          numeroLaboratorio:"1",
          svg: "<svg width='166' height='183' viewBox='0 0 186 217' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M39.5 185.956V77.5H154.5V185.956C154.5 190.042 151.543 193.5 147.599 193.5H47.0659C43.0676 193.5 39.5 189.984 39.5 185.956ZM142.623 153.966C143.441 153.141 143.9 152.022 143.9 150.856V127.456C143.9 126.291 143.441 125.172 142.623 124.347C141.804 123.521 140.693 123.056 139.533 123.056C138.374 123.056 137.263 123.521 136.444 124.347C135.626 125.172 135.167 126.291 135.167 127.456V150.856C135.167 152.022 135.626 153.141 136.444 153.966C137.263 154.792 138.374 155.256 139.533 155.256C140.693 155.256 141.804 154.792 142.623 153.966ZM135.499 111.856C135.499 114.283 137.45 116.256 139.866 116.256C141.025 116.256 142.136 115.792 142.955 114.966C143.774 114.141 144.233 113.022 144.233 111.856C144.233 110.691 143.774 109.572 142.955 108.746C142.136 107.921 141.025 107.456 139.866 107.456C137.45 107.456 135.499 109.43 135.499 111.856Z' fill='#fff' stroke='black'/><path d='M184.126 3.51705L184.126 3.51731C184.101 3.55646 184.066 3.61029 184.022 3.67826C183.036 5.18664 177.504 13.6589 177.504 23.25V185.758C177.504 202.612 164.057 216.5 147.23 216.5H46.6457C29.8067 216.5 15.8265 202.601 15.8265 185.758V37.0547C15.8265 33.1861 15.7847 30.2314 15.4871 27.9588C15.189 25.6833 14.6267 24.0187 13.5294 22.7819C12.4324 21.5454 10.861 20.8045 8.69977 20.2403C6.62944 19.6997 3.94805 19.305 0.508835 18.8206C0.624608 15.9384 1.90804 11.5283 6.10408 7.76044C10.5148 3.79983 18.1993 0.5 31.2737 0.5H184.578C185.065 0.5 185.255 0.655328 185.344 0.776432C185.455 0.926327 185.5 1.14548 185.5 1.38483C185.5 1.40903 185.487 1.48802 185.409 1.64291C185.335 1.78983 185.226 1.96261 185.085 2.16401C184.992 2.29679 184.882 2.4469 184.766 2.60615C184.553 2.89588 184.319 3.21591 184.126 3.51705ZM28.6399 15.3842L28.2896 15.6859L28.563 16.0588C29.084 16.769 29.484 18.0455 29.768 19.7385C30.0484 21.4098 30.2045 23.4095 30.2869 25.5013C30.4056 28.5162 30.3704 31.6826 30.3413 34.2955C30.33 35.3131 30.3196 36.2467 30.3196 37.0547V185.758C30.3196 194.571 37.8437 202 46.6457 202H148.077C156.812 202 163.011 194.662 163.011 185.758V23.25C163.011 22.0044 163.084 20.0793 163.202 18.4667C163.261 17.6594 163.33 16.9411 163.406 16.4294C163.444 16.1704 163.481 15.9824 163.514 15.8668C163.525 15.8261 163.533 15.8063 163.535 15.801C163.536 15.7982 163.536 15.7993 163.534 15.8032L163.534 15.8033C163.53 15.809 163.51 15.8453 163.466 15.8857C163.419 15.9282 163.315 16 163.163 16V15.5V15H31.1527C31.0575 15 30.935 14.9965 30.7986 14.9926C30.5353 14.9851 30.2203 14.9761 29.9503 14.9879C29.7305 14.9975 29.4983 15.0207 29.2807 15.0744C29.066 15.1274 28.8329 15.2179 28.6399 15.3842Z' fill='#fff' stroke='black'/></svg>",
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
        if (idx.includes(idxAtu)) {
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
        const dt2 = new Date(dateReserva);
        const data2 = date
        data2.setUTCHours(0);
        data2.setUTCMinutes(0);
        data2.setUTCSeconds(0);
        data2.setUTCMilliseconds(0);
        if (target.classList.contains('ocupado')) {
            setType(false)
            setOnReserva(true)
        } else {
            if(dt2 >= data2){
                setType(true)
                setOnReserva(true)
            }
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
    const [aulaAtu, setAulaAtu] = useState(1)
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
            
            setAulaAtu(aula)
            
        })
        
    })

    
    return (
        <section className={styles.calendar}>
            {onReserva == true ? (<Reserva onBotaoClique={reservasOff} reserva={reserva[targetReserva]} type={type} date={dateReserva} aula={aulaAtu} pullMarks={pullMarks}></Reserva>) : ''}
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