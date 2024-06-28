import './Hamburguer.css'

import { useState } from 'react'
import SVG from './SVG'

function Hamburguer(){
    const [menu, setmenu] = useState(false)

    function onmenu(){
        if(menu == false){
            setmenu(true)
        }else{
            setmenu(false)
        }
    }
    return(
        <div className={menu == true ? "menu on" : "menu off"}>
            <section className='tela'>
            </section>
            <div className="hamburguer" onClick={onmenu}>
                <SVG></SVG>
            </div>
        </div>
    )
}

export default Hamburguer
