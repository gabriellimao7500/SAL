import './Hamburguer.css';

import LabsSelect from '../LabsSelect/LabsSelect';

import { useState, useEffect } from 'react';
import SVG from './SVG';
import axios from 'axios';
import config from '../../../config';


import labsSvgs from '../../assets/json/lb';

function Hamburguer() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/labs`);
        setLabs(response.data);
      } catch (error) {
        console.error('Erro ao buscar laboratórios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <div className={menu ? "menu on z_index" : "menu off z_index_off"}>
      <section className="tela">
        <section className="labs">
          {labs.map((item) => (
            <LabsSelect
              key={item.id}
              svg={labsSvgs.find(labSvg => labSvg.tipoLaboratorio.trim() === item.tipoLaboratorio.trim())?.svg}
              name={item.tipoLaboratorio}
              number={item.numeroLaboratorio}
              hamburguer={true}
            />
          ))}
        </section>
      </section>
      <div className="hamburguer" onClick={toggleMenu}>
        <SVG />
      </div>
    </div>
  );
}

export default Hamburguer;
