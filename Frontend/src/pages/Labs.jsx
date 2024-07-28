import Header from "../components/header/Header";
import React, { useState, useRef, useEffect } from 'react';
import './Labs.css';

function Labs() {
    const date = new Date();
    const dia = date.getDate();
    const sem = date.getDay();
    const ano = date.getFullYear();
    const mesatu = date.getMonth();
    let mes = mesatu;

    const primeiroDiaMesSeguinte = new Date(ano, mes + 1, 1);
    const ultimoDiaMesAtual = new Date(primeiroDiaMesSeguinte - 1);
    const diasNoMes = ultimoDiaMesAtual.getDate();

    let day = 1;

    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentMes, setCurrentMes] = useState(mes);

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

    for (let i = 0; i < 53; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }

    const changeWeek = (direction) => {
        setCurrentWeek((prevWeek) => {
            const somas = [5, 4.5, 7 , 4.5, 11.5, 9, 16, 18, 20.5, 15, 5];
            const newWeek = (prevWeek + direction + weeks.length) % weeks.length;
            if(newWeek === 0){
                setCurrentMes(0);
            }else if (newWeek < prevWeek && (newWeek + 1) % somas[currentMes] === 0) {
                setCurrentMes(currentMes - 1);    
            } else if (newWeek > prevWeek && (newWeek % somas[currentMes]) === 0) {
                setCurrentMes(currentMes + 1);
            }
            return newWeek;
        });
    };

    const monthLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const scheduleWrapperRef = useRef(null);

    useEffect(() => {
        const today = new Date();
        const dayOfMonth = today.getDate();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const weekIndex = Math.floor((dayOfMonth + dayOfWeek - 1) / 7);

        setCurrentWeek(weekIndex);
        setCurrentMes(today.getMonth());
    }, []);

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
                <div className="dontmove">
                    <div className="schedule-container" ref={scheduleWrapperRef}>
                        <div className="schedule-wrapper" style={{ transform: `translateX(-${currentWeek * 100}%)` }}>
                            {weeks.map((week, index) => (
                                <table key={index} className={`week-${index + 1}`}>
                                    <thead>
                                        <tr>
                                            {week.map((day, idx) => (
                                                <th key={idx} className={day === dia && currentMes === mesatu ? "in" : ""}
                                                id={day === dia && currentMes === mesatu ? "teste" : ""}
                                                ref={day === dia && currentMes === mesatu ? scheduleWrapperRef : null}>
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
                </div>
                <div className="navigation">
                    <button onClick={() => changeWeek(1)}><span className="material-symbols-outlined">chevron_right</span></button>
                    <button onClick={() => changeWeek(-1)}><span className="material-symbols-outlined">chevron_left</span></button>
                </div>    
            </section>
        </div>
    );
}

export default Labs;
