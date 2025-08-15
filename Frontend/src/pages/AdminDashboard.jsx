import React, { useState, useEffect } from 'react';
import Table from '../components/Table/Table';
import Select from '../components/Select/Select';
import axios from 'axios';
import './AdminDashboard.css'; // Mantém o estilo consistente

const AdminDashboard = () => {
    // Modal de definição de agendamento recorrente
    const [isRecorrenteModalOpen, setIsRecorrenteModalOpen] = useState(false);
    const [recorrenteAction, setRecorrenteAction] = useState(''); // 'criar', 'editar', 'cancelar'
    const [recorrenteCampos, setRecorrenteCampos] = useState({
        professor: '',
        disciplina: '',
        observacao: '',
    });
    // Função para abrir modal recorrente
    const abrirRecorrenteModal = (action) => {
        setRecorrenteAction(action);
        // Se for edição, preencher campos com dados do agendamento selecionado
        if (action === 'editar' && horariosSelecionados.length > 0 && reservas.length > 0) {
            // Exemplo: pega o primeiro agendamento selecionado
            const agendamento = reservas.find(r => r.id === horariosSelecionados[0]);
            setRecorrenteCampos({
                professor: agendamento?.professor || '',
                disciplina: agendamento?.disciplina || '',
                observacao: agendamento?.observacao || '',
            });
        } else {
            setRecorrenteCampos({ professor: '', disciplina: '', observacao: '' });
        }
        setIsRecorrenteModalOpen(true);
    };
    // Função para fechar modal recorrente
    const fecharRecorrenteModal = () => {
        setIsRecorrenteModalOpen(false);
        setRecorrenteCampos({ professor: '', disciplina: '', observacao: '' });
        setRecorrenteAction('');
    };
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Modal edição professor
    const [form, setForm] = useState({ name: '', email: '', senha: '' });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal calendário/agendamentos
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [horariosSelecionados, setHorariosSelecionados] = useState([]);
    const [serieMode, setSerieMode] = useState(false);
    // Estados para dropdowns
    const [periodo, setPeriodo] = useState(localStorage.getItem('periodo') || 'Manhã');
    const [numLab, setNumLab] = useState(localStorage.getItem('numLab') || 1);
    const [typeLab, setTypeLab] = useState(localStorage.getItem('typeLab') || 'Informática');
    const [loadingMarks, setLoadingMarks] = useState(false);
    // Função para buscar agendamentos (pode ser adaptada para o backend real)
    const pullMarks = async (periodoArg, tipoLabArg, numLabArg) => {
        setLoadingMarks(true);
        const p = periodoArg || periodo;
        const t = tipoLabArg || typeLab;
        const n = numLabArg || numLab;
        localStorage.setItem('periodo', p);
        localStorage.setItem('typeLab', t);
        localStorage.setItem('numLab', n);
        setPeriodo(p);
        setTypeLab(t);
        setNumLab(n);
        try {
            const result = await axios.post('http://192.168.1.210:3333/Marks',
                JSON.stringify({
                    "periodo": p,
                    "tipoLaboratorio": t,
                    "numeroLaboratorio": n
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setReservas(result.data);
        } catch (err) {
            setReservas([]);
        } finally {
            setTimeout(() => setLoadingMarks(false), 1000); // Delay de 1 segundo
        }
    };
    // Abrir calendário
    const handleOpenCalendar = async () => {
        setIsCalendarOpen(true);
        setTypeLab("Informática");
        await fetchLabsTipo("Informática");
    };
    // Fechar calendário
    const handleCloseCalendar = () => {
        setIsCalendarOpen(false);
        setSerieMode(false);
        setHorariosSelecionados([]);
    };

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

    // Função para buscar labs
    const [labs, setLabs] = useState([]);
    const [labsTipo, setLabsTipo] = useState([]); // Laboratórios filtrados por tipo
    const [loadingLabs, setLoadingLabs] = useState(false);
    const [labsError, setLabsError] = useState('');
    const fetchLabs = async () => {
        setLoadingLabs(true);
        setLabsError('');
        try {
            const response = await axios.get('http://192.168.1.210:3333/labs');
            setLabs(response.data);
            if (!response.data || response.data.length === 0) {
                setLabsError('Nenhum laboratório encontrado.');
            }
        } catch (error) {
            setLabs([]);
            setLabsError('Erro ao buscar laboratórios.');
        } finally {
            setLoadingLabs(false);
        }
    };

    // Buscar labs por tipo
    const fetchLabsTipo = async (tipoLab) => {
        try {
            const response = await axios.get(`http://192.168.1.210:3333/labsType/${tipoLab}`);
            setLabsTipo(response.data);
            // Se existir, atualiza o número do laboratório para o primeiro disponível
            if (response.data.length > 0) {
                setNumLab(response.data[0].numeroLaboratorio);
                pullMarks(periodo, tipoLab, response.data[0].numeroLaboratorio);
            }
        } catch (error) {
            setLabsTipo([]);
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
        fetchLabs();
        pullMarks();
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
            setUploadStatus(['Selecione um arquivo primeiro.']);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3333/schedules/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Usa os passos do backend
            if (response.data.steps) {
                setUploadStatus(response.data.steps);
            } else if (response.data.message) {
                setUploadStatus([response.data.message]);
            } else {
                setUploadStatus(['Arquivo enviado com sucesso!']);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.steps) {
                setUploadStatus(error.response.data.steps);
            } else if (error.response && error.response.data && error.response.data.error) {
                setUploadStatus([error.response.data.error]);
            } else {
                setUploadStatus(['Erro ao enviar arquivo.']);
            }
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
                <div className="dashboard-summary-card" style={{ cursor: 'pointer' }} onClick={handleOpenCalendar}>
                    <span className="summary-icon" aria-label="Agendamentos">
                        {/* Ícone de calendário */}
                        <svg width="32" height="32" fill="#22c55e" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4" /><path d="M3 10h18" /></svg>
                    </span>
                    <div>
                        <div className="summary-title">Agendamentos XLSX</div>
                        <div className="summary-value">Alterar</div>
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
                    {uploadStatus && Array.isArray(uploadStatus) && (
                        <div className={uploadStatus.some(s => s.includes('Erro')) ? 'status-error' : 'status-success'}>
                            <ol style={{ background: 'none', paddingLeft: '1.2em', margin: 0 }}>
                                {uploadStatus.map((line, idx) => (
                                    <li key={idx} style={{ marginBottom: '4px', wordBreak: 'break-word' }}>
                                        {line}
                                    </li>
                                ))}
                            </ol>
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
            {/* Modal do calendário/agendamentos */}
            {isCalendarOpen && (
                <div className="modal-fade-in modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }} onClick={handleCloseCalendar}>
                    <div className="modal-card" style={{ backgroundColor: '#232323', color: '#fff', padding: '32px 28px', borderRadius: '14px', width: '90vw', maxWidth: '1200px', textAlign: 'center', boxShadow: '0 8px 32px rgba(139,92,246,0.18)', border: '1px solid #333', animation: 'fadeInUp 0.5s cubic-bezier(.77,.2,.32,1)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={handleCloseCalendar} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: '#8b5cf6', fontSize: '1.5rem', cursor: 'pointer', transition: 'color 0.2s', zIndex: 2 }} aria-label="Fechar">&#10006;</button>
                        <h2 style={{ color: '#8b5cf6', marginBottom: '18px' }}>Calendário de Agendamentos</h2>
                        <div className="select_main" style={{ display: 'flex', gap: '32px', height: '5vh', width: '100%', justifyContent: 'center', margin: '18px 0', alignSelf: 'center' }}>
                            <button onClick={() => setSerieMode(!serieMode)} style={{ background: serieMode ? '#8b5cf6' : '#232323', color: '#fff', border: '1px solid #8b5cf6', borderRadius: '6px', padding: '8px 18px', fontWeight: '600', cursor: 'pointer', marginRight: '10px' }}>Agendamento Recorrente</button>
                            {/* Campos para selecionar data início e fim do recorrente */}
                            {serieMode && (
                                <>
                                    <input
                                        type="date"
                                        value={window.recorrenteDataInicio || ''}
                                        onChange={e => window.recorrenteDataInicio = e.target.value}
                                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff', marginRight: '10px' }}
                                        min={new Date().toISOString().split('T')[0]}
                                        placeholder="Data início"
                                    />
                                    <input
                                        type="date"
                                        value={window.recorrenteDataFinal || ''}
                                        onChange={e => window.recorrenteDataFinal = e.target.value}
                                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ef4444', background: '#181818', color: '#fff', marginRight: '10px' }}
                                        min={window.recorrenteDataInicio || new Date().toISOString().split('T')[0]}
                                        placeholder="Data fim"
                                    />
                                </>
                            )}
                            {/* Botões para ações recorrentes */}
                            {serieMode && (
                                <>
                                    <button
                                        onClick={() => {
                                            if (!window.recorrenteDataInicio || !window.recorrenteDataFinal) {
                                                alert('Selecione as datas de início e fim para o cancelamento recorrente.');
                                                return;
                                            }
                                            abrirRecorrenteModal('cancelar');
                                        }}
                                        style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', fontWeight: '600', cursor: 'pointer', marginRight: '8px' }}
                                    >
                                        Cancelar Recorrente
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!window.recorrenteDataInicio || !window.recorrenteDataFinal) {
                                                alert('Selecione as datas de início e fim para editar recorrente.');
                                                return;
                                            }
                                            abrirRecorrenteModal('editar');
                                        }}
                                        style={{ background: '#f59e42', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', fontWeight: '600', cursor: 'pointer', marginRight: '8px' }}
                                    >
                                        Editar Recorrente
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!window.recorrenteDataInicio || !window.recorrenteDataFinal) {
                                                alert('Selecione as datas de início e fim para criar recorrente.');
                                                return;
                                            }
                                            abrirRecorrenteModal('criar');
                                        }}
                                        style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 18px', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Criar Recorrente
                                    </button>
                                    {/* Modal de definição de agendamento recorrente */}
                                    {isRecorrenteModalOpen && (
                                        <div className="modal-fade-in modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }} onClick={fecharRecorrenteModal}>
                                            <div className="modal-card" style={{ backgroundColor: '#232323', color: '#fff', padding: '32px 28px', borderRadius: '14px', width: '400px', textAlign: 'center', boxShadow: '0 8px 32px rgba(139,92,246,0.18)', border: '1px solid #333', animation: 'fadeInUp 0.5s cubic-bezier(.77,.2,.32,1)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                                                <button onClick={fecharRecorrenteModal} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: '#8b5cf6', fontSize: '1.5rem', cursor: 'pointer', transition: 'color 0.2s', zIndex: 2 }} aria-label="Fechar">&#10006;</button>
                                                <h2 style={{ color: '#8b5cf6', marginBottom: '18px' }}>
                                                    {recorrenteAction === 'criar' && 'Criar Agendamento Recorrente'}
                                                    {recorrenteAction === 'editar' && 'Editar Agendamento Recorrente'}
                                                    {recorrenteAction === 'cancelar' && 'Cancelar Agendamento Recorrente'}
                                                </h2>
                                                <form onSubmit={e => { e.preventDefault(); fecharRecorrenteModal(); }}>
                                                    <input
                                                        type="text"
                                                        placeholder="Professor"
                                                        value={recorrenteCampos.professor}
                                                        onChange={e => setRecorrenteCampos({ ...recorrenteCampos, professor: e.target.value })}
                                                        required={recorrenteAction !== 'cancelar'}
                                                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                                                        disabled={recorrenteAction === 'cancelar'}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Disciplina"
                                                        value={recorrenteCampos.disciplina}
                                                        onChange={e => setRecorrenteCampos({ ...recorrenteCampos, disciplina: e.target.value })}
                                                        required={recorrenteAction !== 'cancelar'}
                                                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                                                        disabled={recorrenteAction === 'cancelar'}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Observação"
                                                        value={recorrenteCampos.observacao}
                                                        onChange={e => setRecorrenteCampos({ ...recorrenteCampos, observacao: e.target.value })}
                                                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                                                        disabled={recorrenteAction === 'cancelar'}
                                                    />
                                                    <button type="submit" style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 22px', fontWeight: '600', marginRight: '10px', cursor: 'pointer', transition: 'background 0.2s' }}>
                                                        {recorrenteAction === 'criar' && 'Criar'}
                                                        {recorrenteAction === 'editar' && 'Salvar'}
                                                        {recorrenteAction === 'cancelar' && 'Confirmar Cancelamento'}
                                                    </button>
                                                    <button type="button" onClick={fecharRecorrenteModal} style={{ background: '#232323', color: '#fff', border: '1px solid #8b5cf6', borderRadius: '6px', padding: '10px 22px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>Cancelar</button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <select
                                value={numLab}
                                onChange={e => {
                                    const value = Number(e.target.value); // Converte para número
                                    setNumLab(value);
                                    pullMarks(periodo, typeLab, value);
                                }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                            >
                                {labsTipo.length > 0
                                    ? labsTipo.map(lab => (
                                        <option key={lab.idLab} value={lab.numeroLaboratorio}>
                                            Nº {lab.numeroLaboratorio}
                                        </option>
                                    ))
                                    : labs.filter(lab => lab.tipoLaboratorio === typeLab).map(lab => (
                                        <option key={lab.idLab} value={lab.numeroLaboratorio}>
                                            Nº {lab.numeroLaboratorio}
                                        </option>
                                    ))
                                }
                            </select>

                            <select
                                value={typeLab}
                                onChange={async e => {
                                    const tipo = e.target.value;
                                    setTypeLab(tipo);
                                    await fetchLabsTipo(tipo);
                                }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                            >
                                {/* Preenche com tipos únicos */}
                                {[...new Set(labs.map(lab => lab.tipoLaboratorio))].map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                            <select
                                value={periodo}
                                onChange={e => {
                                    setPeriodo(e.target.value);
                                    pullMarks(e.target.value, typeLab, numLab);
                                }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                            >
                                <option value="Manhã">Manhã</option>
                                <option value="Tarde">Tarde</option>
                                <option value="Noite">Noite</option>
                            </select>
                        </div>



                        {/* Table Calendar */}
                        <div style={{ position: 'relative', height: '50vh' }}>
                            {/* Loader sobreposto */}
                            {loadingMarks && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'rgba(35,35,35,0.85)',
                                    zIndex: 2,
                                    transition: 'opacity 0.4s',
                                    opacity: loadingMarks ? 1 : 0,
                                    pointerEvents: 'all',
                                    height: '100%'
                                }}>
                                    <svg width="48" height="48" viewBox="0 0 50 50">
                                        <circle cx="25" cy="25" r="20" fill="none" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round">
                                            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                </div>
                            )}
                            {/* Calendário sempre renderizado, mas invisível durante loading */}
                            <div
                                style={{
                                    opacity: loadingMarks ? 0 : 1,
                                    transition: 'opacity 0.4s',
                                    pointerEvents: loadingMarks ? 'none' : 'auto',
                                    height: '100%'
                                }}
                            >
                                <Table
                                    reserva={reservas}
                                    pullMarks={pullMarks}
                                    serieMode={serieMode}
                                    horariosSelecionados={horariosSelecionados}
                                    setHorariosSelecionados={setHorariosSelecionados}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;