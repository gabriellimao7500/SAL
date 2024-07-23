import styles from './LabsSelect.module.css'
import { Link } from 'react-router-dom'
import './button.css'

function LabsSelect({svg, name}){
    
    return(
        <Link to="/Labs" className={styles.button}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <h3>{name}</h3>
        </Link>
    )
}

export default LabsSelect