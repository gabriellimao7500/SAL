import React from 'react';
import Reserva from '../Reserva/Reserva';

const ReservaModal = ({ open, reserva, type, date, aula, pullMarks, onClose }) => {
    if (!open) return null;
    return (
        <Reserva onBotaoClique={onClose} reserva={reserva} type={type} date={date} aula={aula} pullMarks={pullMarks} />
    );
};

export default ReservaModal;
