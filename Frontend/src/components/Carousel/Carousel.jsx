import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css'
import LabsSelect from '../LabsSelect/LabsSelect';
import axios from 'axios'

import { Swiper, SwiperSlide} from 'swiper/react'


function Carousel(){
    const[labs, setLabs] = useState([]);
    const[loading, setLoading] =useState(true);
    useEffect(()=>{
        const fetchLabs = async()=>{
            try {
                const response = await axios.get('http://localhost:3333/labs');
                setLabs(response.data);
            } catch (error) {
                console.log('erro', error);
            }finally{
                setLoading(false);
            }
            
        }
        fetchLabs()
    },[]);


    
   


    if (loading) {
        return <h1>Loading...</h1>;
    }
     


    return(

        <div className={styles.carrousel}>

            <Swiper
            className={styles.carr}
            slidesPerView={4}
            pagination={{ clickable: false }}
            navigation
            >
                {labs.map( (item) => (
                    <SwiperSlide key={item.length}>
                        <LabsSelect svg={item.svg} name={item.tipoLaboratorio} number={item.numeroLaboratorio}></LabsSelect>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Carousel