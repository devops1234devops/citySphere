import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventList from './pages/EventList';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

import Login from './pages/Login';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Auth...</div>;

    if (!isAuthenticated) {
        loginWithRedirect();
        return null;
    }

    return children;
};

function AppContent() {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    const navClass = (isScrolled || !isHome) ? 'scrolled' : '';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={navClass}>
                <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-2px' }}>CITY</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--brand-magenta)', textTransform: 'uppercase', letterSpacing: '2px', marginLeft: '5px' }}>SPHERE</span>
                </Link>
                <div className="nav-links">
                    <Link to="/">Explore</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <button
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                className="btn-primary"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => loginWithRedirect()}
                            className="btn-primary"
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppContent />
            </Router>
        </QueryClientProvider>
    );
}

export default App;
