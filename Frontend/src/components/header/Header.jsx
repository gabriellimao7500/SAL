import './Header.css'
import User from './User/User'

import Hamburguer from '../Hamburguer/Hamburguer'

function Header(){
    return(
        <header>
            <Hamburguer></Hamburguer>
            <section className='division'>
                <div>
                <div></div>
                <h1>S.A.L</h1>
                </div>
                <section className='info'>
                    <div>About us</div>
                    <div>Docs</div>
                    <div>Help</div>
                </section>
                <div className='schoolName'></div>
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