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
        //console.log("Esse é data 0", data[0]);

        const newData = data[0] == undefined ? [{ motivo: "Sem reserva" }] : data;
        return newData;
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


    const horarios = {
        'Manhã': ['07:00 - 07:50', '07:50 - 08:40', '08:40 - 09:30', '09:50 - 10:40', '10:40 - 11:30', '11:30 - 12:20'],
        'Tarde': ['13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:50 - 16:40', '16:40 - 17:30', '17:30 - 18:20'],
        'Noite': ['19:00 - 21:05', '21:05 - 23:00']
    };

    //verifica o periodo de acordo com a hora quando o componente carrega, manhã, tarde ou noite
    useEffect(() => {
        const agora = new Date();
        const hora = agora.getHours();
        //console.log(`A hora atual é: ${hora}`);

        if (hora < 12) {
            setPeriodo("Manhã");
        } else if (hora < 18) {
            setPeriodo("Tarde");
        } else {
            setPeriodo("Noite");
        }
    }, []);


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

                // console.log(`Aula Atual: ${aulaAtual}, Dia Atual: ${diaAtual}`);

                // Aguarda todas as reservas e monta o array de labs já com reservas
                const labsComReservas = await Promise.all(
                    data.map(async (lab) => {
                        const reservaData = await fetchAulaForLab(periodo, aulaAtual, lab.idLaboratorio, diaAtual);
                        //Busca a aula anterior se for maior que 1 e deixa nulo caso for menor ou igual a 1 e maior ou igual a 6
                        let aulaAnterior = null;
                        if (aulaAtual >= 1) {
                            let r = await fetchAulaForLab(periodo, aulaAtual - 1, lab.idLaboratorio, diaAtual);

                            //console.log("Essa é aula anterior do lab ", lab.idLaboratorio, r);

                            aulaAnterior = r;
                        }
                        // console.log("Esse é aula anterior", aulaAnterior);
                        let proximaAula = null;
                        if (aulaAtual <= 6) {
                            proximaAula = await fetchAulaForLab(periodo, aulaAtual + 1, lab.idLaboratorio, diaAtual);
                        }


                        if (aulaAtual == 1) {
                            aulaAnterior = null;
                        }
                        // console.log("Esse é proxima aula", proximaAula);
                        if (aulaAtual == 6) {
                            proximaAula = null
                        }


                        return {
                            ...lab,
                            current: reservaData[0],
                            previous: aulaAnterior[0],
                            next: proximaAula[0],
                        };
                    })
                );

                // console.log(labsComReservas);

                setLabs(labsComReservas);
                setLoading(false);
            } catch (err) {
                setError(err.message || String(err));
                setLoading(false);
            }
        }

        fetchLabs();

    }, [periodo]);

    const labsPorTipo = labs.reduce((acc, lab) => {
        if (!acc[lab.tipoLaboratorio]) acc[lab.tipoLaboratorio] = [];
        acc[lab.tipoLaboratorio].push(lab);
        return acc;
    }, {});
    const tipos = Object.keys(labsPorTipo);
    const tiposOrdenados = [
        ...tipos.filter(t => t === "Informática"),
        ...tipos.filter(t => t !== "Informática").sort()
    ];

    return (
        <div style={{ background: "#181818", height: "100vh" }}>
            <Header />
            <div style={{
                padding: 24, fontFamily: "Arial, sans-serif",
                margin: "0 auto", height: '80vh',
                display: 'flex',
                width: '100vw',
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "90%"
            }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 16, width: '100vw' }}>
                    <h2 style={{ color: "#646BC1", fontWeight: 700, fontSize: 28 }}>Visão Geral dos Laboratórios</h2>
                </div>

                {error && (
                    <div style={{ marginTop: 12, color: "crimson" }}>Erro: {error}</div>
                )}
                {loading ? (
                    <p style={{ color: "#646BC1", fontWeight: 500 }}>Carregando...</p>
                ) : (
                    <div id="labs-container" style={{
                        display: "flex",
                        gap: 20,
                        borderRadius: 12,
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                        width: "95vw",
                        padding: "40px 30px",
                        overflowY: "auto",
                        background: "#181818",

                    }}>
                        {/* <h3 style={{ color: "#646BC1", fontWeight: 700, fontSize: 24 }}>{tipo}</h3> */}
                        {//ordeno de acordo com meu vetor
                            tiposOrdenados.map((tipo) => (





                                labsPorTipo[tipo].map((lab) => (
                                    <LabScheduleCard
                                        key={lab.idLaboratorio}
                                        lab={{
                                            id: lab.idLaboratorio,
                                            name: `${lab.tipoLaboratorio} ${lab.numeroLaboratorio}`,
                                            location: lab.bloqueado ? "Bloqueado" : "Disponível",
                                            svg: lab.svg,
                                            current: lab.current,
                                            previous: lab.previous,
                                            next: lab.next


                                        }}
                                        // content={lab}

                                        horarioAula={getAulaAtual().aulaAtual - 1}
                                        horarios={horarios[periodo]}
                                    />
                                ))



                            ))}
                    </div>
                )}
            </div>
        </div >
    );
}


/*
 (() => {
                        const tipos = Object.keys(labsPorTipo);
                        const tiposOrdenados = [
                            ...tipos.filter(t => t === "Informática"),
                            ...tipos.filter(t => t !== "Informática").sort()
                        ];
                        return tiposOrdenados.map((tipo) => (
                            <div key={tipo} style={{ marginBottom: 36 }}>
                                <h3 style={{ color: "#646BC1", fontWeight: 600, fontSize: 22, marginBottom: 12, marginLeft: 8 }}>{tipo}</h3>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 28,
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        minHeight: 120,
                                        width: "100%",
                                        background: "#f7f7f7",
                                        borderRadius: 16,
                                        padding: 24,
                                        boxSizing: "border-box"
                                    }}>
                                    {labsPorTipo[tipo].map((lab) => (
                                        <div key={lab.idLaboratorio} style={{
                                            flex: "1 1 calc(50% - 28px)",
                                            maxWidth: "calc(50% - 28px)",
                                            minWidth: 260,
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            <LabScheduleCard
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
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ));
                    })()
                )}
*/
