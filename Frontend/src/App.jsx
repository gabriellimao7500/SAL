import { useState } from 'react'
import './App.css'

import Header from './components/header/Header'

function App() {
  const [count, setCount] = useState(0)

  function blur(){
    
  }

  const [isSibling1Hovered, setIsSibling1Hovered] = useState(false);
  const [isSibling2Hovered, setIsSibling2Hovered] = useState(false);

  const handleSibling1MouseEnter = () => {
    setIsSibling2Hovered(true);
  };

  const handleSibling1MouseLeave = () => {
    setIsSibling2Hovered(false);
  };

  const handleSibling2MouseEnter = () => {
    setIsSibling1Hovered(true);
  };

  const handleSibling2MouseLeave = () => {
    setIsSibling1Hovered(false);
  };

  return (
    <>
      <Header></Header>
      <section className='Content'>
        <div>
          <h1>S.A.L</h1>
          <h2>Sistema de Agendamento de Laboratórios</h2>
          <div className='desc'><div> Um sistema pensado para professores que querem <div>usar os </div> </div> laboratórios nas suas aulas</div>
        </div>
        <div className='line1'></div>
        <div className='buttons'>
          <button 
          className='button1' 
          onMouseEnter={handleSibling1MouseEnter}
          onMouseLeave={handleSibling1MouseLeave}
          style={{ filter: isSibling1Hovered ? 'blur(1.3px)' : 'none' }}>
            Start to use
          </button> 
          <button
            className='button2'
            onMouseEnter={handleSibling2MouseEnter}
            onMouseLeave={handleSibling2MouseLeave}
            style={{ filter: isSibling2Hovered ? 'blur(1.3px)' : 'none' }}>
              How to use
            </button>
        </div>
        <div className='line2'></div>
      </section>
      
    </>
  )
}

export default App
