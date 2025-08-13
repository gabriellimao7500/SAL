import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Mantém o estilo consistente

// filepath: c:/Users/TI/Documents/Apps/SAL/Frontend/src/pages/AdminDashboard.jsx

const AdminDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Buscar professores
    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:3333/teachers');
            setTeachers(response.data);
            setFilteredTeachers(response.data);
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Filtrar professores
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredTeachers(
            teachers.filter((teacher) =>
                teacher.nome.toLowerCase().includes(term)
            )
        );
    };

    // Manipular arquivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploadStatus('');
    };

    // Enviar arquivo para editar agendamentos
    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Selecione um arquivo primeiro.');
            return;
        }
        try {
            // Leitura do arquivo XLSX
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Envia para backend (ajuste endpoint conforme necessário)
            await axios.post('http://localhost:3333/schedules/import', jsonData);
            setUploadStatus('Arquivo enviado e agendamentos atualizados!');
        } catch (error) {
            setUploadStatus('Erro ao enviar arquivo.');
            console.error(error);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard Administrativa</h1>
            </header>
            <div className="dashboard-summary-row">
                <div className="dashboard-summary-card">
                    <span className="summary-icon" aria-label="Professores">
                        {/* Ícone de usuário */}
                        <svg width="32" height="32" fill="#2563eb" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a7 7 0 0 1 14 0v1" /></svg>
                    </span>
                    <div>
                        <div className="summary-title">Total de Professores</div>
                        <div className="summary-value">{teachers.length}</div>
                    </div>
                </div>
                <div className="dashboard-summary-card">
                    <span className="summary-icon" aria-label="Agendamentos">
                        {/* Ícone de calendário */}
                        <svg width="32" height="32" fill="#22c55e" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4" /><path d="M3 10h18" /></svg>
                    </span>
                    <div>
                        <div className="summary-title">Agendamentos XLSX</div>
                        <div className="summary-value">—</div>
                    </div>
                </div>
                <div className="dashboard-summary-card dashboard-graph-placeholder">
                    <span className="summary-icon" aria-label="Gráfico">
                        {/* Ícone de gráfico */}
                        <svg width="32" height="32" fill="#f59e42" viewBox="0 0 24 24"><rect x="4" y="13" width="4" height="7" /><rect x="10" y="9" width="4" height="11" /><rect x="16" y="5" width="4" height="15" /></svg>
                    </span>
                    <div>
                        <div className="summary-title">Gráficos</div>
                        <div className="summary-value">Em breve</div>
                    </div>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-card upload-card">
                    <div className="card-header">
                        <span className="card-icon">
                            <svg width="24" height="24" fill="#2563eb" viewBox="0 0 24 24"><path d="M12 16V4m0 0l-4 4m4-4l4 4" /><rect x="4" y="16" width="16" height="4" rx="2" /></svg>
                        </span>
                        <h2>Editar Agendamentos via XLSX</h2>
                    </div>
                    <div className="upload-file-wrapper">
                        <input
                            type="file"
                            id="file-upload"
                            className="inputfile"
                            accept=".xlsx"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload">Escolher arquivo</label>
                        {file && <span className="selected-file-name">{file.name}</span>}
                    </div>
                    <button onClick={handleUpload}>
                        Enviar Arquivo
                    </button>
                    {uploadStatus && (
                        <div className={uploadStatus.includes('Erro') ? 'status-error' : 'status-success'}>
                            {uploadStatus}
                        </div>
                    )}
                </div>
                <div className="dashboard-card teachers-card">
                    <div className="card-header">
                        <span className="card-icon">
                            <svg width="24" height="24" fill="#22c55e" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a7 7 0 0 1 14 0v1" /></svg>
                        </span>
                        <h2>Professores</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="teachers-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.idProfessor}>
                                        <td>{teacher.idProfessor}</td>
                                        <td>{teacher.nome}</td>
                                        <td>{teacher.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;