import styles from './LabsSelect.module.css'
import { Link } from 'react-router-dom'
import './button.css'

function LabsSelect({svg, name, number}){
    
    return(
        <Link to="/Labs" className={styles.button}>
            <div dangerouslySetInnerHTML={{ __html: svg }}></div>
            <div>
                <h3>{name}</h3>
            </div>
        </Link>
    )
}

export default LabsSelect