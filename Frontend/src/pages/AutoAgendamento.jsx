import Header from "../components/header/Header";
import Table from "../components/Table/Table";
import Select from "../components/Select/Select";
import { useState, useEffect } from "react";
import axios from "axios";
import './AutoAgendamento.css';
import config from "../../config";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas

const exemplo = [{
    idReserva: 5013,
    dataReserva: "2025-03-21T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 4,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas'
},
{
    idReserva: 47959,
    dataReserva: '2025-03-19T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'BD2 - com professores ALINE - 2º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 50083,
    dataReserva: "2025-03-19T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'BD2 - com professores ALINE - 2º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 47978,
    dataReserva: "2025-03-20T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 50102,
    dataReserva: "2025-03-20T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 48007,
    dataReserva: "2025-03-21T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas'
},
{
    idReserva: 50131,
    dataReserva: "2025-03-21T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 5,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas'
},
{
    idReserva: 47979,
    dataReserva: "2025-03-20T03:00:00.000Z",
    periodo: 'Manhã',
    aulaReserva: 6,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 50103,
    dataReserva: '2025-03-20T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 6,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'SE - com professores JUNIOR /THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 48008,
    dataReserva: '2025-03-21T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 6,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas'
},
{
    idReserva: 50132,
    dataReserva: '2025-03-21T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 6,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'DS - com professores THAYANI / ALLAN - 2º Desenvolvimento de sistemas'
},
{
    idReserva: 48073,
    dataReserva: '2025-03-26T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 1,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'PDTCC - com professores ALINE / THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 50197,
    dataReserva: '2025-03-26T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 1,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'PDTCC - com professores ALINE / THAYANI - 3º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 48092,
    dataReserva: '2025-03-27T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 1,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'FI - com professores JUNIOR /THAYANI - 1º MTEC Desenvolvimento de sistemas'
},
{
    idReserva: 50216,
    dataReserva: '2025-03-27T03:00:00.000Z',
    periodo: 'Manhã',
    aulaReserva: 1,
    nome: 'Coodenador Davi',
    email: 'adm@gmail.com',
    tipoLaboratorio: 'Informática',
    numeroLaboratorio: 1,
    svg: '',
    motivo: 'FI - com professores JUNIOR /THAYANI - 1º MTEC Desenvolvimento de sistemas'
}]

function AutoAgendamento() {
    const navigate = useNavigate(); // Hook para navegação

    const [reservas, setReservas] = useState([]);
    const [periodo2, setPeriodo2] = useState(localStorage.getItem('periodo'))
    const [tipo2, setTipo2] = useState(localStorage.getItem('typeLab'))
    const [num2, setNum2] = useState(localStorage.getItem('numLab'))

    const [serie, setSerie] = useState({
        diaSemana: '',
        aula: '',
        dataInicio: '',
        dataFim: '',
        laboratorio: '',
        periodo: '',
        motivo: '',
        professor: ''
    });

    const pullMarks = async (periodo2, tipo2, numLab2) => {

        const result = await axios.post(`${config.apiUrl}/Marks`,
            JSON.stringify({
                "periodo": periodo2,
                "tipoLaboratorio": tipo2,
                "numeroLaboratorio": numLab2
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        );
        setReservas(result.data);

        //console.log("Reservas:", result.data);

    };

    useEffect(() => {

        localStorage.setItem("periodo", 'Manhã')
        localStorage.setItem("numLab", 1)
        pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
        //console.log(reservas);


    }, []); // Chama pullMarks uma vez quando o componente monta




    const handleViewConflicts = () => {
        navigate('/conflicts'); // Redireciona para a página de conflitos
    };

    const handleMassUpdate = () => {
        navigate('/mass-update'); // Redireciona para a página de atualização em massa
    };

    const handleSerieChange = (e) => {
        setSerie({ ...serie, [e.target.name]: e.target.value });
    };

    const handleAgendarSerie = async () => {
        try {
            await axios.post(`${config.apiUrl}/auto-agendamento`, serie, {
                headers: { 'Content-Type': 'application/json' }
            });
            pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
            alert('Agendamentos criados com sucesso!');
            // Atualize a tabela se necessário
        } catch (err) {
            alert('Erro ao criar agendamentos em série');
        }
    };

    return (
        <div className="App">
            <Header Labs={true} />
            <div className="select_main">
                <Select LabAtu={1} Type={"lab"} pullMarks={pullMarks} />
                <Select Type={"date"} horarioAtu={"Manhã"} pullMarks={pullMarks} />
            </div>
            <button onClick={handleViewConflicts} className="conflicts-button">
                Ver Divergências
            </button>
            <button onClick={handleMassUpdate} className="mass-update-button">
                Atualizar Tabela em Massa
            </button>

            <Table reserva={reservas} pullMarks={pullMarks} />
            <form>
                <select name="diaSemana" onChange={handleSerieChange}>
                    <option value="">Dia da semana</option>
                    <option value="segunda">Segunda</option>
                    <option value="terca">Terça</option>
                    <option value="quarta">Quarta</option>
                    <option value="quinta">Quinta</option>
                    <option value="sexta">Sexta</option>
                </select>
                <input type="text" name="aula" placeholder="Aula" onChange={handleSerieChange} />
                <input type="date" name="dataInicio" onChange={handleSerieChange} />
                <input type="date" name="dataFim" onChange={handleSerieChange} />
                <input type="text" name="laboratorio" placeholder="Laboratório" onChange={handleSerieChange} />
                <input type="text" name="periodo" placeholder="Período" onChange={handleSerieChange} />
                <input type="text" name="motivo" placeholder="Motivo" onChange={handleSerieChange} />
                <input type="text" name="professor" placeholder="ID Professor" onChange={handleSerieChange} />
                <button type="button" onClick={handleAgendarSerie}>Agendar em Série</button>
            </form>

        </div>
    );
}

export default AutoAgendamento;