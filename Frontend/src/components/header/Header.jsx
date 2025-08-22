import './Header.css';
import User from './User/User';
import React, { useEffect, useState } from 'react';
import Hamburguer from '../Hamburguer/Hamburguer';
import { Link } from 'react-router-dom';

function Header({ Labs }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Exemplo: verifica se o usuário é admin pelo localStorage
    if (JSON.parse(sessionStorage.getItem('professor'))) {
      let user = JSON.parse(sessionStorage.getItem('professor'));
      if (user.rule === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);


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
                {windowWidth > 430 ? (<img src="../../beta.svg" alt="" width={50} />) : ''}
              </div>

            </Link>
          </h1>
        </div>
        <section className="info">
          <Link to="/AboutUs"><div className='Header_Link'>Sobre nós</div></Link>
          <Link to="https://github.com/gabriellimao7500/SAL" target="_blank"><div className='Header_Link'>Docs</div></Link>
          <Link to="/HowToUse">
            <div className='Header_Link'>Ajuda</div>
          </Link>

        </section>
        <a className="duvidas" href="mailto:gabriellimao7500@gmail.com?subject=Dúvida&body=Olá, gostaria de tirar uma dúvida." target="_blank">
          <div>dúvidas</div>
          <div>
            Tire todas as suas dúvidas
            <div>conosco</div>
          </div>
        </a>
        {isAdmin && (<>

          <Link to="/AdminDashboard" className='button-admin' style={{
            background: '#8b5cf6',
            color: '#fff',
            border: '1px solid #8b5cf6',
            borderRadius: '8px',
            padding: '10px 22px',
            fontWeight: 600,
            fontSize: '1.08rem',
            marginLeft: '12px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px #8b5cf633',
            transition: 'background 0.2s, color 0.2s, border 0.2s'
          }}>
            Painel Admin

          </Link>
        </>

        )}
        <User />
      </section>
    </header >
  );
}

export default Header;
