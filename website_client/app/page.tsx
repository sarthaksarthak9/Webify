// app/page.tsx

import { renderSections } from "@/renderer/renderSections";
import { Page } from "@/types/page";

// DYNAMIC THEMING: 
// To use a custom theme, add a "theme" property to pageData
// Example:
// import { blueTheme, purpleTheme } from "@/types/theme";
// const pageData: Page = {
//   theme: blueTheme,  // or purpleTheme, or custom theme from backend
//   sections: [...]
// };

const pageData: Page = {
  sections: [
    {
      type: "NavBar",
      content: {
        logoText: "AI Builder",
        links: [
          { label: "Home", href: "#" },
          { label: "Contact", href: "#contact" },
        ],
      },
    },
    {
      type: "Hero",
      content: {
        title: "AI Website Builder",
        subtitle: "Build websites using simple prompts",
        ctaText: "Get Started",
      },
    },
    {
      type: "About",
      content: {
        heading: "What We Do",
        description:
          "We help users build websites using AI-generated structures combined with a powerful visual editor.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
      },
    },
    {
      type: "Features",
      content: {
        heading: "Our Approach",
        items: [
          {
            title: "Optimize Office Relocations and Measurable Human Impact",
            bullets: [
              "Calculate the commutes from key executives to team members",
              "Identify the best office location for the entire workforce",
              "Accurate and efficient analysis that reduces expenses and maximizes savings during company relocations",
              "Deliver measurable results on sustainability and employee experience",
            ],
            imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
          },
          {
            title: "Enhance Employee Incentives & Initiatives",
            bullets: [
              "Sustainable Mobility Allowance and transport subsidies",
              "Support Remote Work programs",
              "Encourage all forms of transport: walking, car, bike, metro, bus",
            ],
            imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
          },
          {
            title: "Boost Employee Satisfaction & Retention",
            bullets: [
              "Improve daily commute comfort",
              "Reduce stress, promote well-being",
              "Increase loyalty and long-term talent retention",
            ],
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
          },
        ],
      },
    },
    {
      type: "Gallery",
      content: {
        heading: "Our Work",
        images: [
          {
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
            alt: "Collaborative Workspace",
          },
          {
            src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop",
            alt: "Modern Office",
          },
          {
            src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
            alt: "Team Meeting",
          },
          {
            src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop",
            alt: "Office Interior",
          },
        ],
      },
    },
    {
      type: "Testimonials",
      content: {
        heading: "Loved by Users",
        items: [
          {
            name: "Aman Sharma",
            role: "Startup Founder",
            message:
              "This platform helped us launch our website in minutes.",
          },
          {
            name: "Priya Verma",
            role: "Designer",
            message:
              "The CMS is super easy to use and very flexible.",
          },
          {
            name: "Rahul Mehta",
            role: "Developer",
            message:
              "AI + structured components is a powerful combo.",
          },
        ],
      },
    },
    {
      type: "Contact",
      content: {
        heading: "Get in Touch",
        email: "hello@aibuilder.com",
        phone: "+91 98765 43210",
        address: "Mumbai, India",
      },
    },
    {
      type: "CTA",
      content: {
        heading: "Ready to build your website?",
        subheading: "Start creating your site using AI in minutes.",
        buttonText: "Start Now",
      },
    }, {
      type: "Footer",
      content: {
        text: "© 2026 AI Website Builder. All rights reserved.",
      },
    },
  ],
};


export default function HomePage() {
  return (
    <main>
      {renderSections({ sections: pageData.sections })}
    </main>
  );
}
