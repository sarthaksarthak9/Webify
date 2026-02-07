import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class
 */
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
    next(error);
};

/**
 * Global error handler
 */
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Development error response (detailed)
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            statusCode: err.statusCode,
            stack: err.stack,
            details: err,
        });
    }
    // Production error response (minimal)
    else {
        // Don't leak error details in production
        const message = err.isOperational ? err.message : 'Something went wrong';

        res.status(err.statusCode).json({
            success: false,
            error: message,
        });
    }
};
