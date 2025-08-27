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
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
                background: "#fff",
                overflow: "hidden",
                border: "none",
                display: "flex",
                flexDirection: "column",
                minHeight: 260,
            }}
        >
            {/* Header azul */}
            <div style={{
                background: "#2563eb",
                color: "#fff",
                padding: "16px 18px 10px 18px",
                borderBottom: "1px solid #e5e7eb",
                textAlign: "left"
            }}>
                <div style={{ fontWeight: 700, fontSize: 18, textAlign: "left" }}>{lab.name}</div>
                <div style={{ fontSize: 13, opacity: 0.95, textAlign: "left" }}>{lab.location}</div>
                <div style={{ fontSize: 13, marginTop: 4, opacity: 0.85, textAlign: "left" }}>
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
                        color: "#16a34a",
                        textAlign: "left"
                    }}>
                        <span style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#22c55e",
                            marginRight: 8,
                        }} />
                        Current Class
                    </div>
                    <div style={{
                        background: "#e9faef",
                        borderRadius: 8,
                        padding: "14px 16px",
                        fontSize: 14,
                        border: "1px solid #bbf7d0",
                        marginBottom: 0,
                        minHeight: 70,
                        color: "#166534",
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
                        color: "#2563eb",
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
                        Next Class
                    </div>
                    <div style={{
                        background: "#f3f8fe",
                        borderRadius: 8,
                        padding: "14px 16px",
                        fontSize: 14,
                        border: "1px solid #bfdbfe",
                        minHeight: 70,
                        color: "#1e40af",
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
