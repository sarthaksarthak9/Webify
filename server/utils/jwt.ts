import jwt from 'jsonwebtoken';

export interface JWTPayload {
    userId: string;
    email: string;
}

/**
 * Generate JWT token
 */
export const generateToken = (payload: JWTPayload): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn: string = process.env.JWT_EXPIRE || '7d';

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, secret) as JWTPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
