import './Inputs.css'
import { useState } from 'react'

/**
 * 
 * @param {string} text - placeholder
 * @param {string} type - type of input
 * @returns {JSX} input
 */

function Inputs({text, type}){

    const [txt, settxt] = useState('')

    return(
        <>
            <div className='inpt'>
                <div>{text}</div>
                <input className={txt !== '' ? 'not-empty' : ''} type={type} onChange={(e) => { settxt(e.target.value) }}/>
          </div>
        </>
    )
}


export default Inputs