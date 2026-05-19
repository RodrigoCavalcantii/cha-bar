import React from 'react';

const History = () => {


    const scrollToNext = () => {
        const nextSection = document.getElementById('dress-code');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="history" className="history">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                    Nossa História
                </h2>

                <div className="timeline" style={{ position: 'relative' }}>
                    <div
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
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Tudo começou em novembro de 2022… e, desde então, a gente não desgrudou mais.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Entre risadas, planos e muitos momentos juntos, fomos construindo nossa história quase sem perceber. Até que, em fevereiro de 2024, no mar de São Miguel dos Milagres, veio o “sim” oficial. 🤍
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Agora chegou a hora de celebrar essa nova fase da nossa vida. Resolvemos unir o útil ao agradável e comemorar com um chá bar (ou chá de panela, ou chá de casa nova, ou tudo junto, como você quiser chamar 😄) ao lado das pessoas que fazem parte da nossa história.
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Vai ser muito especial ter você com a gente nesse momento!
                        </p>
                    </div>
                </div>

                <button
                    onClick={scrollToNext}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
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
