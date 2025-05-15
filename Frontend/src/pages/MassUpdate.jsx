import { useState } from "react";
import axios from "axios";
import config from "../../config"; // Importa o arquivo de configuração
//import './MassUpdate.css';

function MassUpdate() {
    const [sqlCode, setSqlCode] = useState("");
    const [comparisonResults, setComparisonResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSqlChange = (e) => {
        setSqlCode(e.target.value);
    };

    const handleCompare = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${config.apiUrl}/mass-update/compare`, { sql: sqlCode });
            setComparisonResults(result.data);
        } catch (error) {
            console.error("Erro ao comparar SQL:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (id) => {
        try {
            await axios.post(`${config.apiUrl}/mass-update/accept`, { id });
            setComparisonResults(comparisonResults.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao aceitar atualização:", error);
        }
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
                            <p>{`Conflito: ${result.description}`}</p>
                            <p><strong>Reserva Existente:</strong></p>
                            <p>{`Laboratório: ${result.existing.lab}`}</p>
                            <p>{`Período: ${result.existing.period}`}</p>
                            <p>{`Aula: ${result.existing.class}`}</p>
                            <p>{`Professor: ${result.existing.professor}`}</p>
                            <p>{`Descrição: ${result.existing.description}`}</p>
                            <p><strong>Nova Reserva:</strong></p>
                            <p>{`Laboratório: ${result.new.lab}`}</p>
                            <p>{`Período: ${result.new.period}`}</p>
                            <p>{`Aula: ${result.new.class}`}</p>
                            <p>{`Professor: ${result.new.professor}`}</p>
                            <p>{`Descrição: ${result.new.description}`}</p>
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
