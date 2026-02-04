import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import api from '../api/api.configure.js';

const AuthSync = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        const syncUser = async () => {
            if (isAuthenticated && user) {
                try {
                    await api.post('/api/auth/google-login', {
                        email: user.email,
                        name: user.name,
                        sub: user.sub,
                        picture: user.picture
                    });
                    console.log('User synced with backend database successfully');
                } catch (error) {
                    console.error('Failed to sync user with backend:', error);
                }
            }
        };

        syncUser();
    }, [isAuthenticated, user]);

    return null; // This component doesn't render anything
};

export default AuthSync;
