import Header from "../components/header/Header";
import React, { useState } from 'react';
import './Labs.css';

function Labs() {
    const date = new Date();
    const dia = date.getDate();
    const sem = date.getDay();
    const ano = date.getFullYear();
    const mesatu = date.getMonth();

    let mes = mesatu;
    let sub = sem - 1;
    let day = 1;
   
    const primeiroDiaMesSeguinte = new Date(ano, mes + 1, 1);
    const ultimoDiaMesAtual = new Date(primeiroDiaMesSeguinte - 1);
    const diasNoMes = ultimoDiaMesAtual.getDate();

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

    for (let i = 0; i < 50; i++) {
        weeks.push([day = verify(day, 3), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1), day = verify(day, 1)]);
    }
    
    function reorganizeArray(arr, newIndex) {
        const len = arr.length;
        if (newIndex < 0 || newIndex >= len) {
            throw new Error('newIndex must be within the array length');
        }
    
        // Ajusta o índice para girar no sentido horário
        const adjustedIndex = (len - newIndex) % len;
    
        // Divide o array em duas partes e junta na nova ordem
        const firstPart = arr.slice(adjustedIndex);
        const secondPart = arr.slice(0, adjustedIndex);
        return firstPart.concat(secondPart);
    }

    var somas = [5, 9, 14 , 18, 23, 27, 32, 36, 41, 45, 50, 0];
    var somas1 = reorganizeArray(somas, mesatu);

    const changeWeek = (direction) => {
        setCurrentWeek((prevWeek) => {
            
            const newWeek = (prevWeek + direction + weeks.length) % weeks.length; // garante que o newWeek seja sempre positivo
            console.log(newWeek);
    
            // Ajusta o mês quando a semana muda
            if (newWeek === 0) {
                setCurrentMes(0);
            } else if (newWeek < prevWeek && newWeek + 1 === somas1[currentMes % 12]) {
                setCurrentMes((currentMes - 1 + 12) % 12);
            } else if (newWeek > prevWeek && newWeek === somas1[currentMes % 12]) {
                setCurrentMes((currentMes + 1) % 12);
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
                    <button onClick={() => changeWeek(1)}><span className="material-symbols-outlined">chevron_right</span></button>
                    <button onClick={() => changeWeek(-1)}><span className="material-symbols-outlined">chevron_left</span></button>
                </div>
            </section>
        </div>
    );
}

export default Labs;