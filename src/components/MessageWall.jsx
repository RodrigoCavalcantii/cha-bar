import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const MessageWall = () => {
    const [messages, setMessages] = useState([]);
    const [newName, setNewName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    const [isLoading, setIsLoading] = useState(true);

    const [deviceId] = useState(() => {
        let id = localStorage.getItem('cha-bar-device-id');
        if (!id) {
            id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `dev-${Date.now()}`;
            localStorage.setItem('cha-bar-device-id', id);
        }
        return id;
    });

    const [likedMessageIds, setLikedMessageIds] = useState(() => {
        const saved = localStorage.getItem('cha-bar-liked-messages');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Erro ao buscar mensagens:', error);
            } else {
                setMessages(data || []);
            }
            setIsLoading(false);
        };

        fetchMessages();

        window.addEventListener('messageAdded', fetchMessages);
        return () => window.removeEventListener('messageAdded', fetchMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem('cha-bar-liked-messages', JSON.stringify(likedMessageIds));
    }, [likedMessageIds]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newName.trim() || !newMessage.trim()) return;

        const { data, error } = await supabase
            .from('messages')
            .insert([{ name: newName, text: newMessage }])
            .select();

        if (error) {
            console.error('Erro ao enviar mensagem:', error);
        } else if (data) {
            setMessages((prev) => [data[0], ...prev]);
            setNewName('');
            setNewMessage('');
        }
    };

    const handleLike = async (id) => {
        if (likedMessageIds.includes(id)) return;

        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        // Atualização otimista
        setMessages(messages.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
        setLikedMessageIds(prev => [...prev, id]);

        const { error } = await supabase.rpc('toggle_like', { 
            msg_id: id, 
            dev_id: deviceId 
        });

        if (error) {
            console.error('Erro ao curtir:', error);
            // Reverte em caso de erro
            setMessages(messages.map(m => m.id === id ? { ...m, likes: m.likes } : m));
            setLikedMessageIds(prev => prev.filter(likedId => likedId !== id));
        }
    };

    const sortedMessages = [...messages].sort((a, b) => {
        if (sortBy === 'likes') return b.likes - a.likes;
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <section id="messages" className="messages" style={{ backgroundColor: 'var(--bg-secondary)', paddingBottom: '8rem' }}>
            <div className="container">
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Mural de Recados</h2>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        backgroundColor: 'var(--white)',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        marginBottom: '3rem'
                    }}
                >
                    <div style={{ marginBottom: '1.2rem' }}>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontFamily: 'var(--font-sans)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <textarea
                            placeholder="Deixe uma mensagem carinhosa para o casal..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontFamily: 'var(--font-sans)',
                                outline: 'none',
                                resize: 'none'
                            }}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            borderRadius: '4px',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05rem'
                        }}
                    >
                        Enviar Mensagem
                    </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="serif" style={{ fontSize: '1.2rem' }}>Recados para o casal</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.4rem',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '0.8rem',
                            backgroundColor: 'white'
                        }}
                    >
                        <option value="recent">Mais recentes</option>
                        <option value="likes">Mais curtidos</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {isLoading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Carregando recados...</p>
                    ) : sortedMessages.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Seja o primeiro(a) a deixar um recado!</p>
                    ) : (
                        sortedMessages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    backgroundColor: 'var(--white)',
                                    padding: '1.5rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                }}
                            >
                                <h4 style={{ fontSize: '0.95rem', fontWeight: '500', marginBottom: '0.5rem' }}>{msg.name}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                                    "{msg.text}"
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleLike(msg.id)}
                                        disabled={likedMessageIds.includes(msg.id)}
                                        style={{
                                            fontSize: '0.8rem',
                                            color: likedMessageIds.includes(msg.id) ? 'var(--text-secondary)' : 'var(--accent)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            cursor: likedMessageIds.includes(msg.id) ? 'default' : 'pointer',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            opacity: likedMessageIds.includes(msg.id) ? 0.7 : 1
                                        }}
                                    >
                                        {likedMessageIds.includes(msg.id) ? '❤️' : '🤍'} {msg.likes}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default MessageWall;
