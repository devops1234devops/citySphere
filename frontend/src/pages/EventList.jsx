import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EventCard from '../components/EventCard';
import TicketModal from '../components/TicketModal';
import { Camera } from 'lucide-react';

const EventList = () => {
    const [selectedEventForTicket, setSelectedEventForTicket] = useState(null);

    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axios.get('/api/events');
            return res.data;
        }
    });

    if (isLoading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1.5rem' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--brand-blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '600' }}>CURATING YOUR SYDNEY EXPERIENCE...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#FEF2F2', border: '1px solid #F87171' }}>
            <h2 style={{ color: '#991B1B' }}>CONNECTION ERROR</h2>
            <p style={{ color: '#B91C1C' }}>We're having trouble retrieving Sydney's latest events. Please try again later.</p>
        </div>
    );

    return (
        <main style={{ paddingBottom: '8rem' }}>
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Sydney. <span>Beyond the expected.</span>
                    </h1>
                </div>
            </section>

            <header style={{ textAlign: 'left', marginBottom: '4rem', marginTop: '6rem', padding: '0 1.5rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>The Explore <br /><span style={{ color: 'var(--brand-teal)' }}>Guide</span></h1>
                <div style={{ width: '80px', height: '8px', background: 'var(--brand-magenta)', marginTop: '2rem' }}></div>
            </header>

            <div className="magazine-layout">
                {events?.filter(e => e.status !== 'inactive').map((event, index) => {
                    return (
                        <EventCard
                            key={event._id}
                            event={event}
                            layout="regular"
                            onGetTickets={setSelectedEventForTicket}
                        />
                    );
                })}
            </div>

            {events?.length === 0 && (
                <div style={{ textAlign: 'center', padding: '8rem', border: '1px dashed var(--border-color)', margin: '0 4rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.5rem', fontWeight: '700' }}>THE CITY IS QUIET FOR NOW. CHECK BACK SOON.</p>
                </div>
            )}

            {selectedEventForTicket && (
                <TicketModal
                    event={selectedEventForTicket}
                    onClose={() => setSelectedEventForTicket(null)}
                />
            )}
        </main>
    );
};

export default EventList;
