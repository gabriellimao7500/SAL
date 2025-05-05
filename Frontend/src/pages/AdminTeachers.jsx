import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editingId, setEditingId] = useState(null);

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

    // Função para carregar dados no formulário para edição
    const handleEdit = (teacher) => {
        setForm({ nome: teacher.nome, email: teacher.email });
        setEditingId(teacher.id);
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
                    value={form.nome}
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
        </div>
    );
};

export default AdminTeachers;
