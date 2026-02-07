import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, getProfile, updateProfile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 1 })
            .withMessage('Name cannot be empty'),
    ],
    validate,
    signup
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return token
 * @access  Public
 */
router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address')
            .normalizeEmail(),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
    ],
    validate,
    login
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
    '/profile',
    authenticate,
    [
        body('name')
            .optional()
            .trim()
            .isLength({ min: 1 })
            .withMessage('Name cannot be empty'),
        body('avatar')
            .optional()
            .isURL()
            .withMessage('Avatar must be a valid URL'),
    ],
    validate,
    updateProfile
);

export default router;
