import React, { useState, useEffect, useRef } from 'react';
import styles from './Reserva.module.css';
import axios from 'axios'
import InputText from './InputText/InputText';
import config from '../../../config';
import Swal from 'sweetalert2';

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
    e.preventDefault();
  
    if (!professor) {
      // Caso o professor não esteja logado
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para reservar!',
        footer: '<a href="/login">Clique aqui para fazer login</a>'
      });
      return;
    }
  
    // Logando as informações para depuração

    try {
      // Tentando criar a reserva
      const result = await axios.post(
        `${config.apiUrl}/createMarks`,
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
      );

       

        Swal.fire({
          title: 'Reserva Criada',
          text: 'Sua reserva foi criada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      
    } catch (error) {
      if(error.response.status === 404){
      Swal.fire({
        title: 'Limite de Agendamentos Atingido',
        text: 'Você já fez 4 agendamentos nesta semana. Você só pode fazer novos agendamentos na próxima semana.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }else{
      Swal.fire({
        title: 'Erro ao criar reserva',
        text: 'Houve um erro ao criar a reserva. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

    }
    }
  
    // Função para clique do botão
    onBotaoClique();
  };
  

  const [svgWithClass, setSvgWithClass] = useState('');

  function RemoverAgendamento(){
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você realmente deseja remover este agendamento?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // função para retirar o agendamento

            Swal.fire(
                'Agendamento removido!',
                'Você retirou seu agendamento com sucesso.',
                'success'
            );
        }
    });
  }

  return (
    <section className={visible ? styles.blur : "none"}>
      <section ref={reservasRef} className={styles.reservas}>
        <section className={styles.hours}>
          <div className={styles.periodo}>
            {localStorage.getItem("periodo")}: {aula}° aula
          </div>
          <div className={styles.time}>
            {d} / {m} / {a}
          </div>
        </section>
        <section className={styles.labinfo}>
          <div dangerouslySetInnerHTML={{ __html: svgWithClass }}></div>
          <div className={styles.labname}>
            Laboratório de {localStorage.getItem("typeLab")} <div />{" "}
            {localStorage.getItem("numLab")}
          </div>
        </section>
  
        {type === "nothing" && (
          <form action="" onSubmit={handleLogin} className={styles.form}>
            <div className={styles.main_input}>
              <div className={styles.motivo}>Motivo:</div>
              <textarea
                className={styles.input}
                type="text"
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>
            <input className={styles.submit} type="submit" value="Reservar" />
          </form>
        )}
  
        {type === "other" && (
          <section className={styles.reservado}>
            <section className={styles.inforeserva}>
              <div className={styles.Reservado_por}>
                <div>Reservado por:</div>
              </div>
              <section className={styles.userinfo}>
                <img
                  className={styles.img}
                  src="../../../../generic.jpg"
                  alt=""
                  width={60}
                  height={60}
                />
                <section className={styles.nameProfessor}>
                  <div className={styles.name}>{nome}</div>
                  <div className={styles.email}>{email}</div>
                </section>
              </section>
              <InputText motivo={motivo} />
            </section>
          </section>
        )}

        {type === "me" && (
          <section className={styles.reservado}>
            <section className={styles.inforeserva}>
              <div className={styles.Reservado_por}>
                <div>Reservado por:</div>
              </div>
              <section className={styles.userinfo}>
                <img
                  className={styles.img}
                  src="../../../../generic.jpg"
                  alt=""
                  width={60}
                  height={60}
                />
                <section className={styles.nameProfessor}>
                  <div className={styles.name}>{nome}</div>
                  <div className={styles.email}>{email}</div>
                </section>
              </section>
              <InputText motivo={motivo} />
              <input onClick={RemoverAgendamento} className={`${styles.submit} ${styles.cancelar}`} type="submit" value="cancelar agendamento" />
            </section>
          </section>
        )}
      </section>
    </section>
  );
  
}

export default Reserva;