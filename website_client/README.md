# Webify Website Client

A Next.js 16 application that dynamically renders websites based on JSON data fetched from a backend API. Part of the Webify AI Website Builder platform.

## 🎯 Overview

The **website_client** is the rendering engine for Webify. It receives structured JSON data (sections + theme) from the backend and renders beautiful, responsive websites using a component-based architecture.

### Key Features

- **🎨 Dynamic Theming**: CSS variable-based theming system that adapts to any color scheme
- **🧩 Component-Based**: 9 reusable, customizable UI components
- **⚡ Server-Side Rendering**: Next.js App Router with dynamic routes
- **🔒 Type-Safe**: Full TypeScript support with strict typing
- **📱 Responsive**: Mobile-first design with Tailwind CSS
- **🎭 Animations**: Smooth transitions using Framer Motion

## 🏗️ Architecture

```
website_client/
├── app/
│   ├── [slug]/          # Dynamic routes for user websites
│   │   └── page.tsx     # Fetches data from backend API
│   ├── page.tsx         # Static demo page
│   └── layout.tsx       # Root layout with theme provider
├── components/          # 9 reusable UI components
│   ├── NavBar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── Gallery.tsx
│   ├── Testinomials.tsx
│   ├── Contact.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── context/
│   └── ThemeContext.tsx # Theme provider with CSS variables
├── renderer/
│   ├── componentMap.ts  # Maps section types to components
│   └── renderSections.tsx
├── types/
│   ├── page.ts          # Page & Section types
│   └── theme.ts         # Theme type definitions
└── lib/
    └── utils.ts         # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (default: `http://localhost:4000`)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Development

```bash
# Start development server
npm run dev
```

Visit:
- `http://localhost:3000` - Static demo page
- `http://localhost:3000/[slug]` - Dynamic page (fetches from backend)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔌 API Integration

The website_client fetches data from your backend API:

**Endpoint:** `GET /api/pages/:slug`

**Expected Response:**
```json
{
  "pageId": "unique-id",
  "slug": "my-website",
  "title": "My Website",
  "description": "Website description",
  "theme": {
    "colors": {
      "primary": "#4ADE80",
      "background": "#1B243F",
      "text": "#FFFFFF"
    }
  },
  "sections": [
    {
      "type": "Hero",
      "props": {
        "title": "Welcome",
        "subtitle": "Build with AI"
      }
    }
  ]
}
```

See `COMPLETE_JSON_EXAMPLE.json` for a full example.

## 🎨 Available Components

| Component | Description |
|-----------|-------------|
| **NavBar** | Navigation bar with logo and links |
| **Hero** | Hero section with title, subtitle, and CTA |
| **About** | About section with image and description |
| **Features** | Feature cards with images and bullet points |
| **Gallery** | Image gallery grid |
| **Testimonials** | Customer testimonials carousel |
| **Contact** | Contact form with terminal animation |
| **CTA** | Call-to-action section |
| **Footer** | Footer with social links |

## 🎨 Theming System

The app uses a dynamic theming system with CSS variables:

```typescript
const customTheme: Theme = {
  colors: {
    primary: "#4ADE80",
    background: "#1B243F",
    text: "#FFFFFF"
    // ... more colors
  }
};
```

Themes can be:
1. Provided by the backend API
2. Defined statically in code
3. Mixed (backend overrides defaults)

See `DYNAMIC_THEMING_GUIDE.md.resolved` for details.

## 📚 Documentation

- **`3_CLIENT_ARCHITECTURE.md.resolved`** - Detailed architecture overview
- **`HOW_DATA_FETCHING_WORKS.md.resolved`** - Data fetching flow
- **`DYNAMIC_THEMING_GUIDE.md.resolved`** - Theming system guide
- **`COMPLETE_FLOW_GUIDE.md.resolved`** - End-to-end flow
- **`COMPLETE_JSON_EXAMPLE.json`** - Full JSON example
- **`THEME_EXAMPLES.js`** - Theme presets

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:4000` |

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` → Your production backend URL

### Docker

```bash
# Build image
docker build -t webify-client .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.webify.com webify-client
```

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build test
npm run build
```

## 📝 License

Part of the Webify platform.

## 🤝 Contributing

This is a client application for the Webify platform. For the complete system, you'll also need:
- **main_client** - User interface for creating websites
- **backend** - API server with AI integration
