import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminTeachers.css';
import { Link } from 'react-router-dom';

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]); // Estado para professores filtrados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
    const [form, setForm] = useState({ name: '', email: '', senha: '' });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o popup

    // Função para buscar professores
    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:3333/teachers');
            setTeachers(response.data);
            setFilteredTeachers(response.data); // Inicializa os professores filtrados
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
        }
    };

    // Função para adicionar ou editar professores
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3333/teachers/${editingId}`, form);
            } else {
                console.log("adicionando")
                await axios.post('http://localhost:3333/teachers', form);
            }
            setIsModalOpen(false); // Fechar o popup após salvar
            setForm({ name: '', email: '', senha: '' });
            setEditingId(null);
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao salvar professor:', error);
        }
    };

    // Função para abrir o popup e carregar dados no formulário para edição
    const handleEdit = (teacher) => {
        setForm({ name: teacher.nome, email: teacher.email, senha: teacher.senha });
        setEditingId(teacher.idProfessor);
        setIsModalOpen(true); // Abrir o popup
    };

    // Função para fechar o popup
    const closeModal = () => {
        setIsModalOpen(false);
        setForm({ name: '', email: '' });
        setEditingId(null);
    };

    // Função para excluir professor
    const handleDelete = async () => {
        console.log(`ID: ${editingId}, Nome: ${form.name}, Email: ${form.email}`); // Logando os dados recebidos

        try {
            await axios.delete(`http://localhost:3333/teachers/${editingId}`,
                { data: { name: form.name, email: form.email } } // Enviando os dados necessários para a exclusão
            );
            alert('Professor excluído com sucesso!');
            closeModal(); // Fechar o popup após a exclusão
            setForm({ name: '', email: '' });
            setEditingId(null);
            setIsModalOpen(false);
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao excluir professor:', error);
        }
    };

    // Função para filtrar professores com base no termo de busca
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredTeachers(
            teachers.filter((teacher) =>
                teacher.nome.toLowerCase().includes(term)
            )
        );
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <body>
            <div className="admin-teachers-container">
                {/* Campo de busca */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1>Gerenciar Professores</h1>
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
                    />
                    <button onClick={() => setIsModalOpen(true)} onChange={{}} style={{ marginBottom: '20px' }}>Adicionar Professor</button>
                    <div style={{ overflowY: 'auto', maxHeight: '700px' }} idclass='table'>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher.idProfessor} >
                                        <td>{teacher.idProfessor}</td>
                                        <td>{teacher.nome}</td>
                                        <td>{teacher.email}</td>
                                        <td>
                                            <button onClick={() => handleEdit(teacher)}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Popup para edição */}
                    {isModalOpen && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '400px',
                                textAlign: 'center'
                            }}>
                                <h2>Editar Professor</h2>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Senha"
                                        value={form.senha}
                                        onChange={(e) => setForm({ ...form, senha: e.target.value })}
                                        required
                                    />
                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={closeModal} style={{ marginLeft: '10px' }}>Cancelar</button>
                                </form>
                                <button
                                    onClick={handleDelete}
                                    style={{
                                        marginTop: '20px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </body>
    );
};

export default AdminTeachers;
