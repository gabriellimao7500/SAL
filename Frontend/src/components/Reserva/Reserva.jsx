import React, { useState, useEffect, useRef } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios'
import InputText from './InputText/InputText';

function Reserva({ reserva , onBotaoClique, type, date, aula, pullMarks}) {
  const [visible, setVisible] = useState(true);
  const [professor, setProfessor] = useState(JSON.parse(sessionStorage.getItem('professor')))
  const [motivo3, setMotivo] = useState('')
  const reservasRef = useRef(null);
  const { periodo, svg, numeroLaboratorio, tipoLaboratorio, nome, email, motivo} = reserva
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
      
      const periodo2 = localStorage.getItem('periodo');
      const aula2 = aula;
      const idProf = professor.idProfessor;
      const numLab2 = localStorage.getItem('numLab');
      const tipoLab = localStorage.getItem('typeLab');
      const motivo2 = motivo3;

      const result = await axios.post('http://localhost:3333/createMarks',
        JSON.stringify({
          "dataReserva": date,
          "periodo": periodo2,
          "aulaReserva":aula,
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
      

  }else{
    alert('não encontrado')
  }
  pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'))
  onBotaoClique()
  
}

  const [svgWithClass, setSvgWithClass] = useState('');

  useEffect(() => {
    const updatedSvg = svg.replace('<svg', `<svg class="${styles.svg}"`);
    setSvgWithClass(updatedSvg);
  }, [svg]);

  return (
    <section className={visible ? styles.blur : "none"}>
      <section ref={reservasRef} className={styles.reservas}>
        <section className={styles.hours}>
          <div className={styles.periodo}>{periodo}: {aula}° aula</div>
          <div className={styles.time}>{d} / {m} / {a}</div>
        </section>
        {type ? (
            <form action="" onSubmit={handleLogin}>
                <input type="text" name="" id="" onChange={(e) => setMotivo(e.target.value)} />
                <input className={styles.submit}  type="submit" value="Reservar"/>
            </form>
        ): (
          <section className={styles.reservado}>
            <section className={styles.labinfo}>
            <div dangerouslySetInnerHTML={{ __html: svgWithClass }}></div>
            <div className={styles.labname}>Laboratório de {tipoLaboratorio} <div/> {numeroLaboratorio}</div>
            </section>
            <section className={styles.inforeserva}>
              <div className={styles.Reservado_por}><div>Reservado por:</div></div>
              <section className={styles.userinfo}>
                <img className={styles.img} src="../../../../generic.jpg" alt="" width={60} height={60}/>
                <section className={styles.nameProfessor}>
                  <div className={styles.name}>{nome}</div>
                  <div className={styles.email}>{email}</div>
                </section>
              </section>
              <InputText motivo={motivo}/>
            </section>
          </section>
        )}
      </section>
    </section>
  );
}

export default Reserva;