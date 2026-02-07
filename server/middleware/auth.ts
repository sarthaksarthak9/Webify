import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../db/models/User';
import { AppError } from './errorHandler';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

/**
 * Middleware to protect routes - requires valid JWT token
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from headers
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new AppError('No token provided', 401);
        }

        // Verify token
        const decoded = verifyToken(token);

        // Get user from database (excluding password)
        const user = await User.findOne({ userId: decoded.userId }).select('-password');

        if (!user) {
            throw new AppError('User not found', 401);
        }

        // Attach user to request object
        req.user = user;

        next();
    } catch (error: any) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Authentication failed', 401));
        }
    }
};
