import Header from "../../components/header/Header"
import Button from "../../components/Button/Button"
import Developers from "../../components/Developers/Developers";

import styles from "./AboutUs.module.css"

import React, { useEffect, useState } from 'react';

function AboutUs(){

    const [text, setText] = useState('');

    useEffect(() => {
        fetch('./texts/info.txt')
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.error('Erro ao carregar o arquivo:', error));

    }, []);

    const [activeIndex, setActiveIndex] = useState(0);

    function handleButtonClick(index) {
        setActiveIndex(index);
    }

    const devs = [
        {
            name : "Yan Carlos Camargo",
            github: "https://github.com/YanCarlosCamargo",
            insta: "https://www.instagram.com/yan.carlos.7/",
            linkedin: "#"

        },
        {
            name: "Anderson Reis",
            github: "https://github.com/EuAndersonDev",
            insta: "https://www.instagram.com/anderson_reis04/",
            linkedin: "https://www.linkedin.com/in/andersonreisdev/"
        },
        {
            name: "Felipe Daniel Souza Bazilio",
            github: "https://github.com/FelpsBZ",
            insta: "https://www.instagram.com/felps.dbz/",
            linkedin: "https://www.linkedin.com/in/gabriel-oliveira-8bb517287/"
        },
        {
            name: "Gabriel Lima de Oliveira",
            github: "https://github.com/gabriellimao7500",
            insta: "https://www.instagram.com/gabriel_limao7500/",
            linkedin: "https://www.linkedin.com/in/gabriel-oliveira-8bb517287/"
        },
        {
            name: "Gabriel Ortiz dos Anjos Marsura",
            github: "https://github.com/GMarsura",
            insta: "https://www.instagram.com/gabriel_marsura/",
            linkedin: "https://www.linkedin.com/in/gabriel-oliveira-8bb517287/"
        },
        {
            name: "Matheus Vinicius Rodrigues Brito",
            github: "https://github.com/matheusviniciusbrito",
            insta: "https://www.instagram.com/mavinous/",
            linkedin: "https://www.linkedin.com/in/matheus-vinicius-rodrigues-brito-100620246/"
        }
        
        
    ]

    return (
        <>
            <Header></Header>
            <div className={styles.main}>
                <img className={styles.logo} src="logo.svg" alt="" width={400}/>

                <div className={styles.info}>
                    <div className={styles.buttons}>
                        <Button content={"About Us"} isActive={activeIndex === 0} onClick={() => handleButtonClick(0)}></Button>
                        <Button content={"Developers"} isActive={activeIndex === 1} onClick={() => handleButtonClick(1)}></Button>
                    </div>  
                    <div className={styles.flip_container}>
                        <div className={styles.flip_card}>
                            <div className={`${styles.flip_card_inner} ${activeIndex === 1 ? styles.flip_in : styles.flip_off}`}>
                                <div className={styles.flip_card_front}>
                                    <p className={styles.project_info} style={{ whiteSpace: 'pre-wrap', textIndent: '1em' }}>{text}</p>
                                </div>
                                <div className={styles.flip_card_back}>
                                    {devs.map((dev) => {
                                        return(
                                            <Developers 
                                                linkGitHub={dev.github}
                                                linkLinkedin={dev.linkedin}
                                                linkInsta={dev.insta}
                                                name={dev.name}
                                            ></Developers>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs