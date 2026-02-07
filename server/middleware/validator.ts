import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

/**
 * Middleware to check validation results
 * Use this after express-validator validation chains
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Format validation errors
        const formattedErrors = errors.array().reduce((acc: any, error: ValidationError) => {
            if (error.type === 'field') {
                acc[error.path] = error.msg;
            }
            return acc;
        }, {});

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: formattedErrors,
        });
    }

    next();
};
