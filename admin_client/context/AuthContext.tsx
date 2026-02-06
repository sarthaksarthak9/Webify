"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    login: (email: string, password: string) => boolean;
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

    const login = (email: string, password: string): boolean => {
        // Hardcoded authentication
        if (email === 'yash@gmail.com' && password === '123456') {
            setIsAuthenticated(true);
            setUserEmail(email);
            localStorage.setItem('admin_auth', 'true');
            localStorage.setItem('admin_email', email);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_email');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, isLoading }}>
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
