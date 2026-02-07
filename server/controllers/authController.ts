import { Request, Response, NextFunction } from 'express';
import User from '../db/models/User';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        // Create new user
        const user = await User.create({
            email,
            password,
            name,
        });

        // Generate JWT token
        const token = generateToken({
            userId: user.userId,
            email: user.email,
        });

        // Send response
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                userId: user.userId,
                email: user.email,
                name: user.name,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return token
 * @access  Public
 */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        // Find user by email (include password field)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new AppError('Invalid credentials', 401);
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.userId,
            email: user.email,
        });

        // Send response
        res.status(200).json({
            success: true,
            data: {
                userId: user.userId,
                email: user.email,
                name: user.name,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // User is already attached to req by auth middleware
        const user = req.user;

        res.status(200).json({
            success: true,
            data: {
                userId: user.userId,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, avatar } = req.body;

        // Find and update user
        const user = await User.findOneAndUpdate(
            { userId: req.user.userId },
            { name, avatar },
            { new: true, runValidators: true }
        );

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                userId: user.userId,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        next(error);
    }
};
