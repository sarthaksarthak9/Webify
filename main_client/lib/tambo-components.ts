import { z } from 'zod';
import type { TamboComponent } from '@tambo-ai/react';
import React from 'react';

/**
 * Component Registry for Tambo AI
 * 
 * These schemas tell Tambo what components are available and what props they accept.
 * Tambo AI uses these to decide which components to render and what data to generate.
 */

// ============================================
// Hero Section
// ============================================
const heroSchema = z.object({
    heading: z.string().nullish().describe('Main headline for the section'),
    subheading: z.string().nullish().describe('Supporting text below the headline'),
    ctaText: z.string().nullish().describe('Call-to-action button text'),
    ctaLink: z.string().nullish().describe('URL or anchor link for the CTA button'),
    backgroundImage: z.string().nullish().describe('Background image URL'),
    alignment: z.string().nullish().describe('Text alignment (left, center, right)'),
});

// ============================================
// Features Section
// ============================================
const featuresSchema = z.object({
    title: z.string().nullish().describe('Section title'),
    subtitle: z.string().nullish().describe('Section subtitle'),
    features: z.array(
        z.object({
            id: z.string().nullish(),
            icon: z.string().nullish().describe('Icon identifier (e.g. rocket, shield, chart)'),
            title: z.string().nullish().describe('Feature title'),
            description: z.string().nullish().describe('Feature description'),
        })
    ).nullish().describe('List of features to display'),
    layout: z.string().nullish().describe('Layout style (grid, list)'),
    columns: z.number().min(2).max(4).default(3).describe('Number of columns for grid layout'),
});

// ============================================
// Gallery Section
// ============================================
const gallerySchema = z.object({
    heading: z.string().nullish().describe('Gallery section heading'),
    subtitle: z.string().nullish().describe('Gallery section subtitle'),
    images: z.array(
        z.object({
            id: z.string().nullish(),
            url: z.string().nullish().describe('Image URL'),
            alt: z.string().nullish().describe('Alt text for accessibility'),
            caption: z.string().nullish().describe('Image caption'),
        })
    ).nullish().describe('List of images to display'),
    layout: z.string().nullish().describe('Gallery layout style (grid, masonry, carousel)'),
    columns: z.number().min(2).max(4).default(3).describe('Number of columns'),
});

// ============================================
// About Section
// ============================================
const aboutSchema = z.object({
    heading: z.string().nullish().describe('About section heading'),
    text: z.string().nullish().describe('About section content text'),
    image: z.string().nullish().describe('About section image'),
    imagePosition: z.string().nullish().describe('Image position relative to text (left, right)'),
    stats: z.array(
        z.object({
            label: z.string().nullish().describe('Statistic label'),
            value: z.string().nullish().describe('Statistic value'),
        })
    ).nullish().describe('Optional statistics to display'),
});

// ============================================
// Contact Section
// ============================================
const contactSchema = z.object({
    heading: z.string().nullish().describe('Contact section heading'),
    subtitle: z.string().nullish().describe('Contact section subtitle'),
    email: z.string().email().nullish().describe('Contact email address'),
    phone: z.string().nullish().describe('Contact phone number'),
    address: z.string().nullish().describe('Physical address'),
    formFields: z.array(
        z.object({
            name: z.string().nullish().describe('Form field name'),
            type: z.string().nullish().describe('Input type (text, email, tel, textarea)'),
            label: z.string().nullish().describe('Field label'),
            required: z.boolean().default(false).describe('Whether field is required'),
        })
    ).nullish().describe('Contact form fields'),
    submitText: z.string().default('Send Message').describe('Submit button text'),
});

// ============================================
// Testimonials Section
// ============================================
const testimonialsSchema = z.object({
    title: z.string().nullish().describe('Testimonials section title'),
    testimonials: z.array(
        z.object({
            id: z.string().nullish(),
            name: z.string().nullish().describe('Client name'),
            role: z.string().nullish().describe('Client role or company'),
            avatar: z.string().nullish().describe('Client avatar image'),
            rating: z.number().min(1).max(5).nullish().describe('Rating out of 5'),
            text: z.string().nullish().describe('Testimonial content'),
        })
    ).nullish().describe('List of testimonials'),
    layout: z.string().nullish().describe('Layout style (grid, carousel)'),
});

// ============================================
// Call to Action Section
// ============================================
const ctaSchema = z.object({
    heading: z.string().nullish().describe('CTA heading'),
    text: z.string().nullish().describe('Supporting text'),
    primaryButton: z.object({
        text: z.string().nullish().describe('Primary button text'),
        link: z.string().nullish().describe('Primary button link'),
    }).nullish().describe('Primary call-to-action button'),
    secondaryButton: z.object({
        text: z.string().nullish().describe('Secondary button text'),
        link: z.string().nullish().describe('Secondary button link'),
    }).nullish().describe('Optional secondary button'),
});

// ============================================
// Footer Section
// ============================================
const footerSchema = z.object({
    logo: z.string().nullish().describe('Logo text or image URL'),
    description: z.string().nullish().describe('Footer description'),
    links: z.array(
        z.object({
            id: z.string().nullish(),
            label: z.string().nullish().describe('Link label'),
            url: z.string().nullish().describe('Link URL'),
        })
    ).nullish().describe('Footer navigation links'),
    social: z.array(
        z.object({
            id: z.string().nullish(),
            platform: z.string().nullish().describe('Social platform (twitter, facebook, instagram, etc)'),
            url: z.string().nullish().describe('Social profile URL'),
        })
    ).nullish().describe('Social media links'),
    copyright: z.string().nullish().describe('Copyright text'),
});

// ============================================
// Component Registry
// ============================================

/**
 * Placeholder component for Tambo AI
 * The actual components live in website_client - this is just for schema registration
 */
const PlaceholderComponent = () => React.createElement('div', null, 'Component rendered in website_client');

/**
 * Components registered with Tambo AI
 * 
 * NOTE: We provide a placeholder component since Tambo requires it,
 * but the actual components live in website_client and are used for rendering.
 * Tambo uses these schemas to understand what components exist and generate appropriate data.
 */
export const tamboComponents: TamboComponent[] = [
    {
        name: 'Hero',
        description: 'Large header section with heading, subheading, and call-to-action button. Perfect for landing pages.',
        propsSchema: heroSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'Features',
        description: 'Grid or list of features with icons, titles, and descriptions. Highlights key benefits or services.',
        propsSchema: featuresSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'Gallery',
        description: 'Image gallery with multiple layout options (grid, masonry, carousel). Showcases photos or portfolio work.',
        propsSchema: gallerySchema,
        component: PlaceholderComponent,
    },
    {
        name: 'About',
        description: 'About section with text, image, and optional statistics. Tells the story or introduces the business.',
        propsSchema: aboutSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'Contact',
        description: 'Contact form with customizable fields plus contact information (email, phone, address).',
        propsSchema: contactSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'Testimonials',
        description: 'Customer testimonials with ratings, photos, and quotes. Builds trust and credibility.',
        propsSchema: testimonialsSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'CTA',
        description: 'Call-to-action section with heading, text, and action buttons. Drives conversions.',
        propsSchema: ctaSchema,
        component: PlaceholderComponent,
    },
    {
        name: 'Footer',
        description: 'Website footer with links, social media, logo, and copyright information.',
        propsSchema: footerSchema,
        component: PlaceholderComponent,
    },
];

// Export schemas for type inference
export type HeroProps = z.infer<typeof heroSchema>;
export type FeaturesProps = z.infer<typeof featuresSchema>;
export type GalleryProps = z.infer<typeof gallerySchema>;
export type AboutProps = z.infer<typeof aboutSchema>;
export type ContactProps = z.infer<typeof contactSchema>;
export type TestimonialsProps = z.infer<typeof testimonialsSchema>;
export type CTAProps = z.infer<typeof ctaSchema>;
export type FooterProps = z.infer<typeof footerSchema>;
