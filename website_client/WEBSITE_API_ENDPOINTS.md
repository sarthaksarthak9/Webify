# Website Client API Endpoints

This document outlines the required API endpoints for the Webify public website client (single-page websites).

---

## 🌐 Get Website Data

### GET `/api/websites/:slug`
**Description:** Get complete website data by slug (includes all sections for single-page rendering)  
**Status:** 🔨 To be implemented

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "web_1",
    "name": "Tech Startup",
    "slug": "tech-startup",
    "metadata": {
      "title": "Tech Startup - Innovation at Scale",
      "description": "Leading technology solutions",
      "keywords": ["tech", "startup", "innovation"],
      "favicon": "/favicon.ico",
      "ogImage": "/og-image.jpg"
    },
    "theme": {
      "primaryColor": "#3B82F6",
      "secondaryColor": "#10B981",
      "accentColor": "#F59E0B",
      "fontFamily": "Inter",
      "headingFont": "Poppins",
      "borderRadius": "8px",
      "spacing": "normal",
      "mode": "light"
    },
    "navigation": {
      "logo": {
        "text": "TechStart",
        "image": "/logo.png"
      },
      "links": [
        { "label": "Home", "href": "#home", "order": 1 },
        { "label": "About", "href": "#about", "order": 2 },
        { "label": "Services", "href": "#services", "order": 3 },
        { "label": "Contact", "href": "#contact", "order": 4 }
      ]
    },
    "footer": {
      "copyright": "© 2026 Tech Startup. All rights reserved.",
      "socialLinks": [
        { "platform": "twitter", "url": "https://twitter.com/techstartup" },
        { "platform": "linkedin", "url": "https://linkedin.com/company/techstartup" }
      ],
      "links": [
        { "label": "Privacy Policy", "href": "/privacy" },
        { "label": "Terms of Service", "href": "/terms" }
      ]
    },
    "sections": [
      {
        "id": "section_1",
        "type": "hero",
        "order": 1,
        "visible": true,
        "content": {
          "heading": "Welcome to Innovation",
          "subheading": "Building the future, one solution at a time",
          "ctaText": "Get Started",
          "ctaLink": "#contact",
          "backgroundImage": "/images/hero-bg.jpg",
          "alignment": "center"
        },
        "styling": {
          "backgroundColor": "#1F2937",
          "textColor": "#FFFFFF",
          "padding": "large",
          "height": "screen"
        }
      },
      {
        "id": "section_2",
        "type": "features",
        "order": 2,
        "visible": true,
        "content": {
          "title": "Our Features",
          "subtitle": "What makes us different",
          "features": [
            {
              "id": "feature_1",
              "icon": "rocket",
              "title": "Fast Performance",
              "description": "Lightning fast load times and smooth interactions"
            },
            {
              "id": "feature_2",
              "icon": "shield",
              "title": "Secure",
              "description": "Enterprise-grade security for your peace of mind"
            },
            {
              "id": "feature_3",
              "icon": "chart",
              "title": "Scalable",
              "description": "Grows with your business needs"
            }
          ],
          "layout": "grid",
          "columns": 3
        },
        "styling": {
          "backgroundColor": "#FFFFFF",
          "textColor": "#1F2937",
          "padding": "large"
        }
      },
      {
        "id": "section_3",
        "type": "about",
        "order": 3,
        "visible": true,
        "content": {
          "heading": "About Us",
          "text": "We are a team of passionate innovators dedicated to creating cutting-edge solutions.",
          "image": "/images/about.jpg",
          "imagePosition": "right",
          "stats": [
            { "label": "Years Experience", "value": "10+" },
            { "label": "Happy Clients", "value": "500+" },
            { "label": "Projects Completed", "value": "1000+" }
          ]
        },
        "styling": {
          "backgroundColor": "#F9FAFB",
          "textColor": "#1F2937",
          "padding": "large"
        }
      },
      {
        "id": "section_4",
        "type": "testimonials",
        "order": 4,
        "visible": true,
        "content": {
          "title": "What Our Clients Say",
          "testimonials": [
            {
              "id": "test_1",
              "name": "John Doe",
              "role": "CEO, TechCorp",
              "avatar": "/avatars/john.jpg",
              "rating": 5,
              "text": "Amazing service! Highly recommended."
            },
            {
              "id": "test_2",
              "name": "Jane Smith",
              "role": "Founder, StartupXYZ",
              "avatar": "/avatars/jane.jpg",
              "rating": 5,
              "text": "They transformed our vision into reality."
            }
          ],
          "layout": "carousel"
        },
        "styling": {
          "backgroundColor": "#FFFFFF",
          "textColor": "#1F2937",
          "padding": "large"
        }
      },
      {
        "id": "section_5",
        "type": "cta",
        "order": 5,
        "visible": true,
        "content": {
          "heading": "Ready to Get Started?",
          "text": "Join hundreds of satisfied customers today",
          "primaryButton": {
            "text": "Start Free Trial",
            "link": "#contact"
          },
          "secondaryButton": {
            "text": "Learn More",
            "link": "#about"
          }
        },
        "styling": {
          "backgroundColor": "#3B82F6",
          "textColor": "#FFFFFF",
          "padding": "large"
        }
      },
      {
        "id": "section_6",
        "type": "contact",
        "order": 6,
        "visible": true,
        "content": {
          "heading": "Get In Touch",
          "subtitle": "We'd love to hear from you",
          "email": "contact@techstartup.com",
          "phone": "+1 (555) 123-4567",
          "address": "123 Tech Street, San Francisco, CA 94105",
          "formFields": [
            { "name": "name", "type": "text", "label": "Name", "required": true },
            { "name": "email", "type": "email", "label": "Email", "required": true },
            { "name": "message", "type": "textarea", "label": "Message", "required": true }
          ],
          "submitText": "Send Message"
        },
        "styling": {
          "backgroundColor": "#F9FAFB",
          "textColor": "#1F2937",
          "padding": "large"
        }
      }
    ]
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Website not found"
}
```

---

## 📝 Notes

- **Single Endpoint Design**: This endpoint returns ALL data needed to render the complete single-page website
- **No Authentication Required**: Public endpoint for website visitors
- **Sections Array**: Contains all page sections in order (hero, features, about, testimonials, cta, contact)
- **Navigation Links**: Use hash anchors (#home, #about, etc.) for smooth scrolling within the single page
- **Theme Data**: Includes complete theming information for dynamic styling
- **Response Format**: Standard `{ success: boolean, data?: any, message?: string }`
- **Caching**: This endpoint should be heavily cached for performance
- **All timestamps in ISO 8601 format (UTC)**
