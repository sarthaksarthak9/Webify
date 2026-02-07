import { Router } from 'express';
import { getPublicWebsite } from '../controllers/websiteController';

const router = Router();

/**
 * @route   GET /api/pages/:slug
 * @desc    Get published website for public rendering (no auth)
 * @access  Public
 */
router.get('/:slug', getPublicWebsite);

export default router;
