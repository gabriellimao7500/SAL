import { useState, useEffect } from "react"
import styles from "./Button.module.css"

function Button({content, isActive, onClick }){

    const [teste, setTeste] = useState(false)


    return(
        <div className={styles.main} onClick={onClick}>
            <div className={isActive ? styles.in : styles.off}>{content}</div>
            <div className={`${isActive ? styles.ball_in : styles.ball_off} ${styles.ball}`}></div> 
        </div>
    )
}

export default Button