# Admin Client API Endpoints

This document outlines the required API endpoint for the Webify Admin Portal.

---

## 🔐 Get Complete Admin Dashboard Data

### GET `/api/admin/dashboard`
**Description:** Get complete admin dashboard data (stats, websites list, settings)  
**Status:** 🔨 To be implemented

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "admin_123",
      "email": "admin@webify.com",
      "name": "Admin User",
      "role": "admin",
      "avatar": "/avatars/admin.jpg"
    },
    "stats": {
      "totalWebsites": 3,
      "publishedWebsites": 3,
      "draftWebsites": 0,
      "totalViews": 1250,
      "totalUsers": 45
    },
    "websites": [
      {
        "id": "web_1",
        "name": "Tech Startup",
        "slug": "tech-startup",
        "status": "published",
        "thumbnail": "/thumbnails/tech-startup.jpg",
        "createdAt": "2026-02-01T10:00:00Z",
        "updatedAt": "2026-02-05T14:30:00Z",
        "views": 450,
        "metadata": {
          "title": "Tech Startup - Innovation at Scale",
          "description": "Leading technology solutions",
          "keywords": ["tech", "startup", "innovation"]
        },
        "theme": {
          "primaryColor": "#3B82F6",
          "secondaryColor": "#10B981",
          "accentColor": "#F59E0B",
          "fontFamily": "Inter",
          "headingFont": "Poppins"
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
                  "description": "Lightning fast load times"
                },
                {
                  "id": "feature_2",
                  "icon": "shield",
                  "title": "Secure",
                  "description": "Enterprise-grade security"
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
              "text": "We are a team of passionate innovators.",
              "image": "/images/about.jpg",
              "imagePosition": "right",
              "stats": [
                { "label": "Years Experience", "value": "10+" },
                { "label": "Happy Clients", "value": "500+" }
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
                  "text": "Amazing service!"
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
              "text": "Join hundreds of satisfied customers",
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
      },
      {
        "id": "web_2",
        "name": "Portfolio Site",
        "slug": "portfolio-site",
        "status": "published",
        "thumbnail": "/thumbnails/portfolio.jpg",
        "createdAt": "2026-01-28T09:00:00Z",
        "updatedAt": "2026-02-04T11:20:00Z",
        "views": 320,
        "metadata": {
          "title": "Portfolio - Creative Works",
          "description": "Showcasing creative projects"
        },
        "theme": {
          "primaryColor": "#EC4899",
          "secondaryColor": "#8B5CF6"
        },
        "sections": []
      },
      {
        "id": "web_3",
        "name": "Restaurant Menu",
        "slug": "restaurant-menu",
        "status": "published",
        "thumbnail": "/thumbnails/restaurant.jpg",
        "createdAt": "2026-01-25T14:00:00Z",
        "updatedAt": "2026-02-02T16:45:00Z",
        "views": 480,
        "metadata": {
          "title": "Delicious Dining",
          "description": "Fine dining experience"
        },
        "theme": {
          "primaryColor": "#F59E0B",
          "secondaryColor": "#EF4444"
        },
        "sections": []
      }
    ],
    "recentActivity": [
      {
        "id": "activity_1",
        "type": "website_created",
        "websiteName": "Tech Startup",
        "websiteSlug": "tech-startup",
        "timestamp": "2026-02-06T10:30:00Z"
      },
      {
        "id": "activity_2",
        "type": "website_published",
        "websiteName": "Portfolio Site",
        "websiteSlug": "portfolio-site",
        "timestamp": "2026-02-05T15:20:00Z"
      },
      {
        "id": "activity_3",
        "type": "website_updated",
        "websiteName": "Restaurant Menu",
        "websiteSlug": "restaurant-menu",
        "timestamp": "2026-02-04T09:10:00Z"
      }
    ],
    "settings": {
      "profile": {
        "name": "Admin User",
        "email": "admin@webify.com",
        "avatar": "/avatars/admin.jpg"
      },
      "preferences": {
        "theme": "dark",
        "language": "en",
        "notifications": {
          "email": true,
          "push": false
        }
      }
    }
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

**Response (403):**
```json
{
  "success": false,
  "message": "Forbidden - Admin access required"
}
```

---

## 🎨 Get Available Section Templates

### GET `/api/admin/section-templates`
**Description:** Get all available section types with their schemas (for "Add Section" feature)  
**Status:** 🔨 To be implemented

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "type": "hero",
        "name": "Hero Section",
        "description": "Large header section with heading, subheading, and CTA button",
        "icon": "🎯",
        "preview": "/templates/hero-preview.jpg",
        "schema": {
          "content": {
            "heading": { "type": "string", "required": true, "label": "Main Heading", "placeholder": "Welcome to our website" },
            "subheading": { "type": "string", "required": false, "label": "Subheading", "placeholder": "Your tagline here" },
            "ctaText": { "type": "string", "required": false, "label": "Button Text", "placeholder": "Get Started" },
            "ctaLink": { "type": "string", "required": false, "label": "Button Link", "placeholder": "#contact" },
            "backgroundImage": { "type": "image", "required": false, "label": "Background Image" },
            "alignment": { "type": "select", "required": true, "label": "Text Alignment", "options": ["left", "center", "right"], "default": "center" }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#1F2937" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#FFFFFF" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" },
            "height": { "type": "select", "required": true, "label": "Section Height", "options": ["auto", "half", "screen"], "default": "screen" }
          }
        }
      },
      {
        "type": "features",
        "name": "Features Section",
        "description": "Grid of features with icons, titles, and descriptions",
        "icon": "⚡",
        "preview": "/templates/features-preview.jpg",
        "schema": {
          "content": {
            "title": { "type": "string", "required": true, "label": "Section Title", "placeholder": "Our Features" },
            "subtitle": { "type": "string", "required": false, "label": "Subtitle", "placeholder": "What makes us different" },
            "features": {
              "type": "array",
              "required": true,
              "label": "Features",
              "minItems": 1,
              "maxItems": 12,
              "itemSchema": {
                "icon": { "type": "select", "required": true, "label": "Icon", "options": ["rocket", "shield", "chart", "star", "heart", "lightning"] },
                "title": { "type": "string", "required": true, "label": "Feature Title" },
                "description": { "type": "string", "required": true, "label": "Description" }
              }
            },
            "layout": { "type": "select", "required": true, "label": "Layout", "options": ["grid", "list"], "default": "grid" },
            "columns": { "type": "select", "required": true, "label": "Columns", "options": [2, 3, 4], "default": 3 }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#FFFFFF" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#1F2937" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      },
      {
        "type": "gallery",
        "name": "Gallery Section",
        "description": "Image gallery with heading and multiple photos",
        "icon": "🖼️",
        "preview": "/templates/gallery-preview.jpg",
        "schema": {
          "content": {
            "heading": { "type": "string", "required": true, "label": "Gallery Heading", "placeholder": "Our Work" },
            "subtitle": { "type": "string", "required": false, "label": "Subtitle" },
            "images": {
              "type": "array",
              "required": true,
              "label": "Gallery Images",
              "minItems": 1,
              "maxItems": 20,
              "itemSchema": {
                "url": { "type": "image", "required": true, "label": "Image" },
                "alt": { "type": "string", "required": true, "label": "Alt Text" },
                "caption": { "type": "string", "required": false, "label": "Caption" }
              }
            },
            "layout": { "type": "select", "required": true, "label": "Layout", "options": ["grid", "masonry", "carousel"], "default": "grid" },
            "columns": { "type": "select", "required": true, "label": "Columns", "options": [2, 3, 4], "default": 3 }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#F9FAFB" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#1F2937" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      },
      {
        "type": "about",
        "name": "About Section",
        "description": "About section with text, image, and stats",
        "icon": "ℹ️",
        "preview": "/templates/about-preview.jpg",
        "schema": {
          "content": {
            "heading": { "type": "string", "required": true, "label": "Heading", "placeholder": "About Us" },
            "text": { "type": "textarea", "required": true, "label": "Description", "placeholder": "Tell your story..." },
            "image": { "type": "image", "required": false, "label": "Image" },
            "imagePosition": { "type": "select", "required": true, "label": "Image Position", "options": ["left", "right"], "default": "right" },
            "stats": {
              "type": "array",
              "required": false,
              "label": "Statistics",
              "minItems": 0,
              "maxItems": 6,
              "itemSchema": {
                "label": { "type": "string", "required": true, "label": "Stat Label" },
                "value": { "type": "string", "required": true, "label": "Stat Value" }
              }
            }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#F9FAFB" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#1F2937" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      },
      {
        "type": "testimonials",
        "name": "Testimonials Section",
        "description": "Customer testimonials with ratings",
        "icon": "💬",
        "preview": "/templates/testimonials-preview.jpg",
        "schema": {
          "content": {
            "title": { "type": "string", "required": true, "label": "Section Title", "placeholder": "What Our Clients Say" },
            "testimonials": {
              "type": "array",
              "required": true,
              "label": "Testimonials",
              "minItems": 1,
              "maxItems": 10,
              "itemSchema": {
                "name": { "type": "string", "required": true, "label": "Client Name" },
                "role": { "type": "string", "required": true, "label": "Role/Company" },
                "avatar": { "type": "image", "required": false, "label": "Avatar Image" },
                "rating": { "type": "number", "required": true, "label": "Rating (1-5)", "min": 1, "max": 5 },
                "text": { "type": "textarea", "required": true, "label": "Testimonial Text" }
              }
            },
            "layout": { "type": "select", "required": true, "label": "Layout", "options": ["grid", "carousel"], "default": "carousel" }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#FFFFFF" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#1F2937" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      },
      {
        "type": "cta",
        "name": "Call to Action",
        "description": "Call to action section with buttons",
        "icon": "🎯",
        "preview": "/templates/cta-preview.jpg",
        "schema": {
          "content": {
            "heading": { "type": "string", "required": true, "label": "Heading", "placeholder": "Ready to Get Started?" },
            "text": { "type": "string", "required": false, "label": "Description" },
            "primaryButton": {
              "type": "object",
              "required": true,
              "label": "Primary Button",
              "schema": {
                "text": { "type": "string", "required": true, "label": "Button Text" },
                "link": { "type": "string", "required": true, "label": "Button Link" }
              }
            },
            "secondaryButton": {
              "type": "object",
              "required": false,
              "label": "Secondary Button",
              "schema": {
                "text": { "type": "string", "required": true, "label": "Button Text" },
                "link": { "type": "string", "required": true, "label": "Button Link" }
              }
            }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#3B82F6" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#FFFFFF" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      },
      {
        "type": "contact",
        "name": "Contact Section",
        "description": "Contact form with contact information",
        "icon": "📧",
        "preview": "/templates/contact-preview.jpg",
        "schema": {
          "content": {
            "heading": { "type": "string", "required": true, "label": "Heading", "placeholder": "Get In Touch" },
            "subtitle": { "type": "string", "required": false, "label": "Subtitle" },
            "email": { "type": "email", "required": false, "label": "Email Address" },
            "phone": { "type": "string", "required": false, "label": "Phone Number" },
            "address": { "type": "string", "required": false, "label": "Address" },
            "formFields": {
              "type": "array",
              "required": true,
              "label": "Form Fields",
              "minItems": 1,
              "maxItems": 10,
              "itemSchema": {
                "name": { "type": "string", "required": true, "label": "Field Name" },
                "type": { "type": "select", "required": true, "label": "Field Type", "options": ["text", "email", "tel", "textarea"] },
                "label": { "type": "string", "required": true, "label": "Field Label" },
                "required": { "type": "boolean", "required": true, "label": "Required Field" }
              }
            },
            "submitText": { "type": "string", "required": true, "label": "Submit Button Text", "default": "Send Message" }
          },
          "styling": {
            "backgroundColor": { "type": "color", "required": true, "label": "Background Color", "default": "#F9FAFB" },
            "textColor": { "type": "color", "required": true, "label": "Text Color", "default": "#1F2937" },
            "padding": { "type": "select", "required": true, "label": "Padding", "options": ["small", "medium", "large", "xlarge"], "default": "large" }
          }
        }
      }
    ]
  }
}
```

---

## 📝 Get Section Data (For Prefill)

### GET `/api/admin/websites/:slug/sections/:sectionId`
**Description:** Get specific section data to prefill the edit form with REAL data from database  
**Status:** 🔨 To be implemented

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Example 1 - Hero Section:**
**Response (200):**
```json
{
  "success": true,
  "data": {
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
  }
}
```

**Example 2 - Gallery Section with Real Images:**
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "section_7",
    "type": "gallery",
    "order": 4,
    "visible": true,
    "content": {
      "heading": "Our Portfolio",
      "subtitle": "Recent projects we're proud of",
      "images": [
        {
          "id": "img_1",
          "url": "/gallery/project-1.jpg",
          "alt": "Modern office interior",
          "caption": "Corporate Office Design"
        },
        {
          "id": "img_2",
          "url": "/gallery/project-2.jpg",
          "alt": "Residential home exterior",
          "caption": "Luxury Home Project"
        },
        {
          "id": "img_3",
          "url": "/gallery/project-3.jpg",
          "alt": "Restaurant interior",
          "caption": "Fine Dining Restaurant"
        },
        {
          "id": "img_4",
          "url": "/gallery/project-4.jpg",
          "alt": "Hotel lobby",
          "caption": "5-Star Hotel Lobby"
        }
      ],
      "layout": "grid",
      "columns": 2
    },
    "styling": {
      "backgroundColor": "#F9FAFB",
      "textColor": "#1F2937",
      "padding": "large"
    }
  }
}
```

**Example 3 - Features Section with Multiple Items:**
**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "section_2",
    "type": "features",
    "order": 2,
    "visible": true,
    "content": {
      "title": "Why Choose Us",
      "subtitle": "We deliver excellence",
      "features": [
        {
          "id": "feat_1",
          "icon": "rocket",
          "title": "Fast Delivery",
          "description": "Get your project completed on time"
        },
        {
          "id": "feat_2",
          "icon": "shield",
          "title": "Secure & Safe",
          "description": "Your data is protected with us"
        },
        {
          "id": "feat_3",
          "icon": "chart",
          "title": "Analytics Driven",
          "description": "Make informed decisions with data"
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
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Section not found"
}
```

---

## ✏️ Update Section Data

### PUT `/api/admin/websites/:slug/sections/:sectionId`
**Description:** Update section content and styling  
**Status:** 🔨 To be implemented

**Headers:**
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": {
    "heading": "Updated Heading",
    "subheading": "Updated subheading text",
    "ctaText": "Click Here",
    "ctaLink": "#contact",
    "backgroundImage": "/images/new-hero-bg.jpg",
    "alignment": "left"
  },
  "styling": {
    "backgroundColor": "#111827",
    "textColor": "#F9FAFB",
    "padding": "xlarge",
    "height": "screen"
  },
  "visible": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Section updated successfully",
  "data": {
    "id": "section_1",
    "type": "hero",
    "order": 1,
    "visible": true,
    "content": {
      "heading": "Updated Heading",
      "subheading": "Updated subheading text",
      "ctaText": "Click Here",
      "ctaLink": "#contact",
      "backgroundImage": "/images/new-hero-bg.jpg",
      "alignment": "left"
    },
    "styling": {
      "backgroundColor": "#111827",
      "textColor": "#F9FAFB",
      "padding": "xlarge",
      "height": "screen"
    },
    "updatedAt": "2026-02-06T17:38:00Z"
  }
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Invalid section data",
  "errors": {
    "content.heading": "Heading is required",
    "styling.backgroundColor": "Invalid color format"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Section not found"
}
```

---

## 📝 Notes

### API Endpoints Summary:
1. **`GET /api/admin/dashboard`** - Returns ALL admin data (stats, websites, sections, settings)
2. **`GET /api/admin/section-templates`** - Returns available section types with schemas (for "Add Section")
3. **`GET /api/admin/websites/:slug/sections/:sectionId`** - Returns specific section with REAL data (for "Edit Section" prefill)
4. **`PUT /api/admin/websites/:slug/sections/:sectionId`** - Updates section content and styling

### Admin Portal Workflow:

**Viewing Websites:**
1. Admin loads dashboard → `GET /api/admin/dashboard`
2. Shows all websites with their sections

**Editing Existing Section:**
1. Admin clicks "Edit" on a section → `GET /api/admin/websites/:slug/sections/:sectionId`
2. Form is prefilled with REAL data from database (e.g., gallery with 4 actual images)
3. Admin makes changes and clicks "Save" → `PUT /api/admin/websites/:slug/sections/:sectionId`
4. Section is updated in database

**Adding New Section:**
1. Admin clicks "Add Section" → `GET /api/admin/section-templates`
2. Shows available templates (hero, features, gallery, etc.) with their schemas
3. Admin selects a template and fills in required fields
4. Admin clicks "Create" → `POST /api/admin/websites/:slug/sections` (to be implemented)

### Important Notes:
- **Authentication Required**: JWT token in Authorization header for all endpoints
- **Real Data**: GET section endpoint returns actual data from database, not templates
- **Schema-Driven Forms**: Use section templates to dynamically generate forms
- **Response Format**: Standard `{ success: boolean, data?: any, message?: string }`
- **Validation**: Update endpoint validates content and styling before saving
- **All timestamps in ISO 8601 format (UTC)**
