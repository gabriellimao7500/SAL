import './Header.css'
import User from './User/User'

import Hamburguer from '../Hamburguer/Hamburguer'
import {Link} from 'react-router-dom'

function Header(){
    return(
        <header>
            <Hamburguer></Hamburguer>
            <section className='division'>
                <div className="deadpool_2"></div>
                <div>
                <div className='deadpool_3'></div>

                <h1>
                <Link to="/">
                    S.A.L
                </Link>
                </h1>
                </div>
                <section className='info'>
                    <div>About us</div>
                    <div>Docs</div>
                    <div>Help</div>
                </section>
                <div className='duvidas'>
                    <div>duvidas</div>
                    <div>Tire todas as suas duvidas<div>conosco</div></div>
                </div>
                <User></User>
            </section>
        </header>
    )
}

export default Header