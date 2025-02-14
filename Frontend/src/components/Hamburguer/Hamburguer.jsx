import './Hamburguer.css'

import LabsSelect from '../LabsSelect/LabsSelect';

import { useState } from 'react'
import SVG from './SVG'

function Hamburguer(){

    const labs = [
        {
          "idLaboratorio": 12,
          "tipoLaboratorio": "Auditório",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 9,
          "tipoLaboratorio": "Farmácia",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 1,
          "tipoLaboratorio": "Informática",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 10,
          "tipoLaboratorio": "Maker",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 8,
          "tipoLaboratorio": "Microbiologia",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 7,
          "tipoLaboratorio": "Nutrição",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 5,
          "tipoLaboratorio": "Química",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 11,
          "tipoLaboratorio": "Sala de Leitura",
          "numeroLaboratorio": 1,
          "svg": null
        },
        {
          "idLaboratorio": 6,
          "tipoLaboratorio": "Segurança do Trabalho",
          "numeroLaboratorio": 1,
          "svg": null
        }
      ]

    const [menu, setmenu] = useState(false)

    function onmenu(){
        if(menu == false){
            setmenu(true)
        }else{
            setmenu(false)
        }
    }
    return(
        <div className={menu == true ? "menu on z_index" : "menu off z_index_off"}>
            <section className='tela'>
                <section className='labs'>
                    {labs.map( (item) => (
                            <LabsSelect svg={item.svg} name={item.tipoLaboratorio} number={item.numeroLaboratorio} hamburguer={true}></LabsSelect>
                    ))}
                </section>
            </section>
            <div className="hamburguer" onClick={onmenu}>
                <SVG></SVG>
            </div>
        </div>
    )
}

export default Hamburguer
