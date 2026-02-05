// data/siteData.ts
// Centralized data file for all configurable content
// This makes it easy to connect to backend/CMS later

export const siteData = {
  // NavBar
  demoButtonText: "Ask for a demo",

  // Hero
  tagline: "Optimizing Efficiency, Well-Being, Sustainability, and Environmental Impact.",

  // Footer
  systemStatusText: "SYSTEM ONLINE",
  socialLinks: [
    { name: "Github", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Discord", href: "#" },
  ],

  // Contact terminal text
  terminal: {
    prompt: "root@webify:~$",
    command: "./initiate_contact.sh",
    loadingText: "Loading contact protocols...",
  },

  // Default fallback images
  defaultImages: {
    about: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop",
    features: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    ],
  },
};

// Type exports for components
export type SocialLink = {
  name: string;
  href: string;
};

export type TerminalConfig = {
  prompt: string;
  command: string;
  loadingText: string;
};
