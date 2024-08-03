import React, { useState, useEffect, useRef } from 'react';
import styles from './Reserva.module.css';

function Reserva({ reserva , onBotaoClique, type, date}) {
  const [visible, setVisible] = useState(true);
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

  return (
    <section className={visible ? styles.blur : "none"}>
      <section ref={reservasRef} className={styles.reservas}>
        {`${periodo} ${d}/${m}/${a}`}
        {type ? (
            <form action="" onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input type="text" name="" id="" />
                <input className={styles.submit}  type="submit" value="Reservar" onClick={onBotaoClique} />
            </form>
        ): ''}
      </section>
    </section>
  );
}

export default Reserva;