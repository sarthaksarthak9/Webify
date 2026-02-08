'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-6"
                >
                    <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider uppercase">
                        AI Website Builder
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl mx-auto"
                >
                    Build your dream website <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                        with a single prompt
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Webify is the ultimate AI-powered platform that generates stunning, fully-functional websites in seconds. Includes a full admin dashboard for complete control.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Link
                        href="/auth?tab=login"
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                        Generate Website
                    </Link>
                    <Link
                        href="#gallery"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                    >
                        View Demo
                    </Link>
                </motion.div>

                {/* Floating Cards Graphic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative max-w-4xl mx-auto h-[600px] md:h-[500px] mt-10 md:mt-0"
                >
                    {/* Central Blue Sphere */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 blur-sm animate-pulse-slow shadow-[0_0_100px_rgba(59,130,246,0.3)]"></div>

                    {/* Floating Card 1 - Bottom Right (Desktop) / Bottom Center (Mobile) */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 md:bottom-0 left-1/2 md:left-auto right-auto md:right-10 -translate-x-1/2 md:translate-x-0 w-64 md:w-80 bg-white text-gray-900 p-4 md:p-6 rounded-2xl shadow-xl z-20"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4 text-xl md:text-2xl">
                            🚀
                        </div>
                        <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">One-Click Deploy</h3>
                        <p className="text-xs md:text-sm text-gray-600">Publish your website instantly to the world with a single click.</p>
                    </motion.div>

                    {/* Floating Card 2 - Top Center/Right (Desktop) / Top Center (Mobile) */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-0 md:top-10 left-1/2 md:left-auto right-auto md:right-20 -translate-x-1/2 md:translate-x-0 w-64 md:w-80 bg-white text-gray-900 p-4 md:p-6 rounded-2xl shadow-xl z-30"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4 text-xl md:text-2xl">
                            ✨
                        </div>
                        <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">AI Generation</h3>
                        <p className="text-xs md:text-sm text-gray-600">Describe your vision and let our AI build the perfect structure.</p>
                    </motion.div>

                    {/* Floating Card 3 - Bottom Left (Desktop) / Middle Center (Mobile) */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-1/2 md:top-auto bottom-auto md:bottom-10 left-1/2 md:left-10 right-auto -translate-x-1/2 -translate-y-1/2 md:translate-y-0 w-64 md:w-80 bg-white text-gray-900 p-4 md:p-6 rounded-2xl shadow-xl z-10"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3 md:mb-4 text-xl md:text-2xl">
                            ⚙️
                        </div>
                        <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Full Control</h3>
                        <p className="text-xs md:text-sm text-gray-600">Powerful admin dashboard to manage content and settings.</p>
                    </motion.div>

                    {/* Decorative Particles/Stars */}
                    <div className="absolute top-20 left-10 md:left-20 text-blue-400 text-2xl animate-pulse">✦</div>
                    <div className="absolute bottom-20 right-10 md:right-1/2 text-blue-400 text-xl animate-pulse delay-75">✦</div>
                    <div className="absolute top-10 right-10 text-green-400 text-xl animate-pulse delay-150">✦</div>
                </motion.div>
            </div>
        </section>
    );
}
