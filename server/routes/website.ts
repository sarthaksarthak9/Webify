import { Router } from 'express';
import { body, query } from 'express-validator';
import {
    generateWebsite,
    getWebsites,
    getWebsiteBySlug,
    updateWebsite,
    deleteWebsite,
    getPublicWebsite,
} from '../controllers/websiteController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

// Validation helper for theme colors
const validateThemeColors = () => [
    body('theme.name').notEmpty().withMessage('Theme name is required'),
    body('theme.colors.primary').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Primary color must be valid hex color'),
    body('theme.colors.primaryDark').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Primary dark color must be valid hex color'),
    body('theme.colors.primaryLight').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Primary light color must be valid hex color'),
    body('theme.colors.background').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Background color must be valid hex color'),
    body('theme.colors.backgroundAlt').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Background alt color must be valid hex color'),
    body('theme.colors.backgroundLight').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Background light color must be valid hex color'),
    body('theme.colors.text').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Text color must be valid hex color'),
    body('theme.colors.textLight').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Text light color must be valid hex color'),
    body('theme.colors.textDark').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Text dark color must be valid hex color'),
    body('theme.colors.accent').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Accent color must be valid hex color'),
    body('theme.colors.success').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Success color must be valid hex color'),
    body('theme.colors.warning').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Warning color must be valid hex color'),
    body('theme.colors.error').matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Error color must be valid hex color'),
];

/**
 * @route   POST /api/websites/generate
 * @desc    Generate website from Tambo AI data
 * @access  Private
 */
router.post(
    '/generate',
    authenticate,
    [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Title must be at least 1 character'),
        body('description')
            .optional()
            .trim(),
        ...validateThemeColors(),
        body('sections')
            .optional()
            .isArray()
            .withMessage('Sections must be an array'),
        body('sections.*.type')
            .optional()
            .isIn(['navbar', 'hero', 'features', 'gallery', 'about', 'contact', 'testimonials', 'cta', 'footer'])
            .withMessage('Invalid section type'),
        body('sections.*.title')
            .optional()
            .notEmpty()
            .withMessage('Section title is required'),
        body('sections.*.order')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Section order must be a positive number'),
    ],
    validate,
    generateWebsite
);

/**
 * @route   GET /api/websites
 * @desc    Get all websites for user (with pagination and filtering)
 * @access  Private
 */
router.get(
    '/',
    authenticate,
    [
        query('status')
            .optional()
            .isIn(['draft', 'published', 'archived'])
            .withMessage('Invalid status filter'),
        query('page')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Page must be a positive integer'),
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),
    ],
    validate,
    getWebsites
);

/**
 * @route   GET /api/websites/:slug
 * @desc    Get single website by slug
 * @access  Private
 */
router.get(
    '/:slug',
    authenticate,
    getWebsiteBySlug
);

/**
 * @route   PUT /api/websites/:slug
 * @desc    Update website
 * @access  Private
 */
router.put(
    '/:slug',
    authenticate,
    [
        body('title')
            .optional()
            .trim()
            .isLength({ min: 1 })
            .withMessage('Title must be at least 1 character'),
        body('description')
            .optional()
            .trim(),
        body('status')
            .optional()
            .isIn(['draft', 'published', 'archived'])
            .withMessage('Invalid status'),
        body('deploymentUrl')
            .optional()
            .trim(),
    ],
    validate,
    updateWebsite
);

/**
 * @route   DELETE /api/websites/:slug
 * @desc    Delete website
 * @access  Private
 */
router.delete(
    '/:slug',
    authenticate,
    deleteWebsite
);

export default router;
