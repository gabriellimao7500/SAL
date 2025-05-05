import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o popup

    // Função para buscar professores
    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:3333/teachers');
            setTeachers(response.data);
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
                await axios.post('http://localhost:3333/teachers', form);
            }
            setForm({ name: '', email: '' });
            setEditingId(null);
            fetchTeachers();
        } catch (error) {
            console.error('Erro ao salvar professor:', error);
        }
    };

    // Função para abrir o popup e carregar dados no formulário para edição
    const handleEdit = (teacher) => {
        setForm({ name: teacher.nome, email: teacher.email });
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

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div>
            <h1>Gerenciar Professores</h1>
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
                <button type="submit">{editingId ? 'Editar' : 'Adicionar'}</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '700px' }}>
                <table style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody >
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} >
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
    );
};

export default AdminTeachers;
