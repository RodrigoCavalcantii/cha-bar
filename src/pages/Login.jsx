import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AUTH_KEY = 'cha-bar-admin';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!username.trim() || !password) {
            setErrorMessage('Preencha usuário e senha.');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.rpc('login', {
            p_username: username.trim(),
            p_password: password
        });

        setLoading(false);

        if (error) {
            console.error('Erro no login:', error);
            setErrorMessage('Erro ao tentar entrar. Tente novamente.');
            return;
        }

        if (!data?.ok) {
            setErrorMessage('Usuário ou senha inválidos.');
            return;
        }

        localStorage.setItem(AUTH_KEY, JSON.stringify({
            token: data.token,
            username: data.username,
            userId: data.user_id,
            loggedAt: new Date().toISOString()
        }));

        navigate('/dashboard');
    };

    return (
        <section style={{
            minHeight: '100dvh',
            padding: '2rem 1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                backgroundColor: 'var(--white)',
                padding: '2.5rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                        Painel dos Noivos
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Acesso privado.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    {errorMessage && (
                        <div role="alert" style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.9rem'
                        }}>
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </section>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default Login;
