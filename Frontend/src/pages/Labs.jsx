import Header from "../components/header/Header";
import React, { useState, useEffect } from 'react';
import './Labs.css';

function Labs() {
    const date = new Date();
    const dia = date.getDate();
    const sem = date.getDay();
    const ano = date.getFullYear();
    const mesatu = date.getMonth();
    let mes = 6;
    let sub = sem - 1;
    let day = 1;

    const primeiroDiaMesSeguinte = new Date(ano, mes + 1, 1);
    const ultimoDiaMesAtual = new Date(primeiroDiaMesSeguinte - 1);
    const diasNoMes = ultimoDiaMesAtual.getDate();

    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentMes, setCurrentMes] = useState(mes);
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

    const weeksPass = getWeeksPassed(2024, 7, 1);

    const DiasDoMes = [31,ano%4 == 0 ? 29:28,31,30,31,30,31,31,30,31,30,31]

    const verify = (day, temp) => {
        day += temp;
        if(mes > 11){
            mes = 0
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


    // QUANTIDADE DE SEMANAS A FRENTE DA ATUAL
    for (let i = 0; i < weeksPass + 2 ; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }


    useEffect(() => {
        setPrevDisabled(currentWeek === 0);
        setNextDisabled(currentWeek === weeks.length - 1);
    }, [currentWeek, weeks.length]);
    const changeWeek = (direction) => {
        console.log(currentWeek)
        setCurrentWeek((prevWeek) => {
            var newWeek = prevWeek + direction;
            if (currentMes > 11) {
                setCurrentMes(0)
            }
            if (newWeek < 0 || newWeek >= weeks.length) {
                return prevWeek;
            }
            if (newWeek > prevWeek && (newWeek === 5 || newWeek  === 9 || newWeek  === 14 || newWeek  === 18 || newWeek  === 23 || newWeek  === 26 || newWeek  === 31 || newWeek  === 35 || newWeek === 40 || newWeek  === 44 || newWeek === 49 || newWeek  === 0)) {
                setCurrentMes((currentMes + 1));
            }
            if (newWeek < prevWeek && (newWeek + 1 === 5 || newWeek + 1 === 9 || newWeek + 1 === 14 || newWeek + 1 === 18 || newWeek + 1 === 23 || newWeek + 1 === 26 || newWeek + 1 === 31 || newWeek + 1 === 35 || newWeek + 1 === 40 || newWeek + 1 === 44 || newWeek + 1 === 49 || newWeek + 1 === 0)) {
                setCurrentMes((currentMes - 1));
                if (currentMes <= 0) {
                    setCurrentMes(11)
                }
            }
            return newWeek;
        });
    };
    window.addEventListener('load', function() {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function applyChanges() {
            for (var i = 0; i < Math.ceil(weeksPass + 2); i++) {
                const botao = document.getElementById("ir")
                botao.click()
                await sleep(4); // Delay de 1 segundo (1000 milissegundos)
            }
            const voltar = document.getElementById("voltar")
            voltar.click()
        }
    
        applyChanges();
    });
    

    const monthLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    return (
        <div className="App">
            <Header />
            <section className="calendar">
                <section className="hours">
                    <div>7:00 - 7:50</div>
                    <div>7:50 - 8:40</div>
                    <div>8:40 - 9:30</div>
                    <div>9:50 - 10:40</div>
                    <div>10:40 - 11:30</div>
                    <div>11:30 - 12:20</div>
                </section>
                <div className="schedule-container">
                    <div className="schedule-wrapper" style={{ transform: `translateX(-${currentWeek * 100}%)` }}>
                        {weeks.map((week, index) => (
                            <table key={index} className={`week-${index + 1}`}>
                                <thead>
                                    <tr>
                                        {week.map((day, idx) => (
                                            <th key={idx} 
                                            className={day === dia && currentMes === mesatu ? "in" : ""}>
                                                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][idx]}
                                                <br />
                                                <span className='day'>{day}</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array(6).fill().map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array(5).fill().map((_, colIndex) => (
                                                <td key={colIndex}>
                                                    <div className="select"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}
                    </div>
                    <div className="footer">
                        <div>{monthLabels[currentMes % 12]}</div>
                    </div>
                </div>
                <div className="navigation">
                    <button id="ir" onClick={() => changeWeek(1)} disabled={nextDisabled}><span className="material-symbols-outlined">chevron_right</span></button>
                    <button id="voltar" onClick={() => changeWeek(-1)} disabled={prevDisabled}><span className="material-symbols-outlined">chevron_left</span></button>
                    
                </div>
            </section>
        </div>
    );
}

export default Labs;
