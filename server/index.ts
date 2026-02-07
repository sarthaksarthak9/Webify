import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import { connectDB } from './db/connection';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import websiteRoutes from './routes/website';
import pagesRoutes from './routes/pages';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();
const PORT = process.env.PORT || 4000;

// ====================
// Middleware Setup
// ====================

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3001',
    process.env.WEBSITE_URL || 'http://localhost:3002',
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ====================
// Routes
// ====================

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Webify API Server is running!',
        version: '1.0.0',
        environment: process.env.NODE_ENV,
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/pages', pagesRoutes);

// More routes will be added here
// app.use('/api/admin', adminRoutes);

// ====================
// Error Handling
// ====================

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// ====================
// Server Startup
// ====================

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            console.log('=================================');
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
            console.log(`Health check: http://localhost:${PORT}`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection:', err.message);
    console.error(err.stack);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1);
});

// Start the server
startServer();

export default app;
