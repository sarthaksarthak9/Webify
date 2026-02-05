// types/theme.ts
// Theme configuration types for dynamic color system

export interface ThemeColors {
  // Primary brand colors
  primary: string;        // Main brand color (e.g., #4ADE80)
  primaryDark: string;    // Darker variant
  primaryLight: string;   // Lighter variant
  
  // Background colors
  background: string;     // Main background (e.g., #1B243F)
  backgroundAlt: string;  // Alternative background
  backgroundLight: string; // Light background (e.g., white)
  
  // Text colors
  text: string;           // Primary text color
  textLight: string;      // Light/muted text
  textDark: string;       // Dark text (for light backgrounds)
  
  // Accent colors
  accent: string;         // Accent color
  success: string;        // Success state
  warning: string;        // Warning state
  error: string;          // Error state
}

export interface Theme {
  colors: ThemeColors;
  name?: string;
}

// Default theme (current design)
export const defaultTheme: Theme = {
  name: "Default Tech Green",
  colors: {
    primary: "#4ADE80",
    primaryDark: "#22C55E",
    primaryLight: "#86EFAC",
    
    background: "#1B243F",
    backgroundAlt: "#0F172A",
    backgroundLight: "#FFFFFF",
    
    text: "#FFFFFF",
    textLight: "#9CA3AF",
    textDark: "#1B243F",
    
    accent: "#4ADE80",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};

// Example alternative themes
export const blueTheme: Theme = {
  name: "Ocean Blue",
  colors: {
    primary: "#3B82F6",
    primaryDark: "#2563EB",
    primaryLight: "#60A5FA",
    
    background: "#1E293B",
    backgroundAlt: "#0F172A",
    backgroundLight: "#FFFFFF",
    
    text: "#FFFFFF",
    textLight: "#94A3B8",
    textDark: "#1E293B",
    
    accent: "#3B82F6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};

export const purpleTheme: Theme = {
  name: "Royal Purple",
  colors: {
    primary: "#A855F7",
    primaryDark: "#9333EA",
    primaryLight: "#C084FC",
    
    background: "#2D1B4E",
    backgroundAlt: "#1E1433",
    backgroundLight: "#FFFFFF",
    
    text: "#FFFFFF",
    textLight: "#C4B5FD",
    textDark: "#2D1B4E",
    
    accent: "#A855F7",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};
