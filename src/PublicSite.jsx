import React, { useEffect } from 'react';
import Hero from './components/Hero';
import History from './components/History';
import Location from './components/Location';
import DressCode from './components/DressCode';
import GiftList from './components/GiftList';
import RSVP from './components/RSVP';
import MessageWall from './components/MessageWall';
import AudioPlayer from './components/AudioPlayer';
import { registerPageView } from './lib/tracking';

function PublicSite() {
    useEffect(() => {
        registerPageView();
    }, []);

    useEffect(() => {
        const observerOptions = { threshold: 0.1 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app">
            <AudioPlayer />
            <Hero />
            <div className="fade-in"><History /></div>
            <div className="fade-in"><DressCode /></div>
            <GiftList />
            <div className="fade-in"><RSVP /></div>
            <div className="fade-in"><Location /></div>
            <div className="fade-in"><MessageWall /></div>

            <footer style={{
                padding: '3rem 1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--text-primary)',
                color: 'white',
                fontSize: '0.8rem',
                letterSpacing: '0.1rem',
                textTransform: 'uppercase'
            }}>
                <p className="serif" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', textTransform: 'none' }}>
                    Aline & Fernando
                </p>
                <p>06.06.2026</p>
            </footer>
        </div>
    );
}

export default PublicSite;
