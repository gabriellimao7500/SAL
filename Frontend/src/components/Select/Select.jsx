import styles from './Select.module.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import config from '../../../config';

/*var labs = [
    {
        "idLaboratorio": 1,
        "tipoLaboratorio": "Informatica",
        "numeroLaboratorio": 1,
    },
    {
        "idLaboratorio": 2,
        "tipoLaboratorio": "Informatica",
        "numeroLaboratorio": 2,
    },
    {
        "idLaboratorio": 3,
        "tipoLaboratorio": "Informatica",
        "numeroLaboratorio": 3,
    },
    {
        "idLaboratorio": 4,
        "tipoLaboratorio": "Informatica",
        "numeroLaboratorio": 4,
    }
]*/

function Select({ LabTipe, LabAtu, Type, horarioAtu, pullMarks }) {
    

    const [isOpen, setIsOpen] = useState(false)
    const [selectedLab, setSelectedLab] = useState(LabAtu);
    const [selectedHour, setSelectedHour] = useState(horarioAtu);
    const selectRef = useRef(null);





    const[labs, setLabs] = useState([]);
    const[loading, setLoading] =useState(true);
    useEffect(()=>{
        const tipo = localStorage.getItem('typeLab')
        
        const fetchLabs = async()=>{
            try {
                const response = await axios.get(`${config.apiUrl}/labsType/${tipo}`);
                setLabs(response.data);
            } catch (error) {
                console.log('erro', error);
            }
            
        }
        fetchLabs()

    },[]);









    function handleLabClick(lab, event) {
        event.stopPropagation(); // Prevents click event from propagating to the parent div

        if (selectedLab === lab.numeroLaboratorio) {
            // Toggle menu visibility if the same lab is clicked
            setIsOpen(prevIsOpen => !prevIsOpen);
        } else {
            // Set the selected lab and close the menu if a different lab is clicked
            localStorage.setItem("numLab", lab.numeroLaboratorio)
            setSelectedLab(lab.numeroLaboratorio);
            setIsOpen(false);
            pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'))
            
        }
    }

    function handleHourClick(hour, event) {
        event.stopPropagation(); // Prevents click event from propagating to the parent div

        if (selectedHour === hour.hora) {
            // Toggle menu visibility if the same hour is clicked
            setIsOpen(prevIsOpen => !prevIsOpen);
        } else {
            // Set the selected hour and close the menu if a different hour is clicked
            localStorage.setItem("periodo", hour.hora)
            setSelectedHour(hour.hora);
            setIsOpen(false);
            pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'))
        }
    }

    function handleSelectClick(event) {
        event.stopPropagation(); // Prevents click event from propagating

        // Toggle menu visibility
        setIsOpen(prevIsOpen => !prevIsOpen);
    }

    function handleClickOutside(event) {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false); // Close the menu if click is outside
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    var horarios = [{ hora: "Manhã" }, { hora: "Tarde" }, { hora: "Noite" }]

    return (
        <div
            ref={selectRef} // Attach the ref to the container
            className={isOpen ? `${styles.select} ${styles.selectactive}` : styles.select}
            id="options"
            name="options"
            onClick={handleSelectClick} // Handle click for opening/closing the menu
        >
            <div className={isOpen ? styles.main && styles.mainactive : styles.main}>
                {Type == "lab" ? labs.map((lab, index) => (
                    <div
                        className={
                            isOpen
                                ? `${styles.option} ${styles.menu}`
                                : (selectedLab === lab.numeroLaboratorio
                                    ? `${styles.option} ${styles.on}`
                                    : styles.option)
                        }
                        key={index}
                        onClick={(event) => handleLabClick(lab, event)} // Handle click for selecting an option
                    >
                        <div id={lab.numeroLaboratorio} className={!isOpen ? '' : styles.info}>
                            {lab.tipoLaboratorio + " "}{lab.numeroLaboratorio}
                        </div>
                        {(selectedLab === lab.numeroLaboratorio && !isOpen) ?
                            (<div className={styles.arrow}>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>)
                            : null}
                    </div>
                )) : null}

                {Type == "date" ? horarios.map((hour, index) => (
                    <div
                        className={
                            isOpen
                                ? `${styles.option} ${styles.menu}`
                                : (selectedHour === hour.hora
                                    ? `${styles.option} ${styles.on}`
                                    : styles.option)
                        }
                        key={index}
                        onClick={(event) => handleHourClick(hour, event)} // Handle click for selecting an option
                    >
                        <div id={hour.hora} className={!isOpen ? '' : styles.info}>
                            {hour.hora}
                        </div>
                        {(selectedHour === hour.hora && !isOpen) ?
                            (<div className={styles.arrow}>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </div>)
                            : null}
                    </div>
                )) : null}

            </div>
        </div>
    )
}

export default Select
