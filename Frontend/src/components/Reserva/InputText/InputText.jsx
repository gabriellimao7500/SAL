import styles from './InputText.module.css'

function InputText({type, motivo}){
    return(
        <div className={styles.content}>
            <div className={styles.motivo}>Motivo:</div>
            <div className={styles.input}>
                <div className={styles.text}>{motivo}</div>
            </div>
        </div>
    )
}

export default InputText