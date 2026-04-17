import React from 'react';
import attire2Img from '../assets/images/festa_junina_attire_2.png';
import attireImg from '../assets/images/festa_junina_attire.png';

const DressCode = () => {

    const scrollToNext = () => {
        const nextSection = document.getElementById('gifts');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <section id="dress-code" className="dress-code" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
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
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)'}}>
                            Como toda boa celebração merece um clima à altura, resolvemos colocar um tempero bem nosso nesse momento...
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '400' }}>
                            O tema será: <strong>festa junina! 🌽✨</strong>
                        </p>
                        
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)'}}>
                            Nada combina mais com alegria, união e comemoração do que uma boa festa junina que a gente ama!
                        </p>

                        <p style={{ 
                            fontSize: '1rem', 
                            color: 'var(--text-primary)', 
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            borderLeft: '4px solid var(--accent)',
                            textAlign: 'left',
                            lineHeight: '1.6'
                        }}>
                            Pra entrar de vez no espírito da festa, o traje é simples: <strong>venha no melhor estilo junino!</strong> Vale xadrez, vestido, camisa, chapéu de palha e bota… o importante é chegar no clima e pronto pra arrastar o pé com a gente 💛
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

export default DressCode;