'use client';

import { useState, useEffect, useRef } from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Save, Layout, Terminal, Code2, Loader2, LogOut, User, CheckCircle2, History } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';

const HistorySidebar = dynamic(() => import('@/components/generate/HistorySidebar'), { ssr: false });

export default function GeneratePage() {
    const router = useRouter();
    const { thread } = useTamboThread();
    const { value, setValue, submit, isPending } = useTamboThreadInput();
    const [saveStatus, setSaveStatus] = useState<{
        loading: boolean;
        success: boolean;
        error: string | null;
        data: any;
    }>({ loading: false, success: false, error: null, data: null });

    const [hasStarted, setHasStarted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Load user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // Auto-scroll to bottom of messages
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [thread.messages]);

    // Update hasStarted when there are messages
    useEffect(() => {
        if (thread.messages.length > 0) {
            setHasStarted(true);
        }
    }, [thread.messages]);

    const suggestions = [
        "Create a modern SaaS landing page for an AI startup",
        "Design a minimalist portfolio for a photographer",
        "Build an e-commerce home page for organic skincare",
        "Make a corporate website for a legal firm"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;

        setHasStarted(true);

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
8. CRITICAL: For any 'image' or 'src' fields, try to give the image DO NOT return null or empty strings for images.`;
        setValue(enhancedPrompt);
        // Allow state to update before submitting
        setTimeout(() => submit(), 0);
    };

    const handleSaveToDatabase = async () => {
        setSaveStatus({ loading: true, success: false, error: null, data: null });
        const toastId = toast.loading("Saving your website...");

        try {
            // Get the generated data from the last message
            const lastMessage = thread.messages[thread.messages.length - 1];
            // Extract sections from Tambo messages (exclude Theme - it's metadata, not a section)
            const sections = thread.messages
                .filter((msg: any) => msg.role === 'assistant' && msg.component && msg.component.componentName)
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
                finalSections.forEach((section: any, index: number) => {
                    if (section.type !== 'navbar') {
                        section.order = index;
                    }
                });
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
                    return {
                        name: 'AI Generated Theme',
                        colors: {
                            ...themeMessage.component.props
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

                // Tech/SaaS - Blue/Purple (Default fallback handled below)

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
            toast.dismiss(toastId);
            toast.success("Website saved successfully!");
        } catch (error: any) {
            setSaveStatus({ loading: false, success: false, error: error.message, data: null });
            toast.dismiss(toastId);
            toast.error(error.message || "Failed to save website");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-white/5 rounded-full text-white/70 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                                W
                            </div>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Webify
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium text-white">{user.name}</div>
                                    <div className="text-xs text-white/40">{user.email}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth?tab=login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col">

                {/* Initial Search / Hero State */}
                <AnimatePresence mode="wait">
                    {!hasStarted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full text-center space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider mb-4"
                                >
                                    <Sparkles size={12} />
                                    AI Website Builder
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white glow-text">
                                    What do you want to <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                        build today?
                                    </span>
                                </h1>
                                <p className="text-lg text-white/40 max-w-lg mx-auto">
                                    Describe your dream project, and Webify will generate a complete, production-ready website for you in seconds.
                                </p>
                            </div>

                            <div className="w-full relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <form onSubmit={handleSubmit} className="relative flex items-center bg-[#0B0E14] border border-white/10 rounded-xl p-2 shadow-2xl">
                                    <div className="p-3 text-white/30">
                                        <Code2 size={24} />
                                    </div>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        placeholder="e.g., A minimalist portfolio for a wildlife photographer..."
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 text-lg px-2"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={!value.trim() || isPending}
                                        className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group-submit"
                                    >
                                        <ArrowRight size={20} className="group-submit-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <span className="text-xs text-white/30 font-medium uppercase tracking-widest">Suggestions:</span>
                                {suggestions.map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setValue(suggestion)}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs text-white/60 hover:text-white transition-all"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col h-full w-full max-w-5xl mx-auto"
                        >
                            {/* Chat Interface / Output Console */}
                            <div className="flex-1 bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl mb-6 min-h-[500px]">
                                {/* Header */}
                                <div className="h-12 border-b border-white/10 bg-white/5 flex items-center justify-between px-4">
                                    <div className="flex items-center gap-2 text-sm text-white/50">
                                        <Terminal size={14} />
                                        <span>Generation Console</span>
                                    </div>
                                    {isPending ? (
                                        <div className="flex items-center gap-2 text-xs text-blue-400 animate-pulse">
                                            <Loader2 size={12} className="animate-spin" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-xs text-green-400">
                                            <CheckCircle2 size={12} />
                                            <span>Ready</span>
                                        </div>
                                    )}
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {thread.messages.map((message) => {
                                        // Clean content logic
                                        let contentToRender: any = message.content;
                                        const separator = '________HIDDEN_INSTRUCTIONS________';

                                        if (message.role === 'user') {
                                            if (typeof contentToRender === 'string') {
                                                contentToRender = contentToRender.split(separator)[0].trim();
                                            } else if (Array.isArray(contentToRender)) {
                                                contentToRender = contentToRender.map(part => {
                                                    if (part.type === 'text' && typeof part.text === 'string') {
                                                        return { ...part, text: part.text.split(separator)[0].trim() };
                                                    }
                                                    return part;
                                                });
                                            }
                                        }

                                        if (message.role === 'assistant' && typeof contentToRender === 'string') {
                                            contentToRender = contentToRender.replace(/```json[\s\S]*?```/g, '✨ Generated Section Data');
                                        }

                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user'
                                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                                        : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-sm'
                                                        }`}
                                                >
                                                    <div className="text-xs font-medium opacity-50 mb-1">
                                                        {message.role === 'user' ? 'You' : 'Webify AI'}
                                                    </div>

                                                    {Array.isArray(contentToRender) ? (
                                                        contentToRender.map((part: any, i: number) =>
                                                            part.type === 'text' ? (
                                                                <p key={i} className="whitespace-pre-wrap text-sm leading-relaxed">
                                                                    {part.text}
                                                                </p>
                                                            ) : null
                                                        )
                                                    ) : (
                                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{String(contentToRender)}</p>
                                                    )}

                                                    {message.renderedComponent && (
                                                        <div className="mt-3 pt-3 border-t border-white/10">
                                                            <div className="text-xs text-blue-400 flex items-center gap-1 mb-2">
                                                                <Layout size={12} />
                                                                Generated Component
                                                            </div>
                                                            <div className="opacity-75 text-xs font-mono bg-black/20 p-2 rounded border border-white/5">
                                                                Component Rendered
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area (Bottom of Console) */}
                                <div className="p-4 border-t border-white/10 bg-white/5">
                                    <form onSubmit={handleSubmit} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder={isPending ? "Generating your website..." : "Refine generation or add more details..."}
                                            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isPending}
                                        />

                                        {/* Contextual Save Button: Shows when idle, generation exists, and input is empty */}
                                        {!isPending && thread.messages.length > 2 && !value.trim() ? (
                                            <button
                                                type="button"
                                                onClick={handleSaveToDatabase}
                                                disabled={saveStatus.loading}
                                                className="px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all flex items-center justify-center p-3 gap-2"
                                                title="Save to Database"
                                            >
                                                {saveStatus.loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                                <span className="hidden sm:inline font-medium text-xs">Save</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={isPending || !value.trim()}
                                                className="px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center p-3"
                                            >
                                                {isPending ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                                            </button>
                                        )}
                                    </form>
                                </div>
                            </div>

                            {/* Actions Bar */}
                            {!isPending && thread.messages.length > 2 && !value.trim() && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-between bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4 backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium">Generation Complete</h3>
                                            <p className="text-white/40 text-sm">Review the structure above. Ready to deploy?</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            onClick={handleSaveToDatabase}
                                            disabled={saveStatus.loading}
                                            className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            {saveStatus.loading ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Save size={16} />
                                            )}
                                            {saveStatus.loading ? 'Saving...' : 'Save & Deploy'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Success State */}
                            <AnimatePresence>
                                {saveStatus.success && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2">🎉 Website Successfully Created!</h3>
                                        <p className="text-white/60 mb-6">Your website is ready to view and edit.</p>
                                        <div className="flex justify-center gap-4">
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}`}
                                                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                Go to Dashboard
                                            </a>
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${saveStatus.data?.slug}`}
                                                target="_blank"
                                                className="px-6 py-3 bg-white/10 border border-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                                            >
                                                View Live Site
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <HistorySidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
}
