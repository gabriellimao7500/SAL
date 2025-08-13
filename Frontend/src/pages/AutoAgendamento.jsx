import Header from "../components/header/Header";
import Table from "../components/Table/Table";
import Select from "../components/Select/Select";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './AutoAgendamento.css';
import config from "../../config";
import { useNavigate } from "react-router-dom"; // Para navegação entre páginas
import { id } from "date-fns/locale";

function AutoAgendamento() {
    const navigate = useNavigate(); // Hook para navegação

    const [reservas, setReservas] = useState([]);
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

    // Estados para o modo série e seleção
    const [serieMode, setSerieMode] = useState(false);
    const [horariosSelecionados, setHorariosSelecionados] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

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

    // Função para agendar em série
    const handleAgendarSerie = async () => {
        const user = JSON.parse(sessionStorage.getItem('professor')) || {};

        if (!dataInicio || !dataFim) {
            alert('Preencha as datas de início e fim.');
            return;
        }
        if (new Date(dataFim) < new Date(dataInicio)) {
            alert('A data final deve ser igual ou posterior à data inicial.');
            return;
        }
        if (!horariosSelecionados.length) {
            alert('Selecione pelo menos um horário.');
            return;
        }

        const motivo = window.prompt("Informe o motivo para todos os agendamentos em série:", "");
        const horariosPadronizados = horariosSelecionados.map(h => ({
            dataReserva: null,
            periodo: h.periodo,
            aulaReserva: h.aula,
            idLaboratorio: h.numeroLaboratorio,
            idProfessor: user.idProfessor,
            motivo: motivo || '',
            diaSemana: h.diaSemana,
            sobrescrever: h.sobrescrever || false
        }));

        try {
            await axios.post(`${config.apiUrl}/auto-agendamento`, {
                horarios: horariosPadronizados,
                dataInicio,
                dataFim
            }, {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                console.log("Response:", response.data.conflitos);
            }).catch((error) => {
                console.error("Error:", error);
                alert('Erro ao criar agendamentos em série');
            });
            setHorariosSelecionados([]);
            setSerieMode(false);
            setDataInicio('');
            setDataFim('');
            pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
            alert('Agendamentos criados com sucesso!');
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
            <button onClick={handleMassUpdate} className="mass-update-button">
                Atualizar Tabela em Massa
            </button>

            {/* Botão e controles do modo série */}
            <button onClick={() => {
                setSerieMode(!serieMode);
                setHorariosSelecionados([]);
            }}>
                {serieMode ? 'Cancelar Seleção em Série' : 'Selecionar em Série'}
            </button>
            {serieMode && (
                <div>
                    <ul>
                        {horariosSelecionados.map((h, idx) => (
                            <li key={h.key}>{h.diaSemana} - Aula {h.aula} - Lab {h.laboratorio} - {h.periodo}</li>
                        ))}
                    </ul>
                    <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} placeholder="Data início" />
                    <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} placeholder="Data fim" />
                    <button
                        onClick={handleAgendarSerie}
                        disabled={horariosSelecionados.length === 0}
                    >
                        Agendar em Série
                    </button>
                </div>
            )}

            <Table
                reserva={reservas}
                pullMarks={pullMarks}
                serieMode={serieMode}
                horariosSelecionados={horariosSelecionados}
                setHorariosSelecionados={setHorariosSelecionados}
            />
        </div>
    );
}

export default AutoAgendamento;