'use client';

import { useState } from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';

export default function GeneratePage() {
    const { thread } = useTamboThread();
    const { value, setValue, submit, isPending } = useTamboThreadInput();
    const [saveStatus, setSaveStatus] = useState<{
        loading: boolean;
        success: boolean;
        error: string | null;
        data: any;
    }>({ loading: false, success: false, error: null, data: null });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Append instruction to ensure decisive generation + theme component + navbar
        const delimiter = '\n\n________HIDDEN_INSTRUCTIONS________\n\n';
        const enhancedPrompt = `${value}${delimiter}
IMPORTANT INSTRUCTIONS:
1. Generate comprehensive content with realistic placeholders for all fields (address, email, phone, etc)
2. MUST include a NavBar section at the beginning with logo text and navigation links
3. MUST generate a Theme component with the following EXACT structure:
   Component: "Theme"
   Props:
   {
     "primary": "#HEX",        // Main brand color that matches the website purpose
     "primaryDark": "#HEX",    // Darker shade of primary
     "primaryLight": "#HEX",   // Lighter shade of primary  
     "background": "#FFFFFF",  // Main background (usually white)
     "backgroundAlt": "#HEX",  // Alternate background (light gray/tint)
     "backgroundLight": "#HEX", // Even lighter background
     "text": "#HEX",           // Main text color (dark)
     "textLight": "#HEX",      // Light text (for subtle text)
     "textDark": "#HEX",       // Darkest text (for emphasis)
     "accent": "#HEX",         // Accent/highlight color
     "success": "#10B981",     // Success green
     "warning": "#F59E0B",     // Warning orange
     "error": "#EF4444"        // Error red
   }
   Choose colors appropriate for the website type (e.g., warm reds/oranges for restaurants, cool blues for tech, greens for wellness)
4. Do not ask follow-up questions - deliver a complete website
5. CRITICAL: You MUST use a separate Component tool call for EVERY section (Hero, About, Features, etc). 
   - DO NOT output raw JSON, Markdown, or text descriptions of sections. 
   - If you output text instead of a Component, it will NOT be rendered.
   - Generate at least 5-6 sections for a complete page.
6. Make sure to generate the Hero section immediately after the Navbar.
7. CRITICAL: For any 'email' fields in Contact or other sections, you MUST use a valid email format (e.g., 'hello@example.com'). Do NOT use placeholders like 'email@example' or '<email>'.
8. CRITICAL IMAGE INSTRUCTION: 
   - For every 'Features' item, you MUST include an 'imageUrl' property.
   - Use this dynamic URL format for images: "https://image.pollinations.ai/prompt/<description-of-feature>?width=800&height=600&nologo=true"
   - Replace <description-of-feature> with a short, specific 2-3 word description of the feature (e.g., "music-streaming", "live-concert", "equalizer-ui").
   - DO NOT rely on default images. ALWAYS generate a unique URL for each feature.`;
        setValue(enhancedPrompt);
        // Allow state to update before submitting
        setTimeout(() => submit(), 0);
    };

    const handleSaveToDatabase = async () => {
        setSaveStatus({ loading: true, success: false, error: null, data: null });

        try {
            // Get the generated data from the last message
            const lastMessage = thread.messages[thread.messages.length - 1];
            // Extract sections from Tambo messages (exclude Theme - it's metadata, not a section)
            const sections = thread.messages
                .filter((msg: any) => msg.role === 'assistant' && msg.component && msg.component.componentName)
                .filter((msg: any) => msg.component.componentName.toLowerCase() !== 'theme') // Exclude Theme
                .filter((msg: any) => msg.component.componentName.toLowerCase() !== 'theme') // Exclude Theme
                .map((msg: any, index: number) => ({
                    id: `section_${Date.now()}_${index}`,
                    type: msg.component.componentName.toLowerCase(),
                    title: msg.component.componentName,
                    content: msg.component.props || {},
                    order: index,
                }));

            // Deduplicate Sections based on content
            const uniqueSections: any[] = [];
            const seenContent = new Set();

            sections.forEach((section: any) => {
                const contentStr = JSON.stringify(section.content);
                const key = `${section.type}-${contentStr}`;

                if (!seenContent.has(key)) {
                    seenContent.add(key);
                    uniqueSections.push(section);
                }
            });

            // Reorder: NavBar -> Hero -> Others -> Footer
            // First, separate special sections
            const navBar = uniqueSections.find(s => s.type === 'navbar');
            const hero = uniqueSections.find(s => s.type === 'hero');
            const footer = uniqueSections.find(s => s.type === 'footer');

            // Filter out special sections from the main list
            const otherSections = uniqueSections.filter(s =>
                s.type !== 'navbar' &&
                s.type !== 'hero' &&
                s.type !== 'footer'
            );

            // Reconstruct the list in order
            const orderedSections = [];
            if (navBar) orderedSections.push(navBar);
            if (hero) orderedSections.push(hero);
            orderedSections.push(...otherSections);
            if (footer) orderedSections.push(footer);

            // Update sections reference
            const finalSections = orderedSections.map((s, i) => ({ ...s, order: i }));

            // Smart Title Generation
            let generatedTitle = 'Untitled Website';

            // 1. Try to get title from Hero heading
            const heroSection = finalSections.find((s: any) => s.type === 'hero');
            if (heroSection && heroSection.content && heroSection.content.heading) {
                generatedTitle = heroSection.content.heading;
            }
            // 2. Fallback to extracting from prompt
            else if (value) {
                // Remove command words and "enhanced" suffix
                const cleanPrompt = value.split('.')[0] // Take first sentence/part before injected instruction
                    .replace(/create a |make a |generate a |website for |website/gi, '')
                    .trim();

                if (cleanPrompt) {
                    generatedTitle = cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1);
                }
            }

            // Auto-inject NavBar if missing (Tambo doesn't always generate it)
            const hasNavBar = finalSections.some((s: any) => s.type === 'navbar');
            if (!hasNavBar) {
                console.log('🔧 NavBar not found in Tambo response - Auto-injecting NavBar');
                // Create a default NavBar section
                finalSections.unshift({
                    id: `section_navbar_${Date.now()}`,
                    type: 'navbar',
                    title: 'NavBar',
                    content: {
                        logo: generatedTitle,
                        logoText: generatedTitle,
                        links: [
                            { label: 'Home', href: '#hero' },
                            { label: 'About', href: '#about' },
                            { label: 'Contact', href: '#contact' },
                        ],
                        demoButtonText: 'Get Started',
                    },
                    order: 0,
                });
                // Reorder other sections
                finalSections.forEach((section: any, index: number) => {
                    if (section.type !== 'navbar') {
                        section.order = index;
                    }
                });
            } else {
                console.log('✅ NavBar found in Tambo response');
            }

            // ============================================
            // EXTRACT THEME FROM TAMBO AI (NEW APPROACH)
            // ============================================
            const extractThemeFromComponent = () => {
                // Look for Theme component in Tambo's messages
                const themeMessage = thread.messages.find(
                    (msg: any) => msg.role === 'assistant' &&
                        msg.component &&
                        msg.component.componentName &&
                        msg.component.componentName.toLowerCase() === 'theme'
                );

                // If Tambo generated a Theme component, use it directly!
                if (themeMessage?.component?.props) {
                    const colors = themeMessage.component.props;
                    return {
                        name: 'AI Generated Theme',
                        colors: {
                            primary: colors.primary || '#3B82F6',
                            primaryDark: colors.primaryDark || '#1E40AF',
                            primaryLight: colors.primaryLight || '#60A5FA',
                            background: colors.background || '#FFFFFF',
                            backgroundAlt: colors.backgroundAlt || '#F9FAFB',
                            backgroundLight: colors.backgroundLight || '#F3F4F6',
                            text: colors.text || '#1F2937',
                            textLight: colors.textLight || '#6B7280',
                            textDark: colors.textDark || '#111827',
                            accent: colors.accent || '#10B981',
                            success: colors.success || '#10B981',
                            warning: colors.warning || '#F59E0B',
                            error: colors.error || '#EF4444',
                        },
                    };
                }

                // Fallback: Detect website type and use appropriate colors
                const promptLower = value.toLowerCase();

                // Restaurant/Food - Warm colors
                if (promptLower.includes('restaurant') || promptLower.includes('food') ||
                    promptLower.includes('cafe') || promptLower.includes('kitchen')) {
                    return {
                        name: 'Restaurant Theme',
                        colors: {
                            primary: '#DC2626',
                            primaryDark: '#991B1B',
                            primaryLight: '#F87171',
                            background: '#FFFFFF',
                            backgroundAlt: '#FEF2F2',
                            backgroundLight: '#FEE2E2',
                            text: '#1F2937',
                            textLight: '#6B7280',
                            textDark: '#111827',
                            accent: '#F59E0B',
                            success: '#10B981',
                            warning: '#F59E0B',
                            error: '#EF4444',
                        },
                    };
                }

                // Tech/SaaS - Blue/Purple
                if (promptLower.includes('tech') || promptLower.includes('software') ||
                    promptLower.includes('saas') || promptLower.includes('app')) {
                    return {
                        name: 'Tech Theme',
                        colors: {
                            primary: '#3B82F6',
                            primaryDark: '#1E40AF',
                            primaryLight: '#60A5FA',
                            background: '#FFFFFF',
                            backgroundAlt: '#F9FAFB',
                            backgroundLight: '#F3F4F6',
                            text: '#1F2937',
                            textLight: '#6B7280',
                            textDark: '#111827',
                            accent: '#8B5CF6',
                            success: '#10B981',
                            warning: '#F59E0B',
                            error: '#EF4444',
                        },
                    };
                }

                // Health/Wellness - Green
                if (promptLower.includes('health') || promptLower.includes('wellness') ||
                    promptLower.includes('fitness') || promptLower.includes('yoga')) {
                    return {
                        name: 'Wellness Theme',
                        colors: {
                            primary: '#10B981',
                            primaryDark: '#059669',
                            primaryLight: '#34D399',
                            background: '#FFFFFF',
                            backgroundAlt: '#F0FDF4',
                            backgroundLight: '#DCFCE7',
                            text: '#1F2937',
                            textLight: '#6B7280',
                            textDark: '#111827',
                            accent: '#14B8A6',
                            success: '#10B981',
                            warning: '#F59E0B',
                            error: '#EF4444',
                        },
                    };
                }

                // Creative/Design - Purple/Pink
                if (promptLower.includes('creative') || promptLower.includes('design') ||
                    promptLower.includes('art') || promptLower.includes('portfolio')) {
                    return {
                        name: 'Creative Theme',
                        colors: {
                            primary: '#A855F7',
                            primaryDark: '#7C3AED',
                            primaryLight: '#C084FC',
                            background: '#FFFFFF',
                            backgroundAlt: '#FAF5FF',
                            backgroundLight: '#F3E8FF',
                            text: '#1F2937',
                            textLight: '#6B7280',
                            textDark: '#111827',
                            accent: '#EC4899',
                            success: '#10B981',
                            warning: '#F59E0B',
                            error: '#EF4444',
                        },
                    };
                }

                // Default fallback
                return {
                    name: 'Default Theme',
                    colors: {
                        primary: '#3B82F6',
                        primaryDark: '#1E40AF',
                        primaryLight: '#60A5FA',
                        background: '#FFFFFF',
                        backgroundAlt: '#F9FAFB',
                        backgroundLight: '#F3F4F6',
                        text: '#1F2937',
                        textLight: '#6B7280',
                        textDark: '#111827',
                        accent: '#10B981',
                        success: '#10B981',
                        warning: '#F59E0B',
                        error: '#EF4444',
                    },
                };
            };

            const websiteData = {
                title: generatedTitle,
                description: 'Generated by Tambo AI',
                theme: extractThemeFromComponent(),
                sections: finalSections,
            };

            console.log('\n' + '='.repeat(60));
            console.log('🎨 THEME COLORS EXTRACTED:');
            console.log('='.repeat(60));
            console.log('Theme Name:', websiteData.theme.name);
            console.log('Primary Color:', websiteData.theme.colors.primary);
            console.log('Accent Color:', websiteData.theme.colors.accent);
            console.log('Background:', websiteData.theme.colors.background);
            console.log('='.repeat(60));

            console.log('\n' + '='.repeat(60));
            console.log('📋 SECTIONS TO BE SAVED:');
            console.log('='.repeat(60));
            finalSections.forEach((section: any, index: number) => {
                console.log(`${index + 1}. ${section.type.toUpperCase()}`);
            });
            console.log('='.repeat(60));

            console.log('\n' + '='.repeat(60));
            console.log('💾 COMPLETE WEBSITE DATA:');
            console.log('='.repeat(60));
            console.log(JSON.stringify(websiteData, null, 2));
            console.log('='.repeat(60) + '\n');

            // Get auth token from localStorage
            const token = localStorage.getItem('token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(websiteData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to save website');
            }

            const data = await response.json();
            setSaveStatus({ loading: false, success: true, error: null, data: data.data });
        } catch (error: any) {
            setSaveStatus({ loading: false, success: false, error: error.message, data: null });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Generate Website with AI</h1>

                {/* Chat Interface */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="mb-6 h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
                        {thread.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 p-3 rounded-lg ${message.role === 'user'
                                    ? 'bg-blue-100 ml-auto max-w-md'
                                    : 'bg-gray-100 mr-auto max-w-md'
                                    }`}
                            >
                                <div className="font-semibold text-sm mb-1">
                                    {message.role === 'user' ? 'You' : 'Tambo AI'}
                                </div>
                                {(() => {
                                    // CLEAN MESSAGE CONTENT LOGIC
                                    let contentToRender: any = message.content;

                                    // 1. Hide appended instructions from User messages
                                    if (message.role === 'user' && typeof contentToRender === 'string') {
                                        contentToRender = contentToRender.split('________HIDDEN_INSTRUCTIONS________')[0].trim();
                                    }

                                    // 2. Hide raw JSON code blocks from Assistant messages (if any leak through)
                                    if (message.role === 'assistant' && typeof contentToRender === 'string') {
                                        // Remove JSON code blocks that might be raw data dumps
                                        contentToRender = contentToRender.replace(/```json[\s\S]*?```/g, '(Generated Section Data)');
                                    }

                                    return Array.isArray(contentToRender) ? (
                                        contentToRender.map((part, i) =>
                                            part.type === 'text' ? (
                                                <p key={i} className="text-gray-800 whitespace-pre-wrap">
                                                    {part.text}
                                                </p>
                                            ) : null
                                        )
                                    ) : (
                                        <p className="text-gray-800 whitespace-pre-wrap">{String(contentToRender)}</p>
                                    );
                                })()}
                                {message.renderedComponent && (
                                    <div className="mt-2 border-t pt-2">
                                        {message.renderedComponent}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isPending && (
                            <div className="text-gray-500 italic">AI is thinking...</div>
                        )}
                        {!isPending && thread.messages.length > 2 && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                                ✅ Website generation complete! Please review the layout below. If you're happy, click "Save to Database" to proceed.
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Describe your website (e.g., 'make an education website')"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isPending}
                        />
                        <button
                            type="submit"
                            disabled={isPending || !value.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Generating...' : 'Generate'}
                        </button>
                    </form>
                </div>

                {/* Save to Database */}
                {thread.messages.length > 0 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4">Save Website</h2>
                        <p className="text-gray-600 mb-4">
                            Save the generated website to your dashboard
                        </p>

                        <button
                            onClick={handleSaveToDatabase}
                            disabled={saveStatus.loading}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {saveStatus.loading ? 'Saving...' : 'Save to Database'}
                        </button>

                        {saveStatus.success && (
                            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
                                <p className="text-green-800 font-semibold">
                                    ✅ Website saved successfully!
                                </p>
                                <p className="text-green-700 mt-2">
                                    Page ID: {saveStatus.data?.pageId}
                                </p>
                                <p className="text-green-700">
                                    Slug: {saveStatus.data?.slug}
                                </p>
                                <a
                                    href={`/dashboard`}
                                    className="inline-block mt-2 text-green-800 underline"
                                >
                                    View in Dashboard →
                                </a>
                            </div>
                        )}

                        {saveStatus.error && (
                            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
                                <p className="text-red-800">❌ Error: {saveStatus.error}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
