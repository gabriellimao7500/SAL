import './HowToUse.css'

import Header from '../components/header/Header'

import arrow_right from '../assets/arrow_right.svg'

import arrow_left from '../assets/arrow_left.svg'

import img1 from '../assets/Tutorial/selecao.png'
import img2 from '../assets/Tutorial/agendamento.png'
import img3 from '../assets/Tutorial/reserva.png'
import img4 from '../assets/Tutorial/meu.png'
import img5 from '../assets/Tutorial/cancelar.png'
import { useState } from 'react'

function HowToUse(){
    const [index, setIndex] = useState(0)

    const img = [
        {
            passo: "Primeiro passo: ",
            texto: "Selecione o tipo de laboratório que você pretende usar.",
            image: img1
        },
        {
            passo: "Segundo passo: ",
            texto: "Selecione o dia, o período e a aula que você pretende reservar.",
            image: img2
        },
        {
            passo: "Terceiro passo: ",
            texto: "Insira o motivo da reserva e clique em 'Reservar'.",
            image: img3
        },
        {
            passo: "Atenção: ",
            texto: "Suas reservas são mostradas em branco, enquanto as de outros professores são mostradas em rosa.",
            image: img4
        },
        {
            passo: "Observação: ",
            texto: 'Você pode cancelar o agendamento clicando em "Cancelar agendamento".',
            image: img5
        },
    ];    

    function HandleClickMenos(){
        if(index == 0){
            setIndex(img.length - 1)
        }else{
            setIndex(index - 1)
        }

    }
    function HandleClickMais(){
        if(index == img.length - 1){
            setIndex(0)
        }else{
            setIndex(index + 1)
        }
    }

    return(
        <>
            <Header></Header>
            <section className='content'>
                <div className='carrosel'>
                    <div className='button' onClick={HandleClickMenos}><img src={arrow_left} alt="svg" width={70} /></div>
                    <img className='image' src={img[index].image} alt="" width={1000}/>
                    <div className='button' onClick={HandleClickMais}><img src={arrow_right} alt="svg" width={70} /></div>
                </div>
                <div className='passos'><h1>{img[index].passo}</h1>{img[index].texto}</div>
            </section>

        </>
    )
}

export default HowToUse