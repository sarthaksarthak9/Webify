// EXAMPLE: How to use dynamic colors in your backend JSON

// Example 1: Default theme (current green design)
const pageDataDefault = {
  theme: {
    name: "Tech Green",
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
  },
  sections: [
    {
      type: "Hero",
      props: {
        title: "AI Website Builder",
        subtitle: "Build websites using simple prompts",
      },
    },
    // ... more sections
  ],
};

// Example 2: Blue theme
const pageDataBlue = {
  theme: {
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
  },
  sections: [
    // ... same sections, different colors!
  ],
};

// Example 3: Purple theme
const pageDataPurple = {
  theme: {
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
  },
  sections: [
    // ... same sections
  ],
};

// Example 4: Dark Red theme
const pageDataRed = {
  theme: {
    name: "Dark Red",
    colors: {
      primary: "#EF4444",
      primaryDark: "#DC2626",
      primaryLight: "#F87171",
      background: "#1F1F1F",
      backgroundAlt: "#0A0A0A",
      backgroundLight: "#FFFFFF",
      text: "#FFFFFF",
      textLight: "#A3A3A3",
      textDark: "#1F1F1F",
      accent: "#EF4444",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#DC2626",
    },
  },
  sections: [
    // ... same sections
  ],
};

/*
 * HOW IT WORKS:
 * 
 * 1. Backend sends the JSON with theme + sections
 * 2. Frontend receives it and passes theme to ThemeProvider
 * 3. ThemeProvider sets CSS variables
 * 4. All components automatically use the new colors!
 * 
 * NO COMPONENT CHANGES NEEDED - colors update automatically via CSS variables
 */
