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
            if (loading) {
                return <h1>Loading...</h1>;
            }
            
        }
        fetchLabs()
    },[]);


    

    
     
    //const labs = [{"idLaboratorio":1,"tipoLaboratorio":"Química","numeroLaboratorio":1,"svg":"<svg width='166' height='183' viewBox='0 0 186 217' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M39.5 185.956V77.5H154.5V185.956C154.5 190.042 151.543 193.5 147.599 193.5H47.0659C43.0676 193.5 39.5 189.984 39.5 185.956ZM142.623 153.966C143.441 153.141 143.9 152.022 143.9 150.856V127.456C143.9 126.291 143.441 125.172 142.623 124.347C141.804 123.521 140.693 123.056 139.533 123.056C138.374 123.056 137.263 123.521 136.444 124.347C135.626 125.172 135.167 126.291 135.167 127.456V150.856C135.167 152.022 135.626 153.141 136.444 153.966C137.263 154.792 138.374 155.256 139.533 155.256C140.693 155.256 141.804 154.792 142.623 153.966ZM135.499 111.856C135.499 114.283 137.45 116.256 139.866 116.256C141.025 116.256 142.136 115.792 142.955 114.966C143.774 114.141 144.233 113.022 144.233 111.856C144.233 110.691 143.774 109.572 142.955 108.746C142.136 107.921 141.025 107.456 139.866 107.456C137.45 107.456 135.499 109.43 135.499 111.856Z' fill='#777777' stroke='black'/><path d='M184.126 3.51705L184.126 3.51731C184.101 3.55646 184.066 3.61029 184.022 3.67826C183.036 5.18664 177.504 13.6589 177.504 23.25V185.758C177.504 202.612 164.057 216.5 147.23 216.5H46.6457C29.8067 216.5 15.8265 202.601 15.8265 185.758V37.0547C15.8265 33.1861 15.7847 30.2314 15.4871 27.9588C15.189 25.6833 14.6267 24.0187 13.5294 22.7819C12.4324 21.5454 10.861 20.8045 8.69977 20.2403C6.62944 19.6997 3.94805 19.305 0.508835 18.8206C0.624608 15.9384 1.90804 11.5283 6.10408 7.76044C10.5148 3.79983 18.1993 0.5 31.2737 0.5H184.578C185.065 0.5 185.255 0.655328 185.344 0.776432C185.455 0.926327 185.5 1.14548 185.5 1.38483C185.5 1.40903 185.487 1.48802 185.409 1.64291C185.335 1.78983 185.226 1.96261 185.085 2.16401C184.992 2.29679 184.882 2.4469 184.766 2.60615C184.553 2.89588 184.319 3.21591 184.126 3.51705ZM28.6399 15.3842L28.2896 15.6859L28.563 16.0588C29.084 16.769 29.484 18.0455 29.768 19.7385C30.0484 21.4098 30.2045 23.4095 30.2869 25.5013C30.4056 28.5162 30.3704 31.6826 30.3413 34.2955C30.33 35.3131 30.3196 36.2467 30.3196 37.0547V185.758C30.3196 194.571 37.8437 202 46.6457 202H148.077C156.812 202 163.011 194.662 163.011 185.758V23.25C163.011 22.0044 163.084 20.0793 163.202 18.4667C163.261 17.6594 163.33 16.9411 163.406 16.4294C163.444 16.1704 163.481 15.9824 163.514 15.8668C163.525 15.8261 163.533 15.8063 163.535 15.801C163.536 15.7982 163.536 15.7993 163.534 15.8032L163.534 15.8033C163.53 15.809 163.51 15.8453 163.466 15.8857C163.419 15.9282 163.315 16 163.163 16V15.5V15H31.1527C31.0575 15 30.935 14.9965 30.7986 14.9926C30.5353 14.9851 30.2203 14.9761 29.9503 14.9879C29.7305 14.9975 29.4983 15.0207 29.2807 15.0744C29.066 15.1274 28.8329 15.2179 28.6399 15.3842Z' fill='#777777' stroke='black'/></svg>"},{"idLaboratorio":2,"tipoLaboratorio":"Física","numeroLaboratorio":1,"svg":"<svg width='198' height='183' viewBox='0 0 218 203' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M201.65 0H16.35C7.3575 0 0 8.30454 0 18.4545V147.636C0 157.786 7.3575 166.091 16.35 166.091H76.3V179.009C76.0275 180.239 73.8475 183.623 72.7575 185.161C69.76 189.467 66.7625 193.773 68.9425 198.694C69.76 200.847 71.94 203 76.3 203H138.975C141.7 203 147.967 203 150.147 197.464C152.327 191.927 148.512 187.621 145.242 183.623C144.152 182.085 142.245 179.932 141.7 178.702V166.091H201.65C210.643 166.091 218 157.786 218 147.636V18.4545C218 8.30454 210.643 0 201.65 0ZM82.5675 190.697C85.02 187.314 87.2 183.315 87.2 179.009V166.091H130.8V179.009C130.8 183.315 133.525 187.314 136.25 190.697H82.5675ZM207.1 147.636C207.1 151.02 204.648 153.788 201.65 153.788H16.35C13.3525 153.788 10.9 151.02 10.9 147.636V129.182H207.1V147.636ZM207.1 116.879H10.9V18.4545C10.9 15.0712 13.3525 12.303 16.35 12.303H201.65C204.648 12.303 207.1 15.0712 207.1 18.4545V116.879Z' fill='#777777'/></svg>"},{"idLaboratorio":3,"tipoLaboratorio":"Quimica","numeroLaboratorio":2,"svg":"<svg width=\"166\" height=\"183\" viewBox=\"0 0 186 217\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M39.5 185.956V77.5H154.5V185.956C154.5 190.042 151.543 193.5 147.599 193.5H47.0659C43.0676 193.5 39.5 189.984 39.5 185.956ZM142.623 153.966C143.441 153.141 143.9 152.022 143.9 150.856V127.456C143.9 126.291 143.441 125.172 142.623 124.347C141.804 123.521 140.693 123.056 139.533 123.056C138.374 123.056 137.263 123.521 136.444 124.347C135.626 125.172 135.167 126.291 135.167 127.456V150.856C135.167 152.022 135.626 153.141 136.444 153.966C137.263 154.792 138.374 155.256 139.533 155.256C140.693 155.256 141.804 154.792 142.623 153.966ZM135.499 111.856C135.499 114.283 137.45 116.256 139.866 116.256C141.025 116.256 142.136 115.792 142.955 114.966C143.774 114.141 144.233 113.022 144.233 111.856C144.233 110.691 143.774 109.572 142.955 108.746C142.136 107.921 141.025 107.456 139.866 107.456C137.45 107.456 135.499 109.43 135.499 111.856Z\" fill=\"#777777\" stroke=\"black\"/><path d=\"M184.126 3.51705L184.126 3.51731C184.101 3.55646 184.066 3.61029 184.022 3.67826C183.036 5.18664 177.504 13.6589 177.504 23.25V185.758C177.504 202.612 164.057 216.5 147.23 216.5H46.6457C29.8067 216.5 15.8265 202.601 15.8265 185.758V37.0547C15.8265 33.1861 15.7847 30.2314 15.4871 27.9588C15.189 25.6833 14.6267 24.0187 13.5294 22.7819C12.4324 21.5454 10.861 20.8045 8.69977 20.2403C6.62944 19.6997 3.94805 19.305 0.508835 18.8206C0.624608 15.9384 1.90804 11.5283 6.10408 7.76044C10.5148 3.79983 18.1993 0.5 31.2737 0.5H184.578C185.065 0.5 185.255 0.655328 185.344 0.776432C185.455 0.926327 185.5 1.14548 185.5 1.38483C185.5 1.40903 185.487 1.48802 185.409 1.64291C185.335 1.78983 185.226 1.96261 185.085 2.16401C184.992 2.29679 184.882 2.4469 184.766 2.60615C184.553 2.89588 184.319 3.21591 184.126 3.51705ZM28.6399 15.3842L28.2896 15.6859L28.563 16.0588C29.084 16.769 29.484 18.0455 29.768 19.7385C30.0484 21.4098 30.2045 23.4095 30.2869 25.5013C30.4056 28.5162 30.3704 31.6826 30.3413 34.2955C30.33 35.3131 30.3196 36.2467 30.3196 37.0547V185.758C30.3196 194.571 37.8437 202 46.6457 202H148.077C156.812 202 163.011 194.662 163.011 185.758V23.25C163.011 22.0044 163.084 20.0793 163.202 18.4667C163.261 17.6594 163.33 16.9411 163.406 16.4294C163.444 16.1704 163.481 15.9824 163.514 15.8668C163.525 15.8261 163.533 15.8063 163.535 15.801C163.536 15.7982 163.536 15.7993 163.534 15.8032L163.534 15.8033C163.53 15.809 163.51 15.8453 163.466 15.8857C163.419 15.9282 163.315 16 163.163 16V15.5V15H31.1527C31.0575 15 30.935 14.9965 30.7986 14.9926C30.5353 14.9851 30.2203 14.9761 29.9503 14.9879C29.7305 14.9975 29.4983 15.0207 29.2807 15.0744C29.066 15.1274 28.8329 15.2179 28.6399 15.3842Z\" fill=\"#777777\" stroke=\"black\"/></svg>"},{"idLaboratorio":4,"tipoLaboratorio":"Informatica","numeroLaboratorio":1,"svg":"<svg width='198' height='183' viewBox='0 0 218 203' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M201.65 0H16.35C7.3575 0 0 8.30454 0 18.4545V147.636C0 157.786 7.3575 166.091 16.35 166.091H76.3V179.009C76.0275 180.239 73.8475 183.623 72.7575 185.161C69.76 189.467 66.7625 193.773 68.9425 198.694C69.76 200.847 71.94 203 76.3 203H138.975C141.7 203 147.967 203 150.147 197.464C152.327 191.927 148.512 187.621 145.242 183.623C144.152 182.085 142.245 179.932 141.7 178.702V166.091H201.65C210.643 166.091 218 157.786 218 147.636V18.4545C218 8.30454 210.643 0 201.65 0ZM82.5675 190.697C85.02 187.314 87.2 183.315 87.2 179.009V166.091H130.8V179.009C130.8 183.315 133.525 187.314 136.25 190.697H82.5675ZM207.1 147.636C207.1 151.02 204.648 153.788 201.65 153.788H16.35C13.3525 153.788 10.9 151.02 10.9 147.636V129.182H207.1V147.636ZM207.1 116.879H10.9V18.4545C10.9 15.6118 12.41 13.5227 15.7244 12.8969C17.7399 12.4976 19.7722 12.1951 21.9182 12.1951H196.982C199.227 12.1951 201.244 12.4955 203.256 12.8969C206.566 13.5227 208.8 15.6118 208.8 18.4545V116.879H207.1Z' fill='#777777' stroke='black'/></svg>"},{"idLaboratorio":5,"tipoLaboratorio":"nutricao","numeroLaboratorio":1,"svg":"<svg width=\"166\" height=\"183\" viewBox=\"0 0 186 217\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M39.5 185.956V77.5H154.5V185.956C154.5 190.042 151.543 193.5 147.599 193.5H47.0659C43.0676 193.5 39.5 189.984 39.5 185.956ZM142.623 153.966C143.441 153.141 143.9 152.022 143.9 150.856V127.456C143.9 126.291 143.441 125.172 142.623 124.347C141.804 123.521 140.693 123.056 139.533 123.056C138.374 123.056 137.263 123.521 136.444 124.347C135.626 125.172 135.167 126.291 135.167 127.456V150.856C135.167 152.022 135.626 153.141 136.444 153.966C137.263 154.792 138.374 155.256 139.533 155.256C140.693 155.256 141.804 154.792 142.623 153.966ZM135.499 111.856C135.499 114.283 137.45 116.256 139.866 116.256C141.025 116.256 142.136 115.792 142.955 114.966C143.774 114.141 144.233 113.022 144.233 111.856C144.233 110.691 143.774 109.572 142.955 108.746C142.136 107.921 141.025 107.456 139.866 107.456C137.45 107.456 135.499 109.43 135.499 111.856Z\" fill=\"#777777\" stroke=\"black\"/><path d=\"M184.126 3.51705L184.126 3.51731C184.101 3.55646 184.066 3.61029 184.022 3.67826C183.036 5.18664 177.504 13.6589 177.504 23.25V185.758C177.504 202.612 164.057 216.5 147.23 216.5H46.6457C29.8067 216.5 15.8265 202.601 15.8265 185.758V37.0547C15.8265 33.1861 15.7847 30.2314 15.4871 27.9588C15.189 25.6833 14.6267 24.0187 13.5294 22.7819C12.4324 21.5454 10.861 20.8045 8.69977 20.2403C6.62944 19.6997 3.94805 19.305 0.508835 18.8206C0.624608 15.9384 1.90804 11.5283 6.10408 7.76044C10.5148 3.79983 18.1993 0.5 31.2737 0.5H184.578C185.065 0.5 185.255 0.655328 185.344 0.776432C185.455 0.926327 185.5 1.14548 185.5 1.38483C185.5 1.40903 185.487 1.48802 185.409 1.64291C185.335 1.78983 185.226 1.96261 185.085 2.16401C184.992 2.29679 184.882 2.4469 184.766 2.60615C184.553 2.89588 184.319 3.21591 184.126 3.51705ZM28.6399 15.3842L28.2896 15.6859L28.563 16.0588C29.084 16.769 29.484 18.0455 29.768 19.7385C30.0484 21.4098 30.2045 23.4095 30.2869 25.5013C30.4056 28.5162 30.3704 31.6826 30.3413 34.2955C30.33 35.3131 30.3196 36.2467 30.3196 37.0547V185.758C30.3196 194.571 37.8437 202 46.6457 202H148.077C156.812 202 163.011 194.662 163.011 185.758V23.25C163.011 22.0044 163.084 20.0793 163.202 18.4667C163.261 17.6594 163.33 16.9411 163.406 16.4294C163.444 16.1704 163.481 15.9824 163.514 15.8668C163.525 15.8261 163.533 15.8063 163.535 15.801C163.536 15.7982 163.536 15.7993 163.534 15.8032L163.534 15.8033C163.53 15.809 163.51 15.8453 163.466 15.8857C163.419 15.9282 163.315 16 163.163 16V15.5V15H31.1527C31.0575 15 30.935 14.9965 30.7986 14.9926C30.5353 14.9851 30.2203 14.9761 29.9503 14.9879C29.7305 14.9975 29.4983 15.0207 29.2807 15.0744C29.066 15.1274 28.8329 15.2179 28.6399 15.3842Z\" fill=\"#777777\" stroke=\"black\"/></svg>"},{"idLaboratorio":6,"tipoLaboratorio":"maker","numeroLaboratorio":1,"svg":"<svg width='198' height='183' viewBox='0 0 218 203' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M201.65 0H16.35C7.3575 0 0 8.30454 0 18.4545V147.636C0 157.786 7.3575 166.091 16.35 166.091H76.3V179.009C76.0275 180.239 73.8475 183.623 72.7575 185.161C69.76 189.467 66.7625 193.773 68.9425 198.694C69.76 200.847 71.94 203 76.3 203H138.975C141.7 203 147.967 203 150.147 197.464C152.327 191.927 148.512 187.621 145.242 183.623C144.152 182.085 142.245 179.932 141.7 178.702V166.091H201.65C210.643 166.091 218 157.786 218 147.636V18.4545C218 8.30454 210.643 0 201.65 0ZM82.5675 190.697C85.02 187.314 87.2 183.315 87.2 179.009V166.091H130.8V179.009C130.8 183.315 133.525 187.314 136.25 190.697H82.5675ZM207.1 147.636C207.1 151.02 204.648 153.788 201.65 153.788H16.35C13.3525 153.788 10.9 151.02 10.9 147.636V129.182H207.1V147.636ZM207.1 116.879H10.9V18.4545C10.9 15.6118 12.41 13.5227 15.7244 12.8969C17.7399 12.4976 19.7722 12.1951 21.9182 12.1951H196.982C199.227 12.1951 201.244 12.4955 203.256 12.8969C206.566 13.5227 208.8 15.6118 208.8 18.4545V116.879H207.1Z' fill='#777777' stroke='black'/></svg>"}]

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

    return(

        <div className={styles.carrousel}>

            <Swiper
            direction={windowWidth < 430 ? 'vertical' : 'horizontal'}
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