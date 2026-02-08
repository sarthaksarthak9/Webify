'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Loader2, X, Trophy, Sparkles, Code, Rocket, Moon, Palette } from 'lucide-react'; // Added icons
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const CrystalRain = dynamic(() => import('@/components/3d/CrystalRain'), { ssr: false });
const MobileAssistant = dynamic(() => import('@/components/landing/MobileAssistant'), { ssr: false });

export default function AuthPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [selectedFeature, setSelectedFeature] = useState<any>(null); // State for modal data

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // UI States
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'signup') setActiveTab('signup');
        else setActiveTab('login');
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/signup';
        const body = activeTab === 'login'
            ? { email, password }
            : { email, password, name };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Store token & user
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify({
                userId: data.data.userId,
                email: data.data.email,
                name: data.data.name,
            }));

            toast.success(activeTab === 'login' ? 'Welcome back!' : 'Account created successfully!');

            // Redirect
            router.push('/generate');

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

            {/* Tambo AI Features - 3D Crystal Rain */}
            <div className="absolute inset-0 z-0">
                <CrystalRain onOpenModal={setSelectedFeature} />
            </div>

            {/* Feature Modal */}
            <AnimatePresence>
                {selectedFeature && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedFeature(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden"
                            style={{
                                boxShadow: "0 0 50px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)"
                            }}
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />

                            <button
                                onClick={() => setSelectedFeature(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4 animate-bounce-slow">
                                    {selectedFeature.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedFeature.title}</h2>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                                <p className="text-white/80 leading-relaxed font-medium">
                                    {selectedFeature.description}
                                </p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Link
                                    href="https://docs.tambo.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/50 transition-shadow"
                                >
                                    Explore More
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    W
                </div>
                <span className="font-bold text-white/80 group-hover:text-white transition-colors">Webify</span>
            </Link>

            <motion.div
                layout
                className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-[600px] flex flex-col"
            >
                {/* Tabs */}
                <div className="flex border-b border-white/5 shrink-0">
                    <button
                        onClick={() => { setActiveTab('login'); }}
                        className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'login' ? 'text-white' : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        Login
                        {activeTab === 'login' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => { setActiveTab('signup'); }}
                        className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'signup' ? 'text-white' : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        Sign Up
                        {activeTab === 'signup' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                            />
                        )}
                    </button>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-white/50 text-sm">
                            {activeTab === 'login'
                                ? 'Enter your credentials to access your workspace'
                                : 'Get started with Webify today'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                        <AnimatePresence mode="popLayout">
                            {activeTab === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={activeTab === 'signup'}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="you@company.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                activeTab === 'login' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>

            <MobileAssistant />
        </div>
    );
}
