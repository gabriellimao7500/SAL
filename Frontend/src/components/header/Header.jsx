import './Header.css';
import User from './User/User';
import React, { useEffect, useState } from 'react';
import Hamburguer from '../Hamburguer/Hamburguer';
import { Link } from 'react-router-dom';

function Header( {Labs}) {
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
        <div className="spacing_2"></div>
        <div>
          <div className="spacing_3"></div>
          <h1>
            <Link to="/">
            <img src="../../logo.svg" alt="" width={windowWidth > 430 ? '40' : '60'} />
              <div className="logo_SAL">
                <div className='logo_beta'>{windowWidth > 430 ? 'S.A.L' : ''}</div>
                {windowWidth > 430 ? (<img  src="../../beta.svg" alt="" width={50}/>) : ''}
              </div>

            </Link>
          </h1>
        </div>
        <section className="info">
          <Link to="/AboutUs"><div className='About_Us_Link'>About us</div></Link>
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
