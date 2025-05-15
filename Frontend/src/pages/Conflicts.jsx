import { useState, useEffect } from "react";
import axios from "axios";
//import './Conflicts.css';

function Conflicts() {
    const [conflicts, setConflicts] = useState([]);

    useEffect(() => {
        const fetchConflicts = async () => {
            const result = await axios.get('/conflicts'); // Endpoint para buscar conflitos
            setConflicts(result.data);
        };
        fetchConflicts();
    }, []);

    const handleAccept = async (conflictId) => {
        await axios.post('/conflicts/accept', { id: conflictId });
        setConflicts(conflicts.filter(conflict => conflict.id !== conflictId));
    };

    const handleReject = async (conflictId) => {
        await axios.post('/conflicts/reject', { id: conflictId });
        setConflicts(conflicts.filter(conflict => conflict.id !== conflictId));
    };

    return (
        <div className="conflicts-page">
            <h1>Divergências de Horários</h1>
            {conflicts.length === 0 ? (
                <p>Não há conflitos no momento.</p>
            ) : (
                <ul>
                    {conflicts.map(conflict => (
                        <li key={conflict.id}>
                            <p>{`Conflito: ${conflict.description}`}</p>
                            <button onClick={() => handleAccept(conflict.id)}>Aceitar</button>
                            <button onClick={() => handleReject(conflict.id)}>Rejeitar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Conflicts;
