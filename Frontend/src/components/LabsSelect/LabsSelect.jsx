import styles from './LabsSelect.module.css'
import { Link } from 'react-router-dom'
import './button.css'
import { useRef } from 'react'

function LabsSelect({ svg, name}) {
    const nameRef = useRef(null);

    const handleClick = () => {
        if (nameRef.current) {
            localStorage.setItem("typeLab",nameRef.current.innerText);
        }
    };

    return (
        <Link to="/Labs" className={styles.button} onClick={handleClick}>
            <div dangerouslySetInnerHTML={{ __html: svg }}></div>
            <div>
                <h3 ref={nameRef}>{name}</h3>
            </div>
        </Link>
    )
}

export default LabsSelect;
