import './Inputs.css';
import React from 'react';

/**
 * 
 * @param {string} text - placeholder
 * @param {string} type - type of input
 * @param {string} name - name of input
 * @param {string} value - value of input
 * @param {function} onChange - onChange handler
 * @returns {JSX} input
 */
function Inputs({ text, type, name, value, onChange }) {
    return (
        <div className='inpt'>
            <div>{text}</div>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange} 
                className={value !== '' ? 'not-empty inp' : 'inp'} 
            />
        </div>
    );
}

export default Inputs;
