import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const SEGUNDO_INICIAL = 15; 

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = SEGUNDO_INICIAL;
        }
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const aoTerminarMusica = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = SEGUNDO_INICIAL;
            audioRef.current.play();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            
            <audio ref={audioRef} onEnded={aoTerminarMusica}>
                <source src="/musica-tema.mp3" type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>

            {!isPlaying && (
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    border: '1px dashed var(--accent)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    Aumente o som! 🎵
                </div>
            )}

            <button 
                onClick={togglePlay} 
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>
        </div>
    );
};

export default AudioPlayer;