import React, { useState } from 'react';
import axios from 'axios';

const TicketModal = ({ event, onClose }) => {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);

    const handleTickets = async (e) => {
        e.preventDefault();
        if (!consent) return alert("Please agree to the terms.");

        try {
            await axios.post('/api/leads', {
                email,
                hasConsent: consent,
                eventId: event._id,
                eventName: event.title,
                source: 'Website'
            });
            window.open(event.originalUrl, '_blank');
            onClose();
        } catch (err) {
            console.error("Error saving lead:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
            <div style={{ background: 'white', padding: '3rem', maxWidth: '500px', width: '100%', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0, fontSize: '2rem', textTransform: 'uppercase', fontWeight: '900', lineHeight: '1' }}>
                        Secure <br /><span style={{ color: 'var(--brand-blue)' }}>Access</span>
                    </h2>
                    <button onClick={onClose} style={{ background: 'transparent', padding: 0, color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>×</span>
                    </button>
                </div>

                <p style={{ color: 'var(--text-muted)', margin: '0 0 2rem', fontSize: '1rem', fontWeight: '500' }}>
                    You are visiting <strong>{event.title}</strong>. Enter your email to proceed to the official ticket page.
                </p>

                <form onSubmit={handleTickets}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9rem', color: '#475569', marginBottom: '2rem', cursor: 'pointer', fontWeight: '400' }}>
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            style={{ marginTop: '0.2rem', width: '1rem', height: '1rem', flexShrink: 0 }}
                        />
                        <span style={{ lineHeight: '1.4' }}>I agree to receive curated updates about Sydney's latest events and exclusive experiences.</span>
                    </label>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                border: '1px solid var(--border-color)',
                                flex: 1
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 2,
                                background: 'var(--brand-blue)'
                            }}
                        >
                            Continue to Tickets
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketModal;
