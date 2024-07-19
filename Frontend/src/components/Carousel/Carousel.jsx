import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import LabsSelect from '../LabsSelect/LabsSelect';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fetchLabs = async () => {
    try {
        const response = await fetch('http://localhost:3333/labs');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Dados brutos recebidos:', data); // Log dos dados brutos recebidos
        if (Array.isArray(data)) {
            const formattedData = data.map(lab => ({
                svg: lab.svg,
                tipoLaboratorio: lab.tipoLaboratorio
            }));
            console.log('Dados formatados:', formattedData); // Log dos dados formatados
            return formattedData;
        } else {
            console.error('Os dados retornados não são um array', data);
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
};

function Carousel() {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLabs = async () => {
            const labsData = await fetchLabs();
            console.log('Dados recebidos no useEffect:', labsData); // Log dos dados recebidos no useEffect
            setLabs(labsData);
            setLoading(false);
        };
        getLabs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (labs.length === 0) {
        return <div>Nenhum laboratório disponível</div>;
    }

    return (
        <div className={styles.carousel}>
            <Swiper
                className={styles.carr}
                slidesPerView={4}
                pagination={{ clickable: false }}
                navigation
            >
                {labs.map((item, index) => (
                    <SwiperSlide key={index}>
                        <LabsSelect svg={item.svg} tipoLaboratorio={item.tipoLaboratorio} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carousel;