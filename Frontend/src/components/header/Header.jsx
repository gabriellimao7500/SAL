import './Header.css';
import User from './User/User';
import React, { useEffect, useState } from 'react';
import Hamburguer from '../Hamburguer/Hamburguer';
import { Link } from 'react-router-dom';

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <Hamburguer />
      <section className="division">
        <div className="deadpool_2"></div>
        <div>
          <div className="deadpool_3"></div>
          <h1>
            <Link to="/">
              <div>{windowWidth > 430 ? 'S.A.L' : ''}</div>
              <img src="../../logo.svg" alt="" width={windowWidth > 430 ? '40' : '60'} />
            </Link>
          </h1>
        </div>
        <section className="info">
          <div>About us</div>
          <div>Docs</div>
          <div>Help</div>
        </section>
        <div className="duvidas">
          <div>duvidas</div>
          <div>
            Tire todas as suas duvidas
            <div>conosco</div>
          </div>
        </div>
        <User />
      </section>
    </header>
  );
}

export default Header;
