import { Request, Response, NextFunction } from 'express';
import { Website } from '../db/models/Website';
import { AppError } from '../middleware/errorHandler';

/**
 * @route   POST /api/websites/generate
 * @desc    Create website from Tambo-generated data
 * @access  Private
 */
export const generateWebsite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, description, theme, sections } = req.body;
        const userId = req.user.userId;

        // Create website with auto-generated pageId and slug
        const website = await Website.create({
            userId,
            title,
            description,
            theme,
            sections: sections || [],
            status: 'draft',
        });

        res.status(201).json({
            success: true,
            message: 'Website generated successfully',
            data: {
                pageId: website.pageId,
                slug: website.slug,
                title: website.title,
                description: website.description,
                theme: website.theme,
                sections: website.sections,
                status: website.status,
                createdAt: website.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/websites
 * @desc    Get all websites for authenticated user
 * @access  Private
 */
export const getWebsites = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.userId;
        const { status, page = 1, limit = 10 } = req.query;

        // Build query
        const query: any = { userId };
        if (status && ['draft', 'published', 'archived'].includes(status as string)) {
            query.status = status;
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Website.countDocuments(query);

        // Fetch websites
        const websites = await Website.find(query)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            data: {
                websites: websites.map((website) => ({
                    pageId: website.pageId,
                    slug: website.slug,
                    title: website.title,
                    description: website.description,
                    theme: website.theme,
                    status: website.status,
                    deploymentUrl: website.deploymentUrl,
                    createdAt: website.createdAt,
                    updatedAt: website.updatedAt,
                })),
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    totalPages: Math.ceil(total / Number(limit)),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/websites/:slug
 * @desc    Get single website by slug (authenticated - owner only)
 * @access  Private
 */
export const getWebsiteBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { slug } = req.params;
        const userId = req.user.userId;

        const website = await Website.findOne({ slug, userId });

        if (!website) {
            throw new AppError('Website not found', 404);
        }

        res.status(200).json({
            success: true,
            data: {
                pageId: website.pageId,
                userId: website.userId,
                slug: website.slug,
                title: website.title,
                description: website.description,
                theme: website.theme,
                sections: website.sections,
                status: website.status,
                deploymentUrl: website.deploymentUrl,
                createdAt: website.createdAt,
                updatedAt: website.updatedAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/websites/:slug
 * @desc    Update website
 * @access  Private
 */
export const updateWebsite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { slug } = req.params;
        const userId = req.user.userId;
        const { title, description, theme, sections, status, deploymentUrl } = req.body;

        // Find website
        const website = await Website.findOne({ slug, userId });

        if (!website) {
            throw new AppError('Website not found', 404);
        }

        // Update fields
        if (title !== undefined) website.title = title;
        if (description !== undefined) website.description = description;
        if (theme !== undefined) website.theme = theme;
        if (sections !== undefined) website.sections = sections;
        if (status !== undefined) website.status = status;
        if (deploymentUrl !== undefined) website.deploymentUrl = deploymentUrl;

        await website.save();

        res.status(200).json({
            success: true,
            message: 'Website updated successfully',
            data: {
                pageId: website.pageId,
                slug: website.slug,
                title: website.title,
                description: website.description,
                theme: website.theme,
                sections: website.sections,
                status: website.status,
                deploymentUrl: website.deploymentUrl,
                updatedAt: website.updatedAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/websites/:slug
 * @desc    Delete website
 * @access  Private
 */
export const deleteWebsite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { slug } = req.params;
        const userId = req.user.userId;

        const website = await Website.findOneAndDelete({ slug, userId });

        if (!website) {
            throw new AppError('Website not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'Website deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/pages/:slug
 * @desc    Get website for public rendering (no auth required)
 * @access  Public
 */
export const getPublicWebsite = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { slug } = req.params;

        // In development, allow draft websites for testing
        // In production, only show published websites
        const query: any = { slug };
        if (process.env.NODE_ENV === 'production') {
            query.status = 'published';
        }

        console.log('🔍 Searching for website with query:', query);
        const website = await Website.findOne(query);
        console.log('📊 Found website:', website ? `Yes (${website.title})` : 'No');

        if (!website) {
            // Debug: List all websites to see what slugs exist
            const allWebsites = await Website.find({}, 'slug title').limit(10);
            console.log('📋 All website slugs in DB:', allWebsites.map(w => `"${w.slug}"`));
            throw new AppError('Website not found', 404);
        }

        res.status(200).json({
            pageId: website.pageId,
            slug: website.slug,
            title: website.title,
            description: website.description,
            theme: website.theme,
            sections: website.sections,
        });
    } catch (error) {
        next(error);
    }
};
