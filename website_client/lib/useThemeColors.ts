// lib/useThemeColors.ts
// Utility hook to get theme color CSS variables for inline styles

export function useThemeColors() {
  return {
    // Primary colors
    primary: "var(--color-primary)",
    primaryDark: "var(--color-primary-dark)",
    primaryLight: "var(--color-primary-light)",
    
    // Background colors
    background: "var(--color-background)",
    backgroundAlt: "var(--color-background-alt)",
    backgroundLight: "var(--color-background-light)",
    
    // Text colors
    text: "var(--color-text)",
    textLight: "var(--color-text-light)",
    textDark: "var(--color-text-dark)",
    
    // Accent colors
    accent: "var(--color-accent)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
  };
}

// Helper to create inline style objects with theme colors
export function themeColor(colorVar: string) {
  return `var(--color-${colorVar})`;
}
