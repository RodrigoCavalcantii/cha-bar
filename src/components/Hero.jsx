import React, { useEffect, useState } from 'react';
import engagementImg from '../assets/images/historyMainPhoto.png';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToNext = () => {
        const nextSection = document.getElementById('history');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" style={{ padding: 0, height: '100vh', overflow: 'hidden' }}>
            <div
                className="hero-bg zoom-slow"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 245, 220, 0.3), rgba(0, 0, 0, 0.4)), url(${engagementImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />

            <div className={`container hero-content ${isVisible ? 'visible' : ''}`} style={{
                textAlign: 'center',
                padding: '0 1rem',
                color: 'white',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1.5s ease'
            }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="white" style={{ marginBottom: '0.5rem' }}>
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                    }}>Chábar & Comemoração Civil</span>
                </div>

                <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>Aline & Fernando</h1>
                <p className="serif" style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem' }}>
                    06 de Junho de 2026  - 16h
                </p>

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

export default Hero;
