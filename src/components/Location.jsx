import React from 'react';

const Location = () => {
    const address = "Avenida jornalista possidonio cavalcanti bastos, 471 - Iputinga, Recife - PE, 50680-400";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

    return (
        <section id="location" className="location" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Local do Evento</h2>
                <p className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                    Recife, PE
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>{address}</p>

                <div style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    marginBottom: '2rem'
                }}>
                    <iframe
                        title="Mapa Local"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                    ></iframe>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2rem',
                            backgroundColor: 'var(--text-primary)',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.05rem',
                            textDecoration: 'none'
                        }}
                    >
                        Google Maps
                    </a>
                    <a
                        href={wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2rem',
                            backgroundColor: '#33ccff',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            letterSpacing: '0.05rem',
                            textDecoration: 'none'
                        }}
                    >
                        Waze
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Location;
