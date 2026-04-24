import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const normalizeName = (name) =>
    name
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, ' ');

const hasFullName = (name) => {
    const parts = name.trim().split(/\s+/).filter(p => p.length >= 2);
    return parts.length >= 2;
};

const RSVP = () => {
    const [guests, setGuests] = useState(['']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const addGuest = () => {
        setGuests([...guests, '']);
    };

    const removeGuest = (index) => {
        const newGuests = guests.filter((_, i) => i !== index);
        setGuests(newGuests);
    };

    const handleNameChange = (index, value) => {
        const newGuests = [...guests];
        newGuests[index] = value;
        setGuests(newGuests);
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const trimmedGuests = guests.map(n => n.trim()).filter(n => n.length > 0);
        if (trimmedGuests.length === 0) {
            setErrorMessage('Por favor, preencha o nome dos convidados.');
            return;
        }

        const incomplete = trimmedGuests.filter(n => !hasFullName(n));
        if (incomplete.length > 0) {
            setErrorMessage(
                `Por favor, informe o nome completo (nome e sobrenome): "${incomplete[0]}".`
            );
            return;
        }

        setIsSubmitting(true);

        const { data: existing, error: fetchError } = await supabase
            .from('confirmations')
            .select('name');

        if (fetchError) {
            setIsSubmitting(false);
            console.error('Erro ao verificar confirmações:', fetchError);
            setErrorMessage('Ocorreu um erro ao verificar sua confirmação. Tente novamente.');
            return;
        }

        const existingSet = new Set((existing || []).map(e => normalizeName(e.name)));
        const duplicates = trimmedGuests.filter(n => existingSet.has(normalizeName(n)));

        if (duplicates.length > 0) {
            setIsSubmitting(false);
            const list = duplicates.join(', ');
            setErrorMessage(
                duplicates.length === 1
                    ? `${list} já confirmou presença.`
                    : `Os seguintes convidados já confirmaram presença: ${list}.`
            );
            return;
        }

        const groupId = crypto.randomUUID();
        const dataToInsert = trimmedGuests.map(name => ({
            name,
            group_id: groupId
        }));

        const { error } = await supabase
            .from('confirmations')
            .insert(dataToInsert);

        setIsSubmitting(false);

        if (error) {
            console.error('Erro ao confirmar:', error);
            setErrorMessage('Ocorreu um erro ao enviar sua confirmação. Tente novamente.');
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <section id="rsvp" className="rsvp" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <div className="container" style={{
                    backgroundColor: 'var(--white)',
                    padding: '3rem 2rem',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Presença Confirmada!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Obrigado por confirmar! Mal podemos esperar para celebrar com você.
                    </p>
                    <button
                        onClick={() => {
                            setGuests(['']);
                            setSubmitted(false);
                            setErrorMessage('');
                        }}
                        style={{ marginTop: '2rem', textDecoration: 'underline', color: 'var(--accent)', fontSize: '0.9rem' }}
                    >
                        Confirmar mais alguém
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="rsvp" className="rsvp" style={{ padding: '6rem 1.5rem' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Confirmação de Presença</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Por favor, confirme sua presença até o dia 15/05/2026.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ 
                    backgroundColor: 'var(--white)', 
                    padding: '2.5rem 2rem', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                    <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                        Nomes dos convidados:
                    </p>

                    {guests.map((name, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '1rem', alignItems: 'center' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Nome completo  "
                                    value={name}
                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.9rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                />
                            </div>
                            {guests.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeGuest(index)}
                                    style={{
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        flexShrink: 0
                                    }}
                                    title="Remover acompanhante"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addGuest}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--accent)',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            marginBottom: '2.5rem',
                            marginTop: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ 
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            border: '2px solid var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1rem'
                        }}>+</span>
                        Adicionar acompanhante / familiar
                    </button>

                    {errorMessage && (
                        <div
                            role="alert"
                            style={{
                                backgroundColor: '#fee2e2',
                                color: '#b91c1c',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                fontSize: '0.9rem'
                            }}
                        >
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary"
                        style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                        {isSubmitting ? 'Confirmando...' : 'Confirmar Presença'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default RSVP;
