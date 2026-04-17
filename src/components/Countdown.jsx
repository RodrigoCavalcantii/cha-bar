import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';

const Countdown = () => {
    const targetDate = new Date('2026-06-06T16:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeBlock = ({ value, label }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
            <span className="serif" style={{ fontSize: '2.5rem', lineHeight: '1', color: 'var(--accent)' }}>
                {String(value).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: 'var(--text-secondary)' }}>
                {label}
            </span>
        </div>
    );

    const scrollToNext = () => {
        const nextSection = document.getElementById('dress-code');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="countdown" className="countdown" style={{ padding: '2.5rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    Faltam apenas...
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '1.2rem 1rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent)',
                    borderRadius: '50px',
                    maxWidth: '400px',
                    margin: '0 auto'
                }}>
                    <TimeBlock value={timeLeft.days} label="Dias" />
                    <TimeBlock value={timeLeft.hours} label="Hrs" />
                    <TimeBlock value={timeLeft.minutes} label="Min" />
                    <TimeBlock value={timeLeft.seconds} label="Seg" />
                </div>

                <p className="serif" style={{ marginTop: '1.5rem', fontSize: '1rem', color: 'var(--accent)', fontWeight: '500' }}>
                    Para o nosso Chábar & Comemoração Civil ! 🏠🍻
                </p>
                
                <div className="fade-in"><Calendar /></div>

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

export default Countdown;
