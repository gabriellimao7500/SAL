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

    const handleAccept = async (id) => {
        // Remove o conflito aceito da lista
        const updatedResults = comparisonResults.filter(item => item.id !== id);
        setComparisonResults(updatedResults);

    };

    const handleReject = async (id) => {
        try {
            await axios.post(`${config.apiUrl}/mass-update/reject`, { id });
            setComparisonResults(comparisonResults.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao rejeitar atualização:", error);
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
                        <li key={result.id}>
                            <p>{`Conflito de Horários`}</p>
                            <p><strong>Reserva Existente:</strong></p>
                            <p>{`Laboratório: ${result.existingRes.idLaboratorio}`}</p>
                            <p>{`Período: ${result.existingRes.period}`}</p>
                            <p>{`Aula: ${result.existingRes.class}`}</p>
                            <p>{`Professor: ${result.existingRes.idProfessor}`}</p>
                            <p>{`Descrição: ${result.existingRes.motivo}`}</p>
                            <p><strong>Nova Reserva:</strong></p>
                            <p>{`Laboratório: ${result.newRes.idLaboratorio}`}</p>
                            <p>{`Período: ${result.newRes.period}`}</p>
                            <p>{`Aula: ${result.newRes.class}`}</p>
                            <p>{`Professor: ${result.newRes.idProfessor}`}</p>
                            <p>{`Descrição: ${result.newRes.motivo}`}</p>
                            <button onClick={() => handleAccept(result.id)}>Aceitar</button>
                            <button onClick={() => handleReject(result.id)}>Rejeitar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MassUpdate;
