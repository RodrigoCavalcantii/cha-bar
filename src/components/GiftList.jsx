import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';

const gifts = [
    { id: 1, name: '2 fronhas pra travesseiro babado de Fernando', price: 99.00, image: '/gifts/01.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-lgGMmqvBH-99,00' },
    { id: 2, name: 'Taça de cristal para Cerveja (6 peças)', price: 105.00, image: '/gifts/02.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-1XMX780psj-105,00' },
    { id: 3, name: 'Abafador de ruídos para Aline não escutar Fernando roncando', price: 109.90, image: '/gifts/03.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7goh2NfLWZ-109,90' },
    { id: 4, name: 'Assadeira Retangular Funda Brinox Ceramic Life', price: 122.00, image: '/gifts/04.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-3qPOtnFCzd-122,00' },
    { id: 5, name: 'Kit 15 utensílios de cozinha com cabo de inox e silicone (Creme)', price: 128.00, image: '/gifts/05.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-Vmqy4wDjn-128,00' },
    { id: 6, name: 'Churrasqueira elétrica', price: 145.00, image: '/gifts/06.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7gopgf5JJZ-145,00' },
    { id: 7, name: 'Cuscuzeira de Inox de Indução', price: 149.90, image: '/gifts/07.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7goqorUTgt-149,90' },
    { id: 8, name: 'Taças de cristal para Champagne (6 peças)', price: 152.90, image: '/gifts/08.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-DFBooUwfp-152,90' },
    { id: 9, name: 'Jogo de Toalhas 100% Algodão 2 Peças', price: 168.00, image: '/gifts/09.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-djZW1XQvt-168,00' },
    { id: 10, name: 'Jogo de assadeiras Marinex, 6 Peças, com Tampa', price: 172.30, image: '/gifts/10.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-TngAVV8Zn-172,30' },
    { id: 11, name: 'Kit sobrevivência para a primeira DR', price: 180.00, image: '/gifts/11.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-VmrJJx3cl-180,00' },
    { id: 12, name: 'Conjunto de almofadas', price: 199.90, image: '/gifts/12.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-3qPS4bwePJ-199,90' },
    { id: 13, name: 'Cobertor para Aline estar sempre coberta de razão', price: 220.00, image: '/gifts/13.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-6MAg1iGib-220,00' },
    { id: 14, name: 'Ajuda para Banda Tarraxinha tocar na festa', price: 250.00, image: '/gifts/14.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7govLW5cWl-250,00' },
    { id: 15, name: 'Edredom casal', price: 259.90, image: '/gifts/15.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-J4W4YBArr-259,90' },
    { id: 16, name: 'Batedeira', price: 265.00, image: '/gifts/16.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-QUNugmVVF-265,00' },
    { id: 17, name: 'Aparelho de fondue', price: 278.00, image: '/gifts/17.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-FtQlZTXe9-278,00' },
    { id: 18, name: 'Pillow Top 1000 gramas Casal', price: 299.00, image: '/gifts/18.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7goxX0A7jX-299,00' },
    { id: 19, name: 'Cotinha pra Lua de Mel', price: 308.00, image: '/gifts/19.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-2YwK4XVOJJ-308,00' },
    { id: 20, name: 'Multiprocessador', price: 315.00, image: '/gifts/20.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-TngY3wk19-315,00' },
    { id: 21, name: 'Jogo de Lençol Completo de Algodão ', price: 349.00, image: '/gifts/21.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-lgIXPq7Fl-349,00' },
    { id: 22, name: 'Panela de pressão de indução Brinox Antiaderente Ceramic Life', price: 372.00, image: '/gifts/22.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-qymCdl3vZ-372,00' },
    { id: 23, name: 'Alexa pra Aline ter mais alguém pra mandar', price: 385.00, image: '/gifts/23.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-xbNI8X29v-385,00' },
    { id: 24, name: 'Máquina de café espresso', price: 395.00, image: '/gifts/24.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-1vCkilzRJV-395,00' },
    { id: 25, name: 'Aluguel de um bebê para treinamento', price: 400.00, image: '/gifts/25.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-qymQcUWN9-400,00' },
    { id: 26, name: 'Adote um boleto atrasado', price: 415.00, image: '/gifts/26.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-qymU0NlDJ-415,00' },
    { id: 27, name: 'Ajuda com os boletos pós casamento', price: 419.00, image: '/gifts/27.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7gp336j1Fx-419,00' },
    { id: 28, name: 'Aparelho de Jantar', price: 430.00, image: '/gifts/28.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-3qPWlynAYR-430,00' },
    { id: 29, name: 'Uma pequena lembrancinha', price: 470.00, image: '/gifts/29.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7wiV4L9Sh-470,00' },
    { id: 30, name: 'Prioridade no anúncio da chegada do primeiro baby', price: 490.00, image: '/gifts/30.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7RvERO3dZ-490,00' },
    { id: 31, name: 'Obras de arte pra decorar a casa', price: 505.00, image: '/gifts/31.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-JrnJy5m5P-505,00' },
    { id: 32, name: 'Ajuda para comprar ração pro porquinho engordar', price: 520.00, image: '/gifts/32.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-lgJDRp4AL-520,00' },
    { id: 33, name: 'Jogo de Toalhas Banho + Rosto + Piso Algodão 5 Peças', price: 529.00, image: '/gifts/33.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7gp6hEmeRb-529,00' },
    { id: 34, name: 'Conjunto de talheres Tramontina em aço Inox', price: 554.00, image: '/gifts/34.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-1vCmLzDmlB-554,00' },
    { id: 35, name: 'Ajuda para aposentadoria dos noivos', price: 649.00, image: '/gifts/35.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7gp81mZ9dz-649,00' },
    { id: 36, name: 'Adega', price: 799.00, image: '/gifts/36.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-1vCmiGxaBn-799,00' },
    { id: 37, name: 'Dois meses de conta de luz garantida', price: 850.00, image: '/gifts/37.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-1vCmr7OwS1-850,00' },
    { id: 38, name: 'Se por uma intervenção divina você se sentir tocado', price: 999.90, image: '/gifts/38.png', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-djazicBgj-999,90' },
    { id: 39, name: 'Coifa de Ilha', price: 1300.00, image: '/gifts/39.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-7gpANLTf6F-1300,00' },
    { id: 40, name: 'Cervejeira', price: 1997.00, image: '/gifts/40.jpg', link: 'https://link.infinitepay.io/aline-cavalcant1/VC1D-3qPaSWt9Dl-1997,00' }
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
                    <p style={{ textAlign: 'justify', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Escolhemos itens divertidos e fictícios para representar sua contribuição.
                        O valor do "presente" escolhido será enviado via PIX/Cartão diretamente para a nossa conta e nos ajudará a começar essa nova fase com muita alegria!
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
                                    className="btn-gift"
                                >
                                    Presentear
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedGift && createPortal(
                    <div 
                        className="modal-overlay"
                        style={{
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
                        }}
                    >
                        <div 
                            className="modal-content"
                            style={{
                                backgroundColor: 'white',
                                padding: '2.5rem 2rem',
                                borderRadius: '16px',
                                maxWidth: '400px',
                                width: '100%',
                                textAlign: 'center',
                                position: 'relative',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
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
                                            className="btn-accent"
                                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
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
                                    <img 
                                        src={selectedGift.image} 
                                        alt={selectedGift.name} 
                                        style={{ 
                                            width: '100%', 
                                            height: '300px', 
                                            objectFit: 'cover', 
                                            borderRadius: '12px', 
                                            marginBottom: '1.5rem' 
                                        }} 
                                    />
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
                                        className="btn-primary"
                                        style={{
                                            backgroundColor: copied ? '#2ecc71' : undefined,
                                            marginBottom: '0.8rem'
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
                                        onClick={() => window.open(selectedGift.link, '_blank')}
                                        className="btn-accent"
                                        style={{ marginBottom: '0.8rem' }}
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
