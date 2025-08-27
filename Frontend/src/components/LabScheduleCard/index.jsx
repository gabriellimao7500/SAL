import React from "react";

/**
 * Card de exibição do status do laboratório.
 *
 * @component
 * @param {Object} props
 * @param {{ id: string, name: string, location: string }} props.lab - Dados do laboratório.
 * @param {React.ReactNode} props.currentContent - Conteúdo da seção "Aula Atual".
 * @param {React.ReactNode} props.nextContent - Conteúdo da seção "Próxima Aula".
 * @returns {JSX.Element}
 */
export function LabScheduleCard({ lab, currentContent, nextContent }) {
    //console.log(lab.reservas);

    return (
        <div
            style={{
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(2,6,23,0.7)",
                backgroundColor: "#0b1220",
                width: "15vw",
                border: "none",
                display: "flex",
                flexDirection: "column",

                color: "#e6eef8",
            }}
        >
            {/* Header azul (tema escuro) */}
            <div style={{
                background: "#0f1724",
                color: "#fff",
                padding: "16px 18px 10px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                textAlign: "left"
            }}>
                <div style={{ fontWeight: 700, fontSize: 18, textAlign: "left", color: "#fff" }}>{lab.name}</div>
                <div style={{ fontSize: 13, opacity: 0.9, textAlign: "left", color: "#9ca3af" }}>{lab.location}</div>
                <div style={{ fontSize: 13, marginTop: 4, opacity: 0.85, textAlign: "left", color: "#cbd5e1" }}>
                    Current time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>
            {/* Conteúdo */}
            <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Aula Atual */}
                <div>
                    <div style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        color: "#86efac",
                        textAlign: "left"
                    }}>
                        <span style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#34d399",
                            boxShadow: "0 0 8px rgba(52,211,153,0.12)",
                            marginRight: 8,
                        }} />
                        Aula Atual
                    </div>
                    <div style={{
                        background: "#062a1f",
                        borderRadius: 8,
                        padding: "14px 16px",
                        fontSize: 14,
                        border: "1px solid #064e3b",
                        marginBottom: 0,
                        minHeight: 70,
                        color: "#d1fae5",
                        boxSizing: "border-box",
                        textAlign: "left"
                    }}>
                        {currentContent}
                    </div>
                </div>
                {/* Próxima Aula */}
                <div>
                    <div style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        color: "#93c5fd",
                        textAlign: "left"
                    }}>
                        <span style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#2563eb",
                            marginRight: 8,
                        }} />
                        Próxima Aula
                    </div>
                    <div style={{
                        background: "#071226",
                        borderRadius: 8,
                        padding: "14px 16px",
                        fontSize: 14,
                        border: "1px solid #1f2937",
                        minHeight: 70,
                        color: "#cbd5e1",
                        boxSizing: "border-box",
                        textAlign: "left"
                    }}>
                        {nextContent}
                    </div>
                </div>
            </div>
        </div>
    );
}
