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

    const verify = (day, temp) => {
        day += temp;
        if (day > diasNoMes) {
            mes += 1;
            day = 1;
        }
        return day;
    };

    const weeks = [
        [day, day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]
    ];

    for (let i = 0; i < weeksPass + 7; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }

    function reorganizeArray(arr, newIndex) {
        const len = arr.length;
        if (newIndex < 0 || newIndex >= len) {
            throw new Error('newIndex must be within the array length');
        }
        const adjustedIndex = (len - newIndex) % len;
        const firstPart = arr.slice(adjustedIndex);
        const secondPart = arr.slice(0, adjustedIndex);
        return firstPart.concat(secondPart);
    }

    var somas = [5, 9, 14, 18, 23, 27, 32, 36, 41, 45, 50, 0];
    var somas1 = reorganizeArray(somas, mesatu);

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
            if (newWeek === 0) {
                setCurrentMes(mesatu);
            }
            if (newWeek > prevWeek && newWeek === somas1[currentMes % 12]) {
                setCurrentMes((currentMes + 1));
            }
            if (newWeek < prevWeek && (newWeek + 1 === 5 || newWeek + 1 === 9 || newWeek + 1 === 14 || newWeek + 1 === 18 || newWeek + 1 === 23 || newWeek + 1 === 27 || newWeek + 1 === 32 || newWeek + 1 === 36 || newWeek + 1 === 41 || newWeek + 1 === 45 || newWeek + 1 === 50 || newWeek + 1 === 0)) {
                setCurrentMes((currentMes - 1));
            }
            return newWeek;
        });
    };

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
                                            <th key={idx} className={day === dia && currentMes === mesatu ? "in" : ""}>
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
                    <button onClick={() => changeWeek(1)} disabled={nextDisabled}><span className="material-symbols-outlined">chevron_right</span></button>
                    <button onClick={() => changeWeek(-1)} disabled={prevDisabled}><span className="material-symbols-outlined">chevron_left</span></button>
                    
                </div>
            </section>
        </div>
    );
}

export default Labs;
