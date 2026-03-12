import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { LabScheduleCard } from "../../components/LabScheduleCard";
import config from "../../../config";

const HORARIOS = {
    'Manhã': ['07:00 - 07:50', '07:50 - 08:40', '08:40 - 09:30', '09:50 - 10:40', '10:40 - 11:30', '11:30 - 12:20'],
    'Tarde': ['13:00 - 13:50', '13:50 - 14:40', '14:40 - 15:30', '15:50 - 16:40', '16:40 - 17:30', '17:30 - 18:20'],
    'Noite': ['19:00 - 21:05', '21:05 - 23:00']
};

function parseTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
}

function getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getScheduleContext(now = new Date()) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const periodos = Object.entries(HORARIOS).map(([periodo, aulas]) => ({
        periodo,
        aulas: aulas.map((range, index) => {
            const [inicio, fim] = range.split(" - ");
            return {
                index,
                range,
                inicioMinutos: parseTime(inicio),
                fimMinutos: parseTime(fim)
            };
        })
    }));

    for (const periodo of periodos) {
        const aulas = periodo.aulas;

        for (let i = 0; i < aulas.length; i++) {
            const aula = aulas[i];

            if (currentMinutes >= aula.inicioMinutos && currentMinutes < aula.fimMinutos) {
                return {
                    periodo: periodo.periodo,
                    aulaAtual: i + 1,
                    currentIndex: i,
                    previousPeriodo: periodo.periodo,
                    previousIndex: i > 0 ? i - 1 : null,
                    nextPeriodo: periodo.periodo,
                    nextIndex: i < aulas.length - 1 ? i + 1 : null,
                    isBreak: false
                };
            }

            const proximaAula = aulas[i + 1];
            if (proximaAula && currentMinutes >= aula.fimMinutos && currentMinutes < proximaAula.inicioMinutos) {
                return {
                    periodo: periodo.periodo,
                    aulaAtual: null,
                    currentIndex: null,
                    previousPeriodo: periodo.periodo,
                    previousIndex: i,
                    nextPeriodo: periodo.periodo,
                    nextIndex: i + 1,
                    isBreak: true
                };
            }
        }
    }

    for (let i = 0; i < periodos.length; i++) {
        const periodoAtual = periodos[i];
        const primeiraAula = periodoAtual.aulas[0];

        if (currentMinutes < primeiraAula.inicioMinutos) {
            const periodoAnterior = periodos[i - 1];
            const previousIndex = periodoAnterior ? periodoAnterior.aulas[periodoAnterior.aulas.length - 1].index : null;

            return {
                periodo: periodoAtual.periodo,
                aulaAtual: null,
                currentIndex: null,
                previousPeriodo: periodoAnterior ? periodoAnterior.periodo : null,
                previousIndex,
                nextPeriodo: periodoAtual.periodo,
                nextIndex: 0,
                isBreak: true
            };
        }
    }

    const ultimoPeriodo = periodos[periodos.length - 1];
    return {
        periodo: ultimoPeriodo.periodo,
        aulaAtual: null,
        currentIndex: null,
        previousPeriodo: ultimoPeriodo.periodo,
        previousIndex: ultimoPeriodo.aulas[ultimoPeriodo.aulas.length - 1].index,
        nextPeriodo: null,
        nextIndex: null,
        isBreak: true
    };
}

async function fetchAulaForLab(periodo, aulaReserva, idLaboratorio, dia) {
    if (!periodo || !aulaReserva) {
        return [{ motivo: "Sem reserva" }];
    }

    try {
        const res = await fetch(`${config.apiUrl}/marks/of/${idLaboratorio}/${aulaReserva}/${periodo}/${dia}`);
        if (!res.ok) throw new Error("Erro ao buscar aula");
        const data = await res.json();
        return data[0] == null ? [{ motivo: "Sem reserva" }] : data;
    } catch (err) {
        console.error(err);
        return [{ motivo: "Sem reserva" }];
    }
}

export default function OverviewPage() {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scheduleContext, setScheduleContext] = useState(() => getScheduleContext());

    const fetchLabs = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${config.apiUrl}/labs/all`);
            if (!res.ok) throw new Error("Erro ao buscar laboratórios");

            const data = await res.json();
            const currentContext = getScheduleContext();
            const diaAtual = getToday();

            const labsComReservas = await Promise.all(
                data.map(async (lab) => {
                    const currentReserva = currentContext.currentIndex != null
                        ? await fetchAulaForLab(currentContext.periodo, currentContext.currentIndex + 1, lab.idLaboratorio, diaAtual)
                        : [{ motivo: "Sem aula no momento" }];

                    const previousReserva = currentContext.previousIndex != null
                        ? await fetchAulaForLab(currentContext.previousPeriodo, currentContext.previousIndex + 1, lab.idLaboratorio, diaAtual)
                        : null;

                    const nextReserva = currentContext.nextIndex != null
                        ? await fetchAulaForLab(currentContext.nextPeriodo, currentContext.nextIndex + 1, lab.idLaboratorio, diaAtual)
                        : null;

                    return {
                        ...lab,
                        current: Array.isArray(currentReserva) && currentReserva[0] ? currentReserva[0] : { motivo: "Sem aula no momento" },
                        previous: Array.isArray(previousReserva) && previousReserva[0] ? previousReserva[0] : null,
                        next: Array.isArray(nextReserva) && nextReserva[0] ? nextReserva[0] : null
                    };
                })
            );

            setScheduleContext(currentContext);
            setLabs(labsComReservas);
        } catch (err) {
            setError(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabs();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchLabs();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

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
                padding: 24,
                fontFamily: "Arial, sans-serif",
                margin: "0 auto",
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
                        background: "#181818"
                    }}>
                        {tiposOrdenados.map((tipo) => (
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
                                    horarioAula={scheduleContext.currentIndex}
                                    horarios={HORARIOS[scheduleContext.periodo]}
                                    previousIndex={scheduleContext.previousIndex}
                                    nextIndex={scheduleContext.nextIndex}
                                    isBreak={scheduleContext.isBreak}
                                    previousHorarioLabel={
                                        scheduleContext.previousPeriodo && scheduleContext.previousIndex != null
                                            ? HORARIOS[scheduleContext.previousPeriodo][scheduleContext.previousIndex]
                                            : null
                                    }
                                    nextHorarioLabel={
                                        scheduleContext.nextPeriodo && scheduleContext.nextIndex != null
                                            ? HORARIOS[scheduleContext.nextPeriodo][scheduleContext.nextIndex]
                                            : null
                                    }
                                />
                            ))
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
