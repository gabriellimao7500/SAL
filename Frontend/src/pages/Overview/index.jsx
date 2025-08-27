import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { LabScheduleCard } from "../../components/LabScheduleCard";


function getAulaAtual() {
    //nessa função eu obtenho o horario atual e de acordo com o período eu digo qual aula está acontecendo
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const diaNum = String(agora.getDate()).padStart(2, '0');
    const dia = `${ano}-${mes}-${diaNum}`;
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    let aulaAtual = null;

    // Definindo os horários das aulas, cada aula tem 50 min, 6 aulas por dia com pausa na terceira aula para um intervalo de 20 min
    // A noite são dois 'blocos' de aulas
    const horarios = {
        'Manhã': ['07:00 - 07:50', '07:50 - 08:40', '08:40 - 09:30', '09:50 - 10:40', '10:40 - 11:30', '11:30 - 12:20'],
        'Tarde': ['13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:50 - 16:40', '16:40 - 17:30', '17:30 - 18:20'],
        'Noite': ['19:00 - 21:05', '21:05 - 23:00']
    };

    //se o horário estiver entre x horário determine o periodo, de acordo com isso, retorne um numero de 1 a 6 para a aula
    for (const [periodo, aulas] of Object.entries(horarios)) {
        for (let i = 0; i < aulas.length; i++) {
            const [inicio, fim] = aulas[i].split(" - ");
            const [inicioHora, inicioMinuto] = inicio.split(":").map(Number);
            const [fimHora, fimMinuto] = fim.split(":").map(Number);

            if (
                (hora > inicioHora || (hora === inicioHora && minuto >= inicioMinuto)) &&
                (hora < fimHora || (hora === fimHora && minuto < fimMinuto))
            ) {
                aulaAtual = i + 1;
                break;
            }
        }
        if (aulaAtual) break;
    }

    // console.log("a aula atual é: ", aulaAtual);
    // console.log(`A hora atual é: ${hora}:${minuto}`);


    return { aulaAtual, dia } || "Sem aula";

}

async function fetchAulaForLab(periodo, aulaReserva, idLaboratorio, dia) {
    try {
        const res = await fetch(`http://localhost:3333/marks/of/${idLaboratorio}/${aulaReserva}/${periodo}/${dia}`);
        if (!res.ok) throw new Error("Erro ao buscar aula");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default function OverviewPage() {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todasReservas, setTodasReservas] = useState([]);
    const [periodo, setPeriodo] = useState("Manhã"); // Pode ser "Manhã", "Tarde" ou "Noite"
    const [labsReservas, setLabsReservas] = useState([]);


    useEffect(() => {
        async function fetchLabs() {

            setLoading(true);
            setError(null);
            try {
                const res = await fetch("http://localhost:3333/labs/all");
                if (!res.ok) throw new Error("Erro ao buscar laboratórios");
                const data = await res.json();

                const aulaAtual = getAulaAtual().aulaAtual;
                const diaAtual = getAulaAtual().dia;

                // Aguarda todas as reservas e monta o array de labs já com reservas
                const labsComReservas = await Promise.all(
                    data.map(async (lab) => {
                        const reservaData = await fetchAulaForLab(periodo, aulaAtual, lab.idLaboratorio, diaAtual);
                        return {
                            ...lab,
                            reservas: reservaData[0],
                        };
                    })
                );
                console.log(labsComReservas);

                setLabs(labsComReservas);
                setLoading(false);
            } catch (err) {
                setError(err.message || String(err));
                setLoading(false);
            }
        }

        fetchLabs();

    }, [periodo]);


    return (
        <div style={{ background: "#000", height: "100vh" }}>
            <Header />
            <div style={{
                padding: 24, fontFamily: "Arial, sans-serif",
                margin: "0 auto", height: '80vh',
                display: 'flex',
                width: '100vw',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 16, width: '100vw' }}>
                    <h2 style={{ color: "#646BC1", fontWeight: 700, fontSize: 28 }}>Visão Geral dos Laboratórios</h2>
                </div>
                {error && (
                    <div style={{ marginTop: 12, color: "#ff6b6b" }}>Erro: {error}</div>
                )}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 28,
                        height: "100%",
                        alignItems: 'flex-start',
                        justifyContent: "space-around",
                        width: "90vw",
                        background: "#181818",
                        borderRadius: 16,
                        padding: 24,
                        overflowY: "auto",
                        paddingBottom: 24,
                    }}
                >
                    {loading ? (
                        <p style={{ color: "#646BC1", fontWeight: 500 }}>Carregando...</p>
                    ) : (
                        labs.map((lab) => (
                            <LabScheduleCard
                                key={lab.idLaboratorio}
                                lab={{
                                    id: lab.idLaboratorio,
                                    name: `${lab.tipoLaboratorio} ${lab.numeroLaboratorio}`,
                                    location: lab.bloqueado ? "Bloqueado" : "Disponível",
                                    svg: lab.svg,
                                    reserva: lab.reservas,
                                }}
                                currentContent={lab.reservas ? lab.reservas.motivo : "Sem reserva"}
                                nextContent={null}
                            />
                        ))
                    )}
                </div>
            </div>
        </div >
    );
}