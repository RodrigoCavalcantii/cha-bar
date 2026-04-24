import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { supabase } from '../lib/supabase';

const AUTH_KEY = 'cha-bar-admin';

const TABS = [
    { id: 'confirmations', label: 'Confirmações' },
    { id: 'stats', label: 'Estatísticas' },
    { id: 'top-messages', label: 'Top Recados' }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('confirmations');
    const [session, setSession] = useState(null);

    useEffect(() => {
        const raw = localStorage.getItem(AUTH_KEY);
        if (!raw) {
            navigate('/login');
            return;
        }
        try {
            setSession(JSON.parse(raw));
        } catch {
            localStorage.removeItem(AUTH_KEY);
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        navigate('/login');
    };

    if (!session) return null;

    return (
        <div style={{ minHeight: '100dvh', backgroundColor: 'var(--bg-secondary)' }}>
            <header style={{
                backgroundColor: 'var(--white)',
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div>
                    <h1 className="serif" style={{ fontSize: '1.2rem', margin: 0 }}>
                        Painel
                    </h1>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Olá, {session.username}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}
                >
                    Sair
                </button>
            </header>

            <nav style={{
                display: 'flex',
                gap: '0.25rem',
                padding: '1rem 1rem 0',
                maxWidth: '900px',
                margin: '0 auto',
                overflowX: 'auto'
            }}>
                {TABS.map(tab => {
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '0.7rem 1.1rem',
                                backgroundColor: active ? 'var(--accent)' : 'transparent',
                                color: active ? 'white' : 'var(--text-primary)',
                                border: 'none',
                                borderRadius: '8px 8px 0 0',
                                fontSize: '0.9rem',
                                fontWeight: active ? '600' : '400',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            <main style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '1.5rem 1rem 3rem'
            }}>
                {activeTab === 'confirmations' && <ConfirmationsTab />}
                {activeTab === 'stats' && <StatsTab />}
                {activeTab === 'top-messages' && <TopMessagesTab />}
            </main>
        </div>
    );
};

const cardStyle = {
    backgroundColor: 'var(--white)',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    marginBottom: '1rem'
};

const ConfirmationsTab = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('confirmations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            setRows(data || []);
            setLoading(false);
        })();
    }, []);

    const groups = rows.reduce((acc, row) => {
        const key = row.group_id || `solo-${row.id}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(row);
        return acc;
    }, {});

    if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>;
    if (rows.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Nenhuma confirmação ainda.</p>;

    return (
        <>
            <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total de convidados confirmados
                </p>
                <p className="serif" style={{ fontSize: '2rem', margin: '0.2rem 0 0', color: 'var(--accent)' }}>
                    {rows.length}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    em {Object.keys(groups).length} grupo(s)
                </p>
            </div>

            {Object.entries(groups).map(([gid, members]) => (
                <div key={gid} style={cardStyle}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Grupo #{gid.slice(0, 8)}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                            {formatDateTime(members[0].created_at)}
                        </p>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {members.map(m => (
                            <li key={m.id} style={{
                                padding: '0.5rem 0',
                                borderBottom: '1px solid #f0f0f0',
                                fontSize: '0.95rem'
                            }}>
                                {m.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

const StatsTab = () => {
    const [chartData, setChartData] = useState([]);
    const [topGifts, setTopGifts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const [views, clicks] = await Promise.all([
                supabase.from('page_views').select('view_date'),
                supabase.from('gift_clicks').select('gift_id, gift_name')
            ]);

            if (views.data) {
                const counts = {};
                views.data.forEach(r => {
                    counts[r.view_date] = (counts[r.view_date] || 0) + 1;
                });
                const series = Object.entries(counts)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([date, count]) => ({
                        date: formatDateShort(date),
                        count
                    }));
                setChartData(series);
            }

            if (clicks.data) {
                const counts = {};
                clicks.data.forEach(r => {
                    const key = r.gift_id;
                    if (!counts[key]) counts[key] = { gift_id: r.gift_id, gift_name: r.gift_name, count: 0 };
                    counts[key].count++;
                });
                const top = Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
                setTopGifts(top);
            }

            setLoading(false);
        })();
    }, []);

    if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>;

    return (
        <>
            <div style={cardStyle}>
                <h3 className="serif" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    Acessos por dia
                </h3>
                {chartData.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sem acessos ainda.</p>
                ) : (
                    <div style={{ width: '100%', height: 240 }}>
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis allowDecimals={false} fontSize={12} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="var(--accent)"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            <div style={cardStyle}>
                <h3 className="serif" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    Top 5 presentes clicados
                </h3>
                {topGifts.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sem cliques ainda.</p>
                ) : (
                    <ol style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                        {topGifts.map((g, idx) => (
                            <li key={g.gift_id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '0.7rem 0',
                                borderBottom: idx === topGifts.length - 1 ? 'none' : '1px solid #f0f0f0',
                                gap: '1rem'
                            }}>
                                <span style={{ fontSize: '0.9rem', flex: 1 }}>
                                    <strong style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>#{idx + 1}</strong>
                                    {g.gift_name}
                                </span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    {g.count}
                                </span>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </>
    );
};

const TopMessagesTab = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .gt('likes', 1)
                .order('likes', { ascending: false });

            if (error) console.error(error);
            setMessages(data || []);
            setLoading(false);
        })();
    }, []);

    if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>;
    if (messages.length === 0) return (
        <p style={{ color: 'var(--text-secondary)' }}>
            Nenhum recado com mais de 1 like ainda.
        </p>
    );

    return (
        <>
            {messages.map(msg => (
                <div key={msg.id} style={cardStyle}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{msg.name}</h4>
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            fontWeight: 600
                        }}>
                            ❤️ {msg.likes}
                        </span>
                    </div>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        margin: 0
                    }}>
                        "{msg.text}"
                    </p>
                </div>
            ))}
        </>
    );
};

const formatDateShort = (iso) => {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}`;
};

const formatDateTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const date = d.toLocaleDateString('pt-BR');
    const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${date} às ${time}`;
};

export default Dashboard;
