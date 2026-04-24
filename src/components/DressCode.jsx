import React from 'react';
import attire2Img from '../assets/images/festa_junina_attire_2.png';
import attireImg from '../assets/images/festa_junina_attire.png';
import bgImg from '../assets/images/festa_junina_bg.jpeg';

const DressCode = () => {

    const scrollToNext = () => {
        const nextSection = document.getElementById('gifts');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <section
            id="dress-code"
            className="dress-code"
            style={{
                backgroundImage: `linear-gradient(rgba(217, 173, 144, 0.25), rgba(217, 173, 144, 0.25)), url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="serif" style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--white)',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)'
                }}>
                    Tema e traje ✨
                </h2>
                <div className="dress-code-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="text-content" style={{ 
                        textAlign: 'center', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.5rem',
                        padding: '0 0.5rem'
                    }}>
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.55)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            padding: '1.5rem 1.25rem',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                Mês de junho combina com… <strong>São João! 🌽🔥</strong>
                            </p>

                            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                Isso mesmo: nossa festa vai ser um verdadeiro arraial no meio da cidade!
                            </p>
                        </div>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            backgroundColor: 'rgba(255, 255, 255, 0.55)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            padding: '1.5rem 1.25rem',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--accent)',
                            textAlign: 'left',
                            lineHeight: '1.6'
                        }}>
                            Então já sabe: <strong>venha à caráter</strong>, capriche no xadrez, no chapéu e na bota, porque a missão é clara — gastar a sola dançando forró e entrar na quadrilha. 💛
                        </p>
                    </div>

                    <div className="image-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '1rem',
                        marginBottom: '1rem' 
                    }}>
                        <div className="image-wrapper" style={{ 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            aspectRatio: '1/1'
                        }}>
                            <img 
                                src={attire2Img} 
                                alt="Sugestão de Traje 1" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="image-wrapper" style={{ 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            aspectRatio: '1/1'
                        }}>
                            <img 
                                src={attireImg} 
                                alt="Sugestão de Traje 2" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
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

export default DressCode;