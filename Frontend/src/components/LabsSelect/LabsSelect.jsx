import styles from './LabsSelect.module.css'

import './button.css'

function LabsSelect({svg, tipoLaboratorio}){
    
    return(
        <section className={styles.button}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
            <h3>{tipoLaboratorio}</h3>
        </section>
    )
}

export default LabsSelect