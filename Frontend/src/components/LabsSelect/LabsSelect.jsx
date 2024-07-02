import styles from './LabsSelect.module.css'

import './button.css'

function LabsSelect({svg, name}){
    
    return(
        <section className={styles.button}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <h3>{name}</h3>
        </section>
    )
}

export default LabsSelect