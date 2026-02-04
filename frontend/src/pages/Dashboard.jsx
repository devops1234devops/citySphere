import React, { useState, useEffect } from 'react';
import api from '../api/api.configure.js';
import { useAuth0 } from "@auth0/auth0-react";
import { Search, MapPin, Calendar, Filter, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
    const { user } = useAuth0();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filters, setFilters] = useState({
        city: 'Sydney',
        keyword: '',
        status: '',
        startDate: '',
        endDate: ''
    });

    const [stats, setStats] = useState({ new: 0, updated: 0, total: 0 });

    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const fetchEvents = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.city) params.append('city', filters.city);
            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.status) params.append('status', filters.status);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);

            const res = await api.get(`/api/events?${params.toString()}`);
            setEvents(res.data);

            const newCount = res.data.filter(e => e.status === 'new').length;
            const updatedCount = res.data.filter(e => e.status === 'updated').length;
            setStats({ new: newCount, updated: updatedCount, total: res.data.length });
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const handleImport = async () => {
        if (!selectedEvent) return;
        try {
            const res = await axios.patch(`/api/events/${selectedEvent._id}/status`, {
                status: 'imported',
                importedBy: user.email,
                importNotes: 'Manually imported via Dashboard'
            });

            setEvents(events.map(e => e._id === selectedEvent._id ? res.data : e));
            setSelectedEvent(res.data);
        } catch (error) {
            console.error("Import failed:", error);
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dashboard-wrapper">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Filter size={24} />
            </button>

            <div className={`dashboard-sidebar ${sidebarOpen ? 'active' : ''}`}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Filters
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Search</label>
                            <div style={{ position: 'relative' }}>
                                <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    placeholder="Event, Venue..."
                                    style={{ width: '100%', paddingLeft: '40px' }}
                                    value={filters.keyword}
                                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>City</label>
                            <select
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white' }}
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            >
                                <option value="Sydney">Sydney</option>
                                <option value="Melbourne">Melbourne</option>
                                <option value="">All Cities</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Date Range</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                    style={{ width: '100%', color: '#64748b' }}
                                />
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                    style={{ width: '100%', color: '#64748b' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', display: 'block' }}>Status</label>
                            <select
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white' }}
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Statuses</option>
                                <option value="new">New</option>
                                <option value="updated">Updated</option>
                                <option value="imported">Imported</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#64748b' }}>Quick Stats</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ flex: 1, background: '#f0f9ff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0073bb' }}>{stats.new}</div>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#64748b' }}>New</div>
                        </div>
                        <div style={{ flex: 1, background: '#fdf2f8', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#db2777' }}>{stats.updated}</div>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#64748b' }}>Updated</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>City Sphere Dashboard</h1>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Showing {events.length} events</div>
                </div>

                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>Event</th>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr
                                    key={event._id}
                                    onClick={() => setSelectedEvent(event)}
                                    style={{
                                        cursor: 'pointer',
                                        background: selectedEvent?._id === event._id ? '#f1f5f9' : 'white'
                                    }}
                                >
                                    <td>
                                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{event.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <MapPin size={12} /> {event.venue.name}
                                        </div>
                                    </td>
                                    <td>{format(new Date(event.dateTime), 'MMM d, yyyy')}</td>
                                    <td>{event.sourceWebsite}</td>
                                    <td>
                                        <span className={`tag tag-${event.status}`}>{event.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                selectedEvent && (
                    <div className="preview-panel">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <span className={`tag tag-${selectedEvent.status}`} style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>{selectedEvent.status}</span>
                            <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', color: '#94a3b8', padding: 0 }}><XCircle size={24} /></button>
                        </div>


                        <h2 style={{ fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>{selectedEvent.title}</h2>
                        <div style={{ color: '#0073bb', fontWeight: '700', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {format(new Date(selectedEvent.dateTime), 'EEEE, MMMM d, yyyy • h:mm a')}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Venue</h4>
                            <div style={{ fontWeight: '600' }}>{selectedEvent.venue.name}</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{selectedEvent.venue.address}</div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>Description</h4>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#334155' }}>{selectedEvent.description}</p>
                        </div>

                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                            {selectedEvent.status === 'imported' ? (
                                <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                                    <CheckCircle size={20} /> Imported
                                </div>
                            ) : (
                                <button
                                    onClick={handleImport}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    Import to Platform
                                </button>
                            )}
                            <a
                                href={selectedEvent.originalUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#64748b', textDecoration: 'none' }}
                            >
                                View Original Source
                            </a>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Dashboard;
