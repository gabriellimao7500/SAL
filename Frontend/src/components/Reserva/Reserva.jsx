import React, { useState, useEffect, useRef } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios'
import InputText from './InputText/InputText';

function Reserva({ reserva, onBotaoClique, type, date, aula }) {
  const [visible, setVisible] = useState(true);
  const [professor, setProfessor] = useState(JSON.parse(sessionStorage.getItem('professor')))
  const [motivo3, setMotivo] = useState('')
  const reservasRef = useRef(null);
  const { periodo, svg, numeroLaboratorio, tipoLaboratorio, nome, email, motivo } = reserva
  var dt = new Date(date);
  var d = dt.getUTCDate();
  var m = dt.getUTCMonth() + 1;
  var a = dt.getUTCFullYear();
  if (d < 10) {
    d = "0" + d
  }
  if (m < 10) {
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

  const handleLogin = async (e) => {

    e.preventDefault()


    if (professor) {

      console.log(date)
      console.log(aula)
      console.log(motivo3)
      console.log(professor)
      console.log(localStorage.getItem('typeLab'))
      console.log(localStorage.getItem('numLab'))
      console.log(localStorage.getItem('periodo'))







      const result = await axios.post('http://192.168.1.40:3333/createMarks',
        JSON.stringify({
          "dataReserva": date,
          "periodo": localStorage.getItem('periodo'),
          "aulaReserva": aula,
          "idProfessor": professor.idProfessor,
          "numeroLaboratorio": localStorage.getItem('numLab'),
          "tipoLaboratorio": localStorage.getItem('typeLab'),
          "motivo": motivo3
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )


    } else {
      alert('Professor não reconhecido. Por favor, faça o login para reservar um horário')
    }

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
          <div className={styles.periodo}>{localStorage.getItem('periodo')}: {aula}° aula</div>
          <div className={styles.time}>{d} / {m} / {a}</div>
        </section>
        <section className={styles.labinfo}>
          <div dangerouslySetInnerHTML={{ __html: svgWithClass }}></div>
          <div className={styles.labname}>Laboratório de {localStorage.getItem('typeLab')} <div /> {localStorage.getItem('numLab')}</div>
        </section>
        {type ? (
          <form action="" onSubmit={handleLogin} className={styles.form}>
            <div className={styles.main_input}>
              <div className={styles.motivo}>Motivo:</div>
              <textarea className={styles.input} type="text" name="" id="" onChange={(e) => setMotivo(e.target.value)} />
            </div>
            <input className={styles.submit} type="submit" value="Reservar" />
          </form>
        ) : (
          <section className={styles.reservado}>
            <section className={styles.inforeserva}>
              <div className={styles.Reservado_por}><div>Reservado por:</div></div>
              <section className={styles.userinfo}>
                <img className={styles.img} src="../../../../generic.jpg" alt="" width={60} height={60} />
                <section className={styles.nameProfessor}>
                  <div className={styles.name}>{nome}</div>
                  <div className={styles.email}>{email}</div>
                </section>
              </section>
              <InputText motivo={motivo} />
            </section>
          </section>
        )}
      </section>
    </section>
  );
}

export default Reserva;