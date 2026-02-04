# Webify

This repository contains the source code for the Webify platform. It is organized into the following components:

- **admin_client**: Admin dashboard (Next.js)
- **main_client**: Main application (Next.js)
- **website_client**: Public website (Next.js)
- **server**: Backend server (Express/Node.js)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

Navigate to each folder and install dependencies:

```bash
cd admin_client && npm install
cd ../main_client && npm install
cd ../website_client && npm install
cd ../server && npm install
```

## Running the Projects

### Server

Run the backend server in development mode:

```bash
cd server
npm run dev
```

### Admin Client

Run the admin dashboard:

```bash
cd admin_client
npm run dev
```

### Main Client

Run the main application:

```bash
cd main_client
npm run dev
```

### Website Client

Run the public website:

```bash
cd website_client
npm run dev
```

## Building for Production

To build the projects for production:

**Server:**
```bash
cd server
npm run build
npm start
```

**Clients:**
```bash
cd [client_folder]
npm run build
npm start
```
