import React, { useState, useEffect, useRef } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios'

function Reserva({ reserva , onBotaoClique, type, date, aula, pullMarks}) {
  const [visible, setVisible] = useState(true);
  const [professor, setProfessor] = useState(JSON.parse(sessionStorage.getItem('professor')))
  const [motivo, setMotivo] = useState('')
  const reservasRef = useRef(null);
  const { periodo } = reserva
  var dt = new Date(date);
  var d = dt.getUTCDate();
  var m = dt.getUTCMonth() + 1;
  var a = dt.getUTCFullYear();
  if(d < 10){
    d = "0" + d
  }
  if(m < 10){
    m = "0" + m
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (reservasRef.current && !reservasRef.current.contains(event.target)) {
        setVisible(false);
        onBotaoClique();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reservasRef]);

const handleLogin = async(e) =>{
  
  e.preventDefault()
  
  if(professor){
      const  data2 = date;
      const periodo2 = localStorage.getItem('periodo');
      const aula2 = aula;
      const idProf = professor.idProfessor;
      const numLab2 = localStorage.getItem('numLab');
      const tipoLab = localStorage.getItem('typeLab');
      const motivo2 = motivo;

      const result = await axios.post('http://localhost:3333/createMarks',
        JSON.stringify({
          "dataReserva": date,
          "periodo": periodo2,
          "aulaReserva":aula2,
          "idProfessor": idProf,
          "numeroLaboratorio": numLab2,
          "tipoLaboratorio":tipoLab,
          "motivo":motivo2
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log(professor.idProfessor)
      console.log(localStorage.getItem('periodo'))
      console.log(aula)
      console.log(localStorage.getItem('typeLab'))
      console.log(localStorage.getItem('numLab'))
      console.log(date)
      console.log(motivo)

  }else{
    alert('não encontrado')
  }
  pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'))
  onBotaoClique()
  
}

  return (
    <section className={visible ? styles.blur : "none"}>
      <section ref={reservasRef} className={styles.reservas}>
        {`${periodo} ${d}/${m}/${a}`}
        {type ? (
            <form action="" onSubmit={handleLogin}>
                <input type="text" name="" id="" onChange={(e) => setMotivo(e.target.value)} />
                <input className={styles.submit}  type="submit" value="Reservar"/>
            </form>
        ): ''}
      </section>
    </section>
  );
}

export default Reserva;