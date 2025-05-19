import { useState } from "react";
import axios from "axios";
import config from "../../config"; // Importa o arquivo de configuração
//import './MassUpdate.css';

function MassUpdate() {
    const [sqlCode, setSqlCode] = useState("");
    const [comparisonResults, setComparisonResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newRequests, setNewRequests] = useState([]);

    const handleSqlChange = (e) => {
        setSqlCode(e.target.value);
    };

    const handleCompare = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${config.apiUrl}/mass-update/compare`, { sql: sqlCode });
            setComparisonResults(result.data.conflicts);
            console.log("Resultados da comparação:", result.data.conflicts);

        } catch (error) {
            console.error("Erro ao comparar SQL:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = (conflictId) => {
        console.log("Conflito aceito:", conflictId);

        // Marca o conflito como aceito
        const updatedResults = comparisonResults.map(item =>
            item.conflictId === conflictId ? { ...item, accepted: true } : item
        );
        setComparisonResults(updatedResults);
    };

    const handleReject = (conflictId) => {
        console.log("Conflito rejeitado:", conflictId);
        // Marca o conflito como rejeitado
        const updatedResults = comparisonResults.map(item =>
            item.conflictId === conflictId ? { ...item, accepted: false } : item
        );
        setComparisonResults(updatedResults);
    };

    const handleResolve = async () => {
        console.log("Resolvendo conflitos:", comparisonResults);

        const resolution = comparisonResults.map(result => ({
            action: result.accepted ? "acceptNew" : "reject", // Envia apenas os aceitos
            oldReservation: result.existingRes,
            newReservation: result.newRes
        }));

        try {
            const response = await axios.post(`${config.apiUrl}/mass-update/resolve`, { resolution });
            console.log("Conflitos resolvidos com sucesso:", response.data);
            setComparisonResults([]); // Limpa os resultados após resolver os conflitos
        } catch (error) {
            console.error("Erro ao resolver conflitos:", error);
        }
    };

    return (
        <div className="mass-update-page">
            <h1>Atualizar Tabela em Massa</h1>
            <textarea
                value={sqlCode}
                onChange={handleSqlChange}
                placeholder="Insira o código SQL aqui..."
            />
            <button onClick={handleCompare} disabled={loading}>
                {loading ? "Comparando..." : "Comparar"}
            </button>
            {comparisonResults.length > 0 && (
                <ul>
                    {comparisonResults.map(result => (
                        <li key={result.conflictId}>
                            <p>{`Conflito de Horários`}</p>
                            <p><strong>Reserva Existente:</strong></p>
                            <p>{`Laboratório: ${result.existingRes.idLaboratorio}`}</p>
                            <p>{`Data: ${result.existingRes.dataReserva}`}</p>
                            <p>{`Período: ${result.existingRes.periodo}`}</p>
                            <p>{`Aula: ${result.existingRes.aulaReserva}`}</p>
                            <p>{`Professor: ${result.existingRes.idProfessor}`}</p>
                            <p>{`Descrição: ${result.existingRes.motivo}`}</p>
                            <p><strong>Nova Reserva:</strong></p>
                            <p>{`Laboratório: ${result.newRes.idLaboratorio}`}</p>
                            <p>{`Data: ${result.existingRes.dataReserva}`}</p>
                            <p>{`Período: ${result.newRes.periodo}`}</p>
                            <p>{`Aula: ${result.newRes.aulaReserva}`}</p>
                            <p>{`Professor: ${result.newRes.idProfessor}`}</p>
                            <p>{`Descrição: ${result.newRes.motivo}`}</p>
                            <button onClick={() => handleAccept(result.conflictId)}>Aceitar</button>
                            <button onClick={() => handleReject(result.conflictId)}>Rejeitar</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleResolve} disabled={comparisonResults.length === 0}>
                Resolver Conflitos
            </button>
        </div>
    );
}

export default MassUpdate;
