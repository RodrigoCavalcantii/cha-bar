import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';

const gifts = [
    { id: 1, name: '2 drinks em Fernando de Noronha', price: 200, image: '/gifts/drinksemnoronha.png' },
    { id: 2, name: '1 fronha pra travesseiro babado de Fernando/Aline', price: 100, image: '/gifts/fronhababada.png' },
    { id: 3, name: 'Tapa ouvido para Fernando não ouvir Aline roncando', price: 50, image: '/gifts/tapaouvido.png' },
    { id: 4, name: 'Cota para o primeiro desentendimento sobre a louça', price: 150, image: '/gifts/lavandolouca.png' },
    { id: 5, name: 'Kit sobrevivência para a primeira DR', price: 75, image: '/gifts/kitsobrevivenciadr.png' },
    { id: 6, name: 'Seguro contra Fernando esquecer o aniversário', price: 300, image: '/gifts/fernandoesquecido.png' }
];

const externalStores = [
    { name: 'Camicado', url: 'https://lista.camicado.com.br/alineefernando', color: '#e31d1a' },
    { name: 'Shopee', url: 'https://collshp.com/alinecavalcant1811?share_channel_code=1&view=storefront', color: '#ee4d2d' }
];

const GiftList = () => {
    const [selectedGift, setSelectedGift] = useState(null);
    const [redirectingStore, setRedirectingStore] = useState(null);
    const [copied, setCopied] = useState(false);
    const pixKey = "aline-e-fernando@outlook.com";

    const [modalStep, setModalStep] = useState(1);
    const [msgName, setMsgName] = useState('');
    const [msgText, setMsgText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenGiftModal = (gift) => {
        setSelectedGift(gift);
        setModalStep(1);
        setMsgName('');
        setMsgText('');
        setCopied(false);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!msgName.trim() || !msgText.trim()) return;
        
        setIsSubmitting(true);
        const { error } = await supabase
            .from('messages')
            .insert([{ name: msgName, text: msgText }]);
            
        setIsSubmitting(false);
        
        if (error) {
            console.error("Erro ao enviar a mensagem:", error);
            alert("Ocorreu um erro ao enviar sua mensagem.");
        } else {
            window.dispatchEvent(new CustomEvent('messageAdded'));
        }
        
        setModalStep(2);
    };

    const copyPix = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleExternalRedirect = () => {
        if (redirectingStore) {
            window.open(redirectingStore.url, '_blank');
            setRedirectingStore(null);
        }
    };

    return (
        <section id="gifts" className="gifts" style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
            <div className="container">
                <h2 className="serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Lista de Presentes</h2>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'justify', marginBottom: '0.10rem', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                    Estamos começando uma nova fase do zero e montamos esta lista para nos ajudar a construir nosso lar! 🤍
                </p>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'justify', marginBottom: '0.10rem', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                    Mais do que qualquer presente, nossa maior alegria é celebrar com você.
                </p>

                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    textAlign: 'center',
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: '1px dashed var(--accent)'
                }}>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '1rem', fontSize: '1.1rem' }}>
                        ℹ️ Como funcionam os presentes
                    </p>
                    
                    <ul style={{ 
                        color: 'var(--text-secondary)', 
                        textAlign: 'left', 
                        fontSize: '0.95rem', 
                        lineHeight: '1.6',
                        margin: '0', 
                        paddingLeft: '1.5rem'
                    }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <strong>Pelo site:</strong> Escolha um item e faça o pagamento via Pix ou cartão.
                        </li>
                        <li>
                            <strong>No dia do Chá:</strong> Se preferir levar o presente físico, use a lista como referência. Só pedimos com carinho (e um pouquinho de apego 😅) que siga os modelos que escolhemos, pois cada detalhe foi pensado para nossa casa nova.
                        </li>
                    </ul>
                </div>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    textAlign: 'center',
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: '1px dashed var(--accent)'
                }}>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500', marginBottom: '0.5rem' }}>
                        🎁 Presentes Simbólicos
                    </p>
                    <p style={{ textAlign: 'justify', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Escolhemos itens divertidos e fictícios para representar sua contribuição.
                        O valor do "presente" escolhido será enviado via PIX diretamente para a nossa conta e nos ajudará a começar essa nova fase com muita alegria!
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '4rem'
                }}>
                    {gifts.map(gift => (
                        <div
                            key={gift.id}
                            style={{
                                backgroundColor: 'var(--white)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                            <div style={{ padding: '1rem', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>{gift.name}</h4>
                                    <p style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                        R$ {gift.price.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenGiftModal(gift)}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid var(--text-primary)',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Presentear
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* External Stores Section
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Listas em Lojas Reais</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                        Os presentes listados abaixo foram escolhidos com muito carinho por nós dois.
                        Você pode usar o endereço que está na sessão de <a href="#location" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>Localização</a> para enviar o presente diretamente!
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {externalStores.map(store => (
                            <button
                                key={store.name}
                                onClick={() => setRedirectingStore(store)}
                                style={{
                                    padding: '1rem 2rem',
                                    border: `2px solid ${store.color}`,
                                    backgroundColor: 'white',
                                    color: store.color,
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    minWidth: '180px'
                                }}
                            >
                                {store.name}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* PIX Modal */}
                {selectedGift && createPortal(
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2.5rem 2rem',
                            borderRadius: '16px',
                            maxWidth: '400px',
                            width: '100%',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}>
                            <button
                                onClick={() => {
                                    setSelectedGift(null);
                                    setCopied(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    fontSize: '1.5rem',
                                    color: 'var(--text-secondary)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                ✕
                            </button>

                            {modalStep === 1 ? (
                                <>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✍️</div>
                                    <h3 className="serif" style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Deixe um Recado!</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        Antes de ver as informações do PIX, aproveite para deixar uma mensagem no mural pra gente!
                                    </p>

                                    <form onSubmit={handleSendMessage} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <input
                                                type="text"
                                                placeholder="Seu nome"
                                                value={msgName}
                                                onChange={(e) => setMsgName(e.target.value)}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontFamily: 'var(--font-sans)',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <textarea
                                                placeholder="Sua mensagem carinhosa..."
                                                value={msgText}
                                                onChange={(e) => setMsgText(e.target.value)}
                                                required
                                                rows="3"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontFamily: 'var(--font-sans)',
                                                    outline: 'none',
                                                    resize: 'none'
                                                }}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                backgroundColor: 'var(--accent)',
                                                color: 'white',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                border: 'none',
                                                opacity: isSubmitting ? 0.7 : 1
                                            }}
                                        >
                                            {isSubmitting ? 'Enviando...' : 'Enviar e ir para pagamento'}
                                        </button>
                                    </form>

                                    <button
                                        onClick={() => setModalStep(2)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Pular etapa e ir para pagamento
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
                                    <h3 className="serif" style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{selectedGift.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                        Valor: <span style={{ color: 'var(--accent)', fontWeight: '600' }}>R$ {selectedGift.price.toFixed(2)}</span>
                                    </p>

                                    <div style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        padding: '1rem',
                                        border: '1px dashed var(--accent)',
                                        borderRadius: '8px',
                                        marginBottom: '1.5rem',
                                        wordBreak: 'break-all',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {pixKey}
                                    </div>

                                    <button
                                        onClick={copyPix}
                                        style={{
                                            width: '100%',
                                            padding: '1.1rem',
                                            backgroundColor: copied ? '#2ecc71' : 'var(--text-primary)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            marginBottom: '0.8rem',
                                            cursor: 'pointer',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {copied ? (
                                            <>
                                                <span style={{ fontSize: '1.2rem' }}>✓</span>
                                                Chave Copiada!
                                            </>
                                        ) : (
                                            'Copiar Chave PIX'
                                        )}
                                    </button>

                                    <button
                                        onClick={() => window.open(`https://link.infinitepay.io/aline-cavalcant1/VC1D-1HKAn0hnFp-100,00`, '_blank')}
                                        style={{
                                            width: '100%',
                                            padding: '1.1rem',
                                            backgroundColor: 'var(--accent)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            marginBottom: '0.8rem',
                                            cursor: 'pointer',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>💳</span>
                                        Pagar com Cartão de Crédito
                                    </button>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.8rem' }}>
                                        Muito obrigado pelo carinho! ❤️
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                , document.body)}

                {/* Redirect Modal */}
                {redirectingStore && createPortal(
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1.5rem'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2.5rem 2rem',
                            borderRadius: '16px',
                            maxWidth: '450px',
                            width: '100%',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                            <h3 className="serif" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Indo para a {redirectingStore.name}</h3>
                            <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                Você será redirecionado para a loja parceira. O pagamento será feito <strong>diretamente no site deles</strong>.
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.5' }}>
                                Depois de escolher seu presente, não esqueça de voltar aqui para nos deixar uma mensagem carinhosa no mural!
                            </p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setRedirectingStore(null)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleExternalRedirect}
                                    style={{
                                        flex: 2,
                                        padding: '1rem',
                                        backgroundColor: redirectingStore.color,
                                        color: 'white',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                >
                                    Ir para a loja
                                </button>
                            </div>
                        </div>
                    </div>
                , document.body)}
            </div>
        </section>
    );
};

export default GiftList;
