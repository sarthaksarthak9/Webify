"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    loginSuccess: (token: string, user: any) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check localStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('admin_auth');
        const storedEmail = localStorage.getItem('admin_email');

        if (storedAuth === 'true' && storedEmail) {
            setIsAuthenticated(true);
            setUserEmail(storedEmail);
        }
        setIsLoading(false);
    }, []);

    const loginSuccess = (token: string, user: any) => {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_email', user.email);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_email');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, loginSuccess, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
