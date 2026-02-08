// app/demo-themes/page.tsx
// DEMO PAGE: Shows how to use different themes

"use client";

import { renderSections } from "@/renderer/renderSections";
import { Page } from "@/types/page";
import { ThemeProvider } from "@/context/ThemeContext";
import { blueTheme, purpleTheme, defaultTheme } from "@/types/theme";
import { useState } from "react";

const demoSections = [
    {
        type: "Hero",
        content: {
            title: "Theme Demo",
            subtitle: "See how colors change dynamically!",
            ctaText: "Try It Out",
        },
    },
    {
        type: "About",
        content: {
            heading: "Dynamic Theming",
            description: "This page demonstrates how the same components look with different color themes. Click the buttons above to switch themes!",
        },
    },
    {
        type: "CTA",
        content: {
            heading: "Ready to customize?",
            subheading: "Your backend controls all the colors",
            buttonText: "Get Started",
        },
    },
];

export default function DemoThemesPage() {
    const [currentTheme, setCurrentTheme] = useState(defaultTheme);

    return (
        <ThemeProvider theme={currentTheme}>
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <button
                    onClick={() => setCurrentTheme(defaultTheme)}
                    className="px-4 py-2 bg-white text-black rounded-lg shadow-lg hover:scale-105 transition"
                >
                    Green
                </button>
                <button
                    onClick={() => setCurrentTheme(blueTheme)}
                    className="px-4 py-2 bg-white text-black rounded-lg shadow-lg hover:scale-105 transition"
                >
                    Blue
                </button>
                <button
                    onClick={() => setCurrentTheme(purpleTheme)}
                    className="px-4 py-2 bg-white text-black rounded-lg shadow-lg hover:scale-105 transition"
                >
                    Purple
                </button>
            </div>

            <main>
                {renderSections({ sections: demoSections })}
            </main>
        </ThemeProvider>
    );
}
