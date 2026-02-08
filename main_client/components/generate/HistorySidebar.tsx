'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MessageSquare, Loader2, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Website {
    slug: string;
    title: string;
    createdAt: string;
    theme: {
        colors: {
            primary: string;
        };
    };
}

interface HistorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HistorySidebar({ isOpen, onClose }: HistorySidebarProps) {
    const [websites, setWebsites] = useState<Website[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchHistory();
        }
    }, [isOpen]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites?limit=20&sort=-createdAt`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                // API returns { success: true, data: { websites: [], pagination: {} } }
                setWebsites(data.data?.websites || []);
            }
        } catch (error) {
            console.error('Failed to fetch history', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-80 sm:w-96 bg-[#0B0E14] border-r border-white/10 z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Clock size={20} className="text-blue-500" />
                                Recent Projects
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-40 text-white/40 gap-3">
                                    <Loader2 size={24} className="animate-spin text-blue-500" />
                                    <span className="text-sm">Loading history...</span>
                                </div>
                            ) : websites.length === 0 ? (
                                <div className="text-center py-10 text-white/40 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                        <Clock size={24} />
                                    </div>
                                    <p>No projects found.</p>
                                    <p className="text-sm mt-1 text-white/30">Your generated websites will appear here.</p>
                                </div>
                            ) : (
                                websites.map((site) => (
                                    <div key={site.slug} className="block p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all group relative overflow-hidden">
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${site.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 bg-black/50 hover:bg-black/80 rounded-lg text-white/70 hover:text-white transition-colors"
                                                title="Open Live Site"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>

                                        <Link
                                            href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${site.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >

                                            <div className="flex items-start justify-between mb-2 pr-6">
                                                <div className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1 text-base">
                                                    {site.title}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-white/40 mt-3 pt-3 border-t border-white/5">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} />
                                                    <span>{new Date(site.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] uppercase tracking-wider opacity-75">Theme</span>
                                                    <div
                                                        className="w-3 h-3 rounded-full shadow-sm ring-1 ring-white/10"
                                                        style={{ backgroundColor: site.theme?.colors?.primary || '#3B82F6' }}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
}
