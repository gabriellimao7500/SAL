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

    // Modal edição professor
    const [form, setForm] = useState({ name: '', email: '', senha: '' });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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


    // Abrir modal para editar professor
    const handleEdit = (teacher) => {
        setForm({ name: teacher.nome, email: teacher.email, senha: teacher.senha || '' });
        setEditingId(teacher.idProfessor);
        setIsModalOpen(true);
    };

    // Abrir modal para adicionar professor
    const handleAdd = () => {
        setForm({ name: '', email: '', senha: '' });
        setEditingId(null);
        setIsModalOpen(true);
    };

    // Fechar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setForm({ name: '', email: '', senha: '' });
        setEditingId(null);
    };

    // Salvar edição
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3333/teachers/${editingId}`, form);
            setIsModalOpen(false);
            setForm({ name: '', email: '', senha: '' });
            setEditingId(null);
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao salvar professor:', error);
        }
    };

    // Excluir professor
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3333/teachers/${editingId}`, {
                data: { name: form.name, email: form.email }
            });
            closeModal();
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao excluir professor:', error);
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
                    <div className="card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="card-icon">
                                <svg width="24" height="24" fill="#22c55e" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20v-1a7 7 0 0 1 14 0v1" /></svg>
                            </span>
                            <h2>Professores</h2>
                        </div>
                        <button
                            onClick={handleAdd}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '6px',
                                borderRadius: '50%',
                                transition: 'background 0.2s'
                            }}
                            title="Adicionar Professor"
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#8b5cf6">
                                <circle cx="12" cy="12" r="11" fill="#181818" stroke="#8b5cf6" strokeWidth="2" />
                                <path d="M12 8v8M8 12h8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className="teachers-table-wrapper">
                        <table className="teachers-table-no-border">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr
                                        key={teacher.idProfessor}
                                        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                        onClick={() => handleEdit(teacher)}
                                        className="teacher-row"
                                    >
                                        <td>{teacher.idProfessor}</td>
                                        <td style={{ color: '#e5e5e5', fontWeight: 500 }}>{teacher.nome}</td>
                                        <td>{teacher.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de edição/adicionar professor */}
            {isModalOpen && (
                <div
                    className={"modal-fade-in modal-overlay"}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        transition: 'opacity 0.4s'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="modal-card"
                        style={{
                            backgroundColor: '#232323',
                            color: '#fff',
                            padding: '32px 28px',
                            borderRadius: '14px',
                            width: '400px',
                            textAlign: 'center',
                            boxShadow: '0 8px 32px rgba(139,92,246,0.18)',
                            border: '1px solid #333',
                            animation: 'fadeInUp 0.5s cubic-bezier(.77,.2,.32,1)',
                            position: 'relative'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'transparent',
                                border: 'none',
                                color: '#8b5cf6',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                zIndex: 2
                            }}
                            aria-label="Fechar"
                        >
                            &#10006;
                        </button>
                        <h2 style={{ color: '#8b5cf6', marginBottom: '18px' }}>{editingId ? 'Editar Professor' : 'Adicionar Professor'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                style={{
                                    marginBottom: '12px',
                                    padding: '10px',
                                    width: '90%',
                                    borderRadius: '6px',
                                    border: '1px solid #8b5cf6',
                                    background: '#181818',
                                    color: '#fff'
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                style={{
                                    marginBottom: '12px',
                                    padding: '10px',
                                    width: '90%',
                                    borderRadius: '6px',
                                    border: '1px solid #8b5cf6',
                                    background: '#181818',
                                    color: '#fff'
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Senha"
                                value={form.senha}
                                onChange={(e) => setForm({ ...form, senha: e.target.value })}
                                required
                                style={{
                                    marginBottom: '12px',
                                    padding: '10px',
                                    width: '90%',
                                    borderRadius: '6px',
                                    border: '1px solid #8b5cf6',
                                    background: '#181818',
                                    color: '#fff'
                                }}
                            />
                            <button type="submit" style={{
                                background: '#8b5cf6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '10px 22px',
                                fontWeight: '600',
                                marginRight: '10px',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>{editingId ? 'Salvar' : 'Adicionar'}</button>
                            <button type="button" onClick={closeModal} style={{
                                background: '#232323',
                                color: '#fff',
                                border: '1px solid #8b5cf6',
                                borderRadius: '6px',
                                padding: '10px 22px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>Cancelar</button>
                        </form>
                        {editingId && (
                            <button
                                onClick={handleDelete}
                                style={{
                                    marginTop: '20px',
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Excluir
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;