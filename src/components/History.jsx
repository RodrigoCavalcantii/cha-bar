import React from 'react';
import sunsetImg from '../assets/images/sunset.jpg';
import eventImg from '../assets/images/event.jpg';
import engagementImg from '../assets/images/engagement.jpg';
import newHomeImg from '../assets/images/new_home.png';

const events = [
    {
        date: 'Julho 2023',
        title: 'Onde tudo começou',
        description: 'Nos conhecemos em uma festa através de amigos em comum. O que parecia apenas um encontro casual foi o início de uma conexão instantânea e divertida.',
        image: sunsetImg
    },
    {
        date: 'Setembro 2023',
        title: 'Início do namoro',
        description: 'O pedido oficial aconteceu durante um jantar romântico especial. Naquele momento, decidimos que queríamos caminhar lado a lado nesta jornada.',
        image: eventImg
    },
    {
        date: 'Fevereiro 2024',
        title: 'O pedido',
        description: 'Fernando fez uma surpresa incrível em um passeio de barco com amigos. Nem eles sabiam! Ele pediu para tirar uma foto na ponta do barco e, de repente, fez o pedido mais importante de nossas vidas.',
        image: engagementImg
    },
    {
        date: 'Agosto 2026',
        title: 'Nosso novo lar',
        description: 'Em agosto de 2026, abriremos as portas para uma nova fase. Nossa casa nova, nosso refúgio, o lugar onde continuaremos construindo nossos sonhos.',
        image: newHomeImg
    }
];

const History = () => {
    return (
        <section id="history" className="history" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                    Nossa História
                </h2>

                <div className="timeline" style={{ position: 'relative' }}>
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="timeline-item"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                marginBottom: '4rem',
                                padding: '1.5rem',
                                backgroundColor: 'var(--white)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                position: 'relative'
                            }}
                        >
                            {event.image && (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{ width: '100%', borderRadius: '4px', objectFit: 'cover', height: '200px' }}
                                />
                            )}
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>
                                {event.date}
                            </span>
                            <h3 className="serif">{event.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default History;
