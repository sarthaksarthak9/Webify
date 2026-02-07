import mongoose, { Schema, Document } from 'mongoose';

// ============================================
// TypeScript Interfaces
// ============================================

export interface ITheme {
    name: string;
    colors: {
        primary: string;
        primaryDark: string;
        primaryLight: string;
        background: string;
        backgroundAlt: string;
        backgroundLight: string;
        text: string;
        textLight: string;
        textDark: string;
        accent: string;
        success: string;
        warning: string;
        error: string;
    };
}

export interface ISection {
    id: string;
    type: string;
    title: string;
    content: Record<string, any>;
    order: number;
    props?: Record<string, any>;
}

export interface IWebsite extends Document {
    pageId: string;
    userId: string;
    slug: string;
    title: string;
    description?: string;
    theme: ITheme;
    sections: ISection[];
    status: 'draft' | 'published' | 'archived';
    deploymentUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IDeployment extends Document {
    deploymentId: string;
    pageId: string;
    userId: string;
    platform: 'vercel' | 'netlify' | 'github-pages';
    status: 'success' | 'failed' | 'in-progress';
    deploymentUrl?: string;
    error?: string;
    createdAt: Date;
    completedAt?: Date;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Validate hex color format (#RRGGBB or #RGB)
 */
const validateHexColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
};

/**
 * Generate URL-safe slug from title
 */
const generateSlug = (title: string): string => {
    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Add random suffix for uniqueness
    const randomSuffix = Math.random().toString(36).substring(2, 11);
    return `${slug}-${randomSuffix}`;
};

/**
 * Generate unique page ID
 */
const generatePageId = (): string => {
    return `page_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Generate unique section ID
 */
const generateSectionId = (): string => {
    return `sect_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Generate unique deployment ID
 */
const generateDeploymentId = (): string => {
    return `deploy_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

// ============================================
// Theme Schema (Embedded)
// ============================================

const themeSchema = new Schema<ITheme>(
    {
        name: {
            type: String,
            required: [true, 'Theme name is required'],
            trim: true,
        },
        colors: {
            primary: {
                type: String,
                required: [true, 'Primary color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Primary color must be a valid hex color (e.g., #FFFFFF)',
                },
            },
            primaryDark: {
                type: String,
                required: [true, 'Primary dark color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Primary dark color must be a valid hex color',
                },
            },
            primaryLight: {
                type: String,
                required: [true, 'Primary light color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Primary light color must be a valid hex color',
                },
            },
            background: {
                type: String,
                required: [true, 'Background color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Background color must be a valid hex color',
                },
            },
            backgroundAlt: {
                type: String,
                required: [true, 'Background alt color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Background alt color must be a valid hex color',
                },
            },
            backgroundLight: {
                type: String,
                required: [true, 'Background light color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Background light color must be a valid hex color',
                },
            },
            text: {
                type: String,
                required: [true, 'Text color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Text color must be a valid hex color',
                },
            },
            textLight: {
                type: String,
                required: [true, 'Text light color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Text light color must be a valid hex color',
                },
            },
            textDark: {
                type: String,
                required: [true, 'Text dark color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Text dark color must be a valid hex color',
                },
            },
            accent: {
                type: String,
                required: [true, 'Accent color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Accent color must be a valid hex color',
                },
            },
            success: {
                type: String,
                required: [true, 'Success color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Success color must be a valid hex color',
                },
            },
            warning: {
                type: String,
                required: [true, 'Warning color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Warning color must be a valid hex color',
                },
            },
            error: {
                type: String,
                required: [true, 'Error color is required'],
                validate: {
                    validator: validateHexColor,
                    message: 'Error color must be a valid hex color',
                },
            },
        },
    },
    { _id: false } // Don't create _id for embedded schema
);

// ============================================
// Section Schema (Embedded)
// ============================================

const sectionSchema = new Schema<ISection>(
    {
        id: {
            type: String,
            required: [true, 'Section ID is required'],
        },
        type: {
            type: String,
            required: [true, 'Section type is required'],
            trim: true,
            enum: {
                values: ['navbar', 'hero', 'features', 'gallery', 'about', 'contact', 'testimonials', 'cta', 'footer'],
                message: 'Invalid section type',
            },
        },
        title: {
            type: String,
            required: [true, 'Section title is required'],
            trim: true,
        },
        content: {
            type: Schema.Types.Mixed,
            required: [true, 'Section content is required'],
        },
        order: {
            type: Number,
            required: [true, 'Section order is required'],
            min: [0, 'Order must be a positive number'],
        },
        props: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    { _id: false } // Don't create _id for embedded schema
);

// Auto-generate section ID if not provided
sectionSchema.pre('validate', function () {
    if (!this.id) {
        this.id = generateSectionId();
    }
});

// ============================================
// Website Schema (Main)
// ============================================

const websiteSchema = new Schema<IWebsite>(
    {
        pageId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        userId: {
            type: String,
            required: [true, 'User ID is required'],
            index: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Website title is required'],
            trim: true,
            minlength: [1, 'Title must be at least 1 character long'],
        },
        description: {
            type: String,
            trim: true,
        },
        theme: {
            type: themeSchema,
            required: [true, 'Theme is required'],
        },
        sections: {
            type: [sectionSchema],
            default: [],
        },
        status: {
            type: String,
            enum: {
                values: ['draft', 'published', 'archived'],
                message: 'Status must be draft, published, or archived',
            },
            default: 'draft',
            index: true,
        },
        deploymentUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Generate unique pageId and slug before validation
websiteSchema.pre('validate', function () {
    if (!this.pageId) {
        this.pageId = generatePageId();
    }
    if (!this.slug) {
        this.slug = generateSlug(this.title);
    }
});

// Compound index for filtering by userId and status
websiteSchema.index({ userId: 1, status: 1 });

// ============================================
// Deployment Schema
// ============================================

const deploymentSchema = new Schema<IDeployment>(
    {
        deploymentId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        pageId: {
            type: String,
            required: [true, 'Page ID is required'],
            index: true,
        },
        userId: {
            type: String,
            required: [true, 'User ID is required'],
            index: true,
        },
        platform: {
            type: String,
            required: [true, 'Deployment platform is required'],
            enum: {
                values: ['vercel', 'netlify', 'github-pages'],
                message: 'Platform must be vercel, netlify, or github-pages',
            },
        },
        status: {
            type: String,
            required: [true, 'Deployment status is required'],
            enum: {
                values: ['success', 'failed', 'in-progress'],
                message: 'Status must be success, failed, or in-progress',
            },
            default: 'in-progress',
        },
        deploymentUrl: {
            type: String,
            trim: true,
        },
        error: {
            type: String,
            trim: true,
        },
        completedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Auto-generate deploymentId before validation
deploymentSchema.pre('validate', function () {
    if (!this.deploymentId) {
        this.deploymentId = generateDeploymentId();
    }
});

// Index for recent deployments
deploymentSchema.index({ pageId: 1, createdAt: -1 });
deploymentSchema.index({ userId: 1, createdAt: -1 });

// ============================================
// Models
// ============================================

const Website = mongoose.model<IWebsite>('Website', websiteSchema);
const Deployment = mongoose.model<IDeployment>('Deployment', deploymentSchema);

export { Website, Deployment };
