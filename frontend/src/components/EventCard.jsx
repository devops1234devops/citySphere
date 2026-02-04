import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { format } from 'date-fns';

const EventCard = ({ event, layout = 'regular', onGetTickets }) => {
    const cardClass = `glass ${layout === 'featured' ? 'card-featured' : layout === 'wide' ? 'card-wide' : ''}`;

    const getPlaceholderImage = (title) => {
        const hash = (title || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `https://picsum.photos/seed/${hash}/800/600`;
    };

    return (
        <div className={cardClass} style={{ padding: '0', border: '1px solid var(--border-color)', borderRadius: '12px', boxShadow: 'none', display: 'flex', flexDirection: 'column', background: 'white', position: 'relative', overflow: 'hidden' }}>

            <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                    src={event.imageUrl || getPlaceholderImage(event.title)}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/800x600?text=No+Image';
                    }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '0.5rem 1rem', background: 'rgba(15, 23, 42, 0.9)', color: 'white' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {event.city || 'SYDNEY'}
                    </span>
                </div>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--brand-blue)' }}>
                        {event.sourceWebsite || 'EVENT'}
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <h3 style={{ margin: '0', fontSize: '2rem', fontWeight: '900', color: 'var(--text-dark)', lineHeight: '1', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                        {event.title}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-magenta)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase' }}>
                            <Calendar size={16} strokeWidth={2.5} />
                            {event.dateDisplay || format(new Date(event.dateTime), 'EEEE, MMM d • h:mm a')}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}>
                            <MapPin size={16} strokeWidth={2} />
                            {event.venue.name}
                        </div>
                    </div>

                    <p style={{ color: '#475569', fontSize: '1rem', margin: '1rem 0 0', lineHeight: '1.6', fontWeight: '400', maxWidth: '600px' }}>
                        {event.description}
                    </p>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                    <button
                        onClick={() => onGetTickets(event)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '1rem',
                            fontSize: '0.9rem',
                            background: 'var(--text-dark)'
                        }}
                    >
                        GET TICKETS <Ticket size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
