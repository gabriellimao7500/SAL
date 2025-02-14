import './Hamburguer.css';

import LabsSelect from '../LabsSelect/LabsSelect';

import { useState, useEffect } from 'react'; // Importando useEffect corretamente
import SVG from './SVG';
import axios from 'axios';
import config from '../../../config';
import auditorioSvg from '../../assets/auditorio.svg';
import informaticaSvg from '../../assets/informatica.svg';
import makerSvg from '../../assets/maker.svg';
import microbiologiaSvg from '../../assets/microbiologia.svg';
import nutricaoSvg from '../../assets/nutricao.svg';
import quimicaSvg from '../../assets/quimica.svg';
import saladeleituraSvg from '../../assets/saladeleitura.svg';
import farmaciaSvg from '../../assets/farmacia.svg';

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

  const labsSvgs = [
    { tipoLaboratorio: "Auditório", svg: auditorioSvg },
    { tipoLaboratorio: "Farmácia", svg: farmaciaSvg },
    { tipoLaboratorio: "Informática", svg: informaticaSvg },
    { tipoLaboratorio: "Maker", svg: makerSvg },
    { tipoLaboratorio: "Microbiologia", svg: microbiologiaSvg },
    { tipoLaboratorio: "Nutrição", svg: nutricaoSvg },
    { tipoLaboratorio: "Química", svg: quimicaSvg },
    { tipoLaboratorio: "Sala de Leitura", svg: saladeleituraSvg },
  ];

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <div className={menu ? "menu on z_index" : "menu off z_index_off"}>
      <section className="tela">
        <section className="labs">
          {labs.map((item) => (
            <LabsSelect
              key={item.id} // Adicione uma key única
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
