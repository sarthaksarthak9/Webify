// app/[slug]/page.tsx
// This is the DYNAMIC version that fetches from backend

import { ThemeProvider } from "@/context/ThemeContext";
import { renderSections } from "@/renderer/renderSections";
import { Page } from "@/types/page";

// ============================================
// BACKEND API CONFIGURATION
// ============================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ============================================
// FETCH PAGE DATA FROM BACKEND
// ============================================
async function getPageData(slug: string): Promise<Page> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/pages/${slug}`, {
            cache: 'no-store', // Always fetch fresh data
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Website not found');
            }
            throw new Error('Failed to fetch website data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default async function WebsitePage({
    params
}: {
    params: { slug: string }
}) {
    // Fetch data using slug from URL
    const pageData = await getPageData(params.slug);

    return (
        <ThemeProvider theme={pageData.theme}>
            <main>
                {renderSections({ sections: pageData.sections })}
            </main>
        </ThemeProvider>
    );
}

// ============================================
// GENERATE METADATA (SEO)
// ============================================
export async function generateMetadata({ params }: { params: { slug: string } }) {
    try {
        const pageData = await getPageData(params.slug);

        return {
            title: pageData.title || 'Website',
            description: pageData.description || 'Generated with AI Website Builder',
        };
    } catch {
        return {
            title: 'Website Not Found',
        };
    }
}

// ============================================
// EXAMPLE USAGE:
// ============================================
// When user visits: https://yoursite.com/gym-site-abc123
//
// 1. Next.js extracts slug: "gym-site-abc123"
// 2. Calls: getPageData("gym-site-abc123")
// 3. Fetches: GET http://localhost:4000/api/pages/gym-site-abc123
// 4. Backend returns JSON with theme + sections
// 5. Page renders with that data!
