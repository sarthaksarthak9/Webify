# Webify Admin Dashboard

A beautiful, Payload CMS-inspired admin dashboard for managing AI-generated websites.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## 🔐 Login Credentials

**Email:** `yash@gmail.com`  
**Password:** `123456`

## ✨ Features

- 🎨 **Beautiful Dark Theme** - Payload CMS-inspired design with glassmorphism
- 🔒 **Authentication** - Secure login with session persistence
- 📊 **Dashboard Overview** - Stats and quick actions
- 🌐 **Website Management** - List, search, and edit websites
- 🎨 **Theme Editor** - Visual color pickers for all theme colors
- 📝 **Section Editor** - Drag-and-drop reordering and property editing
- 💾 **Auto-save** - Unsaved changes detection
- 📱 **Responsive** - Works on all screen sizes

## 📁 Project Structure

```
admin_client/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── editors/         # Section editing components
│   └── ui/              # Reusable UI components
├── context/             # React contexts
├── lib/                 # Utilities and mock data
└── types/              # TypeScript types
```

## 🎯 Usage

### 1. Login
Navigate to the dashboard and login with the credentials above.

### 2. View Websites
Click "Websites" in the sidebar to see all your websites.

### 3. Edit a Website
Click on any website card to open the editor with three tabs:
- **Metadata**: Edit title, slug, and theme colors
- **Sections**: Reorder and edit sections
- **Preview**: View the live website

### 4. Edit Sections
- Drag and drop to reorder sections
- Click "Edit" to modify section properties
- Click "Delete" to remove a section

### 5. Save Changes
Click "Save Changes" when you see the unsaved changes banner.

## 🔌 Backend Integration

Currently using mock data. To connect to the real backend:

1. Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

2. Replace `lib/mockData.ts` with real API calls
3. Update `context/AuthContext.tsx` for real authentication

See the [walkthrough document](../brain/walkthrough.md) for detailed integration instructions.

## 🎨 Design System

### Colors
- Primary: `#3B82F6` (Blue)
- Background: `#0F172A` (Dark Navy)
- Accent: `#8B5CF6` (Purple)

### Components
- `Button` - Multiple variants (primary, secondary, danger, ghost)
- `Input` - Styled input with label and error states
- `Card` - Container with optional glassmorphism effect

## 📦 Dependencies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TailwindCSS 4** - Styling
- **@dnd-kit** - Drag and drop
- **Axios** - HTTP client
- **Zod** - Validation

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Notes

- Authentication is currently hardcoded for development
- Mock data is stored in `lib/mockData.ts`
- All changes are saved to the mock data (not persisted on refresh)
- Preview tab opens the website in a new tab

## 🚀 Next Steps

- [ ] Connect to real backend API
- [ ] Implement live preview in iframe
- [ ] Add section creation functionality
- [ ] Implement image upload
- [ ] Add undo/redo functionality
- [ ] Multi-user support

---

Built with ❤️ using Next.js and TailwindCSS
