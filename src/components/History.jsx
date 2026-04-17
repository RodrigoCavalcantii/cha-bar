import React from 'react';
import sunsetImg from '../assets/images/sunset.jpg';
import eventImg from '../assets/images/event.jpg';
import engagementImg from '../assets/images/engagement.jpg';
import marriedCivil from '../assets/images/casamentocivil.png';

const events = [
    {
        date: 'Novembro 2022',
        title: 'Onde tudo começou',
        description: 'Tudo começou em novembro de 2022… e, desde então, a gente simplesmente não desgrudou mais.',
        image: sunsetImg
    },
    {
        date: 'Fevereiro 2024',
        title: 'O pedido',
        description: 'Entre risadas, planos e muitos momentos juntos, fomos construindo nossa história quase sem perceber. Até que, em fevereiro de 2024, no mar de São Miguel dos Milagres, veio o “sim” oficial, com direito a pedido de casamento e tudo que esse momento merece 🤍',
        image: engagementImg
    },
    {
        date: 'Maio 2026',
        title: 'Casamento Civil',
        description: 'Agora, com o casamento civil marcado para 15/05/2026, chegou a hora de celebrar essa nova fase da nossa vida.',
        image: marriedCivil
    },
    {
        date: 'Junho 2026',
        title: 'Comemoração Chábar & Comemoração Civil',
        description: 'E claro que a gente não ia deixar passar em branco! Por isso, resolvemos unir o útil ao agradável e comemorar com um chá bar (ou chá de panela, ou chá de casa nova, ou tudo junto mesmo, como você quiser chamar 😄) ao lado das pessoas que fazem parte da nossa história.',
        image: eventImg
    },
];

const History = () => {


    const scrollToNext = () => {
        const nextSection = document.getElementById('countdown');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="history" className="history" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
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
                                marginBottom: '2rem',
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

                <button
                    onClick={scrollToNext}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        marginTop: '3.5rem',
                        cursor: 'pointer',
                        animation: 'bounce 2s infinite'
                    }}
                    aria-label="Ver detalhes"
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                </button>
                
            </div>
        </section>
    );
};

export default History;
