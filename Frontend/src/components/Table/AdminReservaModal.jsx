import React from 'react';

const AdminReservaModal = ({ open, campos, editando, onChange, onClose, onSubmit, diaSemana, onSuccess, onDelete }) => {
    if (!open) return null;

    campos.diaDaSemana = diaSemana; // Segunda, terça, quarta, quinta, sexta de acordo com a célula selecionada

    // Função para garantir que a diferença entre dataInicio e dataFim seja de pelo menos 7 dias
    const isIntervalValid = () => {
        if (!campos.dataInicio || !campos.dataFim) return true;
        const inicio = new Date(campos.dataInicio);
        const fim = new Date(campos.dataFim);
        const diff = (fim - inicio) / (1000 * 60 * 60 * 24); // diferença em dias
        return diff >= 7;
    };

    // Função para lidar com o envio do formulário e atualizar o calendário após o sucesso
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onSubmit(e);
            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess();
            }
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
    };



    return (
        <div
            className="modal-fade-in modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(34,34,34,0.95) 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
        >
            <div
                className="modal-card"
                style={{
                    background: 'linear-gradient(120deg, #232323 80%, #8b5cf6 120%)',
                    color: '#fff',
                    padding: '40px 32px',
                    borderRadius: '18px',
                    width: '420px',
                    textAlign: 'center',
                    boxShadow: '0 12px 40px rgba(139,92,246,0.22)',
                    border: '1px solid #8b5cf6',
                    animation: 'fadeInUp 0.5s cubic-bezier(.77,.2,.32,1)',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        background: 'rgba(139,92,246,0.12)',
                        border: 'none',
                        color: '#8b5cf6',
                        fontSize: '1.7rem',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s, color 0.2s',
                        zIndex: 2
                    }}
                    aria-label="Fechar"
                >
                    &#10006;
                </button>
                <h2
                    style={{
                        color: '#8b5cf6',
                        marginBottom: '22px',
                        fontWeight: 700,
                        fontSize: '1.35rem',
                        letterSpacing: '0.5px'
                    }}
                >
                    {editando ? 'Editar Agendamento' : 'Criar Agendamento'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Professor"
                        value={campos.professor}
                        onChange={e => onChange({ ...campos, professor: e.target.value })}
                        required
                        style={{
                            marginBottom: '14px',
                            padding: '12px',
                            width: '92%',
                            borderRadius: '8px',
                            border: '1.5px solid #8b5cf6',
                            background: '#181818',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(139,92,246,0.08)'
                        }}
                    />
                    <textarea
                        placeholder="Motivo"
                        value={campos.motivo}
                        onChange={e => onChange({ ...campos, motivo: e.target.value })}
                        rows={4}
                        style={{
                            marginBottom: '14px',
                            padding: '12px',
                            width: '92%',
                            minHeight: '110px',
                            borderRadius: '8px',
                            border: '1.5px solid #8b5cf6',
                            background: '#181818',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(139,92,246,0.08)',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', justifyContent: 'center' }}>
                        <input
                            type="date"
                            value={campos.dataInicio}
                            onChange={e => onChange({ ...campos, dataInicio: e.target.value })}
                            required
                            style={{
                                padding: '12px',
                                width: '48%',
                                borderRadius: '8px',
                                border: '1.5px solid #8b5cf6',
                                background: '#181818',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none',
                                boxShadow: '0 2px 8px rgba(139,92,246,0.08)',
                                appearance: 'none', // Remove ícone de calendário
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield'
                            }}
                        />
                        <input
                            type="date"
                            value={campos.dataFim}
                            onChange={e => onChange({ ...campos, dataFim: e.target.value })}
                            required
                            style={{
                                padding: '12px',
                                width: '48%',
                                borderRadius: '8px',
                                border: '1.5px solid #8b5cf6',
                                background: '#181818',
                                color: '#fff',
                                fontSize: '1rem',
                                outline: 'none',
                                boxShadow: '0 2px 8px rgba(139,92,246,0.08)',
                                appearance: 'none', // Remove ícone de calendário
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield'
                            }}
                        />
                    </div>
                    {!isIntervalValid() && (
                        <div style={{ color: '#ef4444', marginBottom: '12px', fontWeight: 500 }}>
                            O intervalo entre as datas deve ser de pelo menos 7 dias.
                        </div>
                    )}
                    <p
                        style={{
                            color: '#b3b3b3',
                            fontSize: '0.98rem',
                            margin: '18px 0 22px 0'
                        }}
                    >
                        Criar Agendamento para todas as <span style={{ color: '#8b5cf6', fontWeight: 600 }}>
                            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'][diaSemana - 1]}s</span> da Semana até <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{campos.dataFim.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1')}</span>
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: 12 }}>
                        <button
                            type="submit"
                            disabled={!isIntervalValid()}
                            style={{
                                background: !isIntervalValid()
                                    ? '#232323'
                                    : 'linear-gradient(90deg, #8b5cf6 60%, #6d28d9 100%)',
                                color: '#fff',
                                border: '1.5px solid #8b5cf6',
                                borderRadius: '8px',
                                padding: '12px 26px',
                                fontWeight: '700',
                                cursor: !isIntervalValid() ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 2px 8px rgba(139,92,246,0.12)',
                                transition: 'background 0.2s'
                            }}
                        >
                            {editando ? 'Salvar' : 'Criar'}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                onClick={onDelete}
                                style={{
                                    background: '#ef4444',
                                    color: '#fff',
                                    border: '1.5px solid rgba(239,68,68,0.9)',
                                    borderRadius: '8px',
                                    padding: '12px 16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    boxShadow: '0 2px 8px rgba(239,68,68,0.12)',
                                    transition: 'background 0.2s'
                                }}
                            >
                                Apagar
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                background: '#232323',
                                color: '#fff',
                                border: '1.5px solid #8b5cf6',
                                borderRadius: '8px',
                                padding: '12px 26px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 2px 8px rgba(139,92,246,0.08)',
                                transition: 'background 0.2s'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminReservaModal;
