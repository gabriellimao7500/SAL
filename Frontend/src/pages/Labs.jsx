import Header from "../components/header/Header";
import Table from "../components/Table/Table";
import Select from "../components/Select/Select";
import { useState, useEffect } from "react";
import axios from "axios";
import './Labs.css';
import config from "../../config";

function Labs() {

    const [reservas, setReservas] = useState([]);
    const [periodo2, setPeriodo2] = useState(localStorage.getItem('periodo'))
    const [tipo2, setTipo2] = useState(localStorage.getItem('typeLab'))
    const [num2, setNum2] = useState(localStorage.getItem('numLab'))
    const [serieMode, setSerieMode] = useState(false);
    const [horariosSelecionados, setHorariosSelecionados] = useState([]);



    const pullMarks = async (periodo2, tipo2 = tipo2, numLab2) => {

        const result = await axios.post(`http://localhost:3333/Marks`,
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

        ).catch((error) => {
            console.error("Error fetching marks:", error);
        });
        console.log(result.data);

        setReservas(result.data);


    };

    useEffect(() => {

        localStorage.setItem("periodo", 'Manhã')
        localStorage.setItem("numLab", 1)
        pullMarks(localStorage.getItem('periodo'), localStorage.getItem('typeLab'), localStorage.getItem('numLab'));
    }, []); // Chama pullMarks uma vez quando o componente monta

    /*var reserva = [
        {
        "idReserva": 14,
        "dataReserva": "2024-08-15T03:00:00.000Z",
        "periodo": "Manhã",
        "aulaReserva": 2,
        "nome": "prof a",
        "email": "prof.a@example.com",
        "tipoLaboratorio": "Auditório",
        "numeroLaboratorio": 1,
        "svg": "bb",
        "motivo": "hsvjdfvkasjvda",
        "turma": ""
    }
    ]*/

    var re = [
        {
            "idReserva": 65,
            "dataReserva": "2025-01-10T03:00:00.000Z",
            "periodo": "Manhã",
            "aulaReserva": 1,
            "nome": "teste",
            "email": "teste@1",
            "tipoLaboratorio": "Informática",
            "numeroLaboratorio": 1,
            "svg": "",
            "motivo": "pq sim"
        }
    ]


    return (
        <div className="App">
            <Header Labs={true} />
            <div className="select_main">
                <Select LabAtu={1} Type={"lab"} pullMarks={pullMarks} />
                <Select Type={"date"} horarioAtu={"Manhã"} pullMarks={pullMarks} />
            </div>
            <Table
                reserva={reservas}
                serieMode={false}
                pullMarks={pullMarks}
                horariosSelecionados={horariosSelecionados}
                setHorariosSelecionados={setHorariosSelecionados}
            />
        </div>
    );
}

export default Labs;