import React from 'react';

const Calendar = () => {
    const event = {
        title: "Chá Bar Aline & Fernando",
        description: "Venha comemorar conosco o nosso Chá Bar!",
        location: "Avenida jornalista possidonio cavalcanti bastos, 471 - Iputinga, Recife - PE, 50680-400",
        startTime: "20261025T160000Z",
        endTime: "20261025T220000Z"
    };

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    return (
        <div style={{ padding: '2rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Não quer esquecer? Salve no seu calendário:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '0.6rem 1.2rem',
                        border: '1px solid var(--text-primary)',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05rem'
                    }}
                >
                    Google Calendar
                </a>
                {/* <button
                    onClick={() => alert('Para Apple/Outlook, salve o arquivo .ics (funcionalidade em desenvolvimento)')}
                    style={{
                        padding: '0.6rem 1.2rem',
                        border: '1px solid var(--text-primary)',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05rem'
                    }}
                >
                    iCal / Outlook
                </button> */}
            </div>
        </div>
    );
};

export default Calendar;
