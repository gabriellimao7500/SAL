import styles from './LabsSelect.module.css'
import { Link } from 'react-router-dom'
import './button.css'
import { useRef } from 'react'

import config from '../../../config'

function LabsSelect({ svg, name , hamburguer}) {
    const nameRef = useRef(null);

    var url = config.apiUrl;
    const handleClick = () => {
        if (nameRef.current) {
            localStorage.setItem("typeLab",nameRef.current.innerText);
            if("/Labs" === window.location.pathname){
                window.location.reload(true);
            }
        }
    };

    return (
        <Link to="/Labs" className={hamburguer ? styles.button2 : styles.button} onClick={handleClick}>
            <div dangerouslySetInnerHTML={{ __html: svg }}></div>
            <div>
                <h3 ref={nameRef}>{name}</h3>
            </div>
        </Link>
    )
}

export default LabsSelect;
