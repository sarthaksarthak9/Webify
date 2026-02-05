// context/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Theme, defaultTheme } from "@/types/theme";

interface ThemeContextType {
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};

interface ThemeProviderProps {
    theme?: Theme;
    children: React.ReactNode;
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
    useEffect(() => {
        // Apply theme colors as CSS variables
        const root = document.documentElement;
        const colors = theme.colors;

        root.style.setProperty("--color-primary", colors.primary);
        root.style.setProperty("--color-primary-dark", colors.primaryDark);
        root.style.setProperty("--color-primary-light", colors.primaryLight);

        root.style.setProperty("--color-background", colors.background);
        root.style.setProperty("--color-background-alt", colors.backgroundAlt);
        root.style.setProperty("--color-background-light", colors.backgroundLight);

        root.style.setProperty("--color-text", colors.text);
        root.style.setProperty("--color-text-light", colors.textLight);
        root.style.setProperty("--color-text-dark", colors.textDark);

        root.style.setProperty("--color-accent", colors.accent);
        root.style.setProperty("--color-success", colors.success);
        root.style.setProperty("--color-warning", colors.warning);
        root.style.setProperty("--color-error", colors.error);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
}
