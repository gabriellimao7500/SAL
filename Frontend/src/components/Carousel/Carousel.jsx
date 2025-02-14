import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import LabsSelect from '../LabsSelect/LabsSelect';
import axios from 'axios';
import config from '../../../config';

import labsSvgs from '../../assets/json/lb';

import { Swiper, SwiperSlide } from 'swiper/react';
function Carousel() {
    localStorage.setItem('typeLab', "");

    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabs = async () => {
            var url = config.apiUrl;

            try {
                const response = await axios.get(`${url}/labs`);
                setLabs(response.data);
            } catch (error) {
                console.log('erro', error);
            } finally {
                setLoading(false);
            }
            if (loading) {
                return <h1>Loading...</h1>;
            }
        };
        fetchLabs();
    }, []);

   

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.carrousel}>
            <Swiper
                direction={windowWidth < 430 ? 'vertical' : 'horizontal'}
                className={styles.carr}
                slidesPerView={4}
                pagination={{ clickable: false }}
                navigation
            >
                {labs.map((item) => (
                    <SwiperSlide key={item.length}>

                        <LabsSelect svg={labsSvgs.find(labsSvg => labsSvg.tipoLaboratorio.trim() === item.tipoLaboratorio.trim())?.svg} name={item.tipoLaboratorio} number={item.numeroLaboratorio}></LabsSelect>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Carousel;