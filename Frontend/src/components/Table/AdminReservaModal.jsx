import React from 'react';

const AdminReservaModal = ({ open, campos, editando, onChange, onClose, onSubmit }) => {
    if (!open) return null;
    return (
        <div className="modal-fade-in modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }} onClick={onClose}>
            <div className="modal-card" style={{ backgroundColor: '#232323', color: '#fff', padding: '32px 28px', borderRadius: '14px', width: '400px', textAlign: 'center', boxShadow: '0 8px 32px rgba(139,92,246,0.18)', border: '1px solid #333', animation: 'fadeInUp 0.5s cubic-bezier(.77,.2,.32,1)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: '#8b5cf6', fontSize: '1.5rem', cursor: 'pointer', transition: 'color 0.2s', zIndex: 2 }} aria-label="Fechar">&#10006;</button>
                <h2 style={{ color: '#8b5cf6', marginBottom: '18px' }}>{editando ? 'Editar Agendamento' : 'Criar Agendamento'}</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Professor"
                        value={campos.professor}
                        onChange={e => onChange({ ...campos, professor: e.target.value })}
                        required
                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                    />
                    <input
                        type="text"
                        placeholder="Disciplina"
                        value={campos.disciplina}
                        onChange={e => onChange({ ...campos, disciplina: e.target.value })}
                        required
                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                    />
                    <input
                        type="text"
                        placeholder="Observação"
                        value={campos.observacao}
                        onChange={e => onChange({ ...campos, observacao: e.target.value })}
                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                    />
                    <input
                        type="date"
                        placeholder="Data Início"
                        value={campos.dataInicio}
                        onChange={e => onChange({ ...campos, dataInicio: e.target.value })}
                        required
                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                    />
                    <input
                        type="date"
                        placeholder="Data Fim"
                        value={campos.dataFim}
                        onChange={e => onChange({ ...campos, dataFim: e.target.value })}
                        required
                        style={{ marginBottom: '12px', padding: '10px', width: '90%', borderRadius: '6px', border: '1px solid #8b5cf6', background: '#181818', color: '#fff' }}
                    />
                    <button type="submit" style={{ background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 22px', fontWeight: '600', marginRight: '10px', cursor: 'pointer', transition: 'background 0.2s' }}>{editando ? 'Salvar' : 'Criar'}</button>
                    <button type="button" onClick={onClose} style={{ background: '#232323', color: '#fff', border: '1px solid #8b5cf6', borderRadius: '6px', padding: '10px 22px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminReservaModal;
