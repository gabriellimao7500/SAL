import Header from "../components/header/Header";
import Table from "../components/Table/Table";
import Select from "../components/Select/Select";
import config from "../../config";
import { useState, useEffect } from "react";
import axios from "axios";
import './Labs.css';

function Labs() {

    const [reservas, setReservas] = useState([]);
    const [periodo2, setPeriodo2] = useState(localStorage.getItem('periodo'))
    const [tipo2, setTipo2] = useState(localStorage.getItem('typeLab'))
    const [num2, setNum2] = useState(localStorage.getItem('numLab'))



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
    console.log(reservas)

    return (
        <div className="App">
            <Header Labs={true} />
            <div className="select_main">
                <Select LabAtu={1} Type={"lab"} pullMarks={pullMarks} />
                <Select Type={"date"} horarioAtu={"Manhã"} pullMarks={pullMarks} />
            </div>

            <Table reserva={reservas} pullMarks={pullMarks} />
        </div>
    );
}

export default Labs;