import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        await loginWithRedirect();
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="glass" style={{
                padding: '4rem',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    marginBottom: '1rem',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>Admin Access</h1>

                <p style={{ color: '#aaa', marginBottom: '3rem' }}>
                    Please authenticate to access the event management dashboard.
                </p>

                <button
                    onClick={handleGoogleLogin}
                    style={{
                        background: 'white',
                        color: '#333',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        width: '100%',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        style={{ width: '24px', height: '24px' }}
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
