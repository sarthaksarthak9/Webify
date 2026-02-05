// components/Hero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HeroProps = {
    title: string;
    subtitle?: string;
    ctaText?: string;
    tagline?: string;
};

export function Hero({ title, subtitle, ctaText, tagline }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Default tagline if not provided
    const defaultTagline = "Optimizing Efficiency, Well-Being, Sustainability, and Environmental Impact.";

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"], // Draw smoothly as we scroll past the hero
    });

    // Accelerate at the end: Slow start -> Fast finish
    const pathLen = useTransform(scrollYProgress, [0, 0.5, 0.7], [0.38, 0.65, 1]);

    // Fade out as it shoots off screen
    // const opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100vh] md:min-h-screen lg:min-h-[150vh] bg-[#1B243F] overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 flex items-center md:items-start"
        >
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-0 md:mt-12 lg:mt-20 w-full">
                {/* Left Content */}
                <div className="text-left md:sticky md:top-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 text-white tracking-tight leading-[1.1]">
                            <span className="block">{title}</span>
                        </h1>

                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-[#4ADE80] mb-6 leading-snug"
                            >
                                {subtitle}</motion.p>
                        )}

                        {ctaText && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(74, 222, 128, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 sm:px-8 py-4 sm:py-4 bg-[#4ADE80] text-[#1B243F] text-sm sm:text-base font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                            >
                                {ctaText}
                            </motion.button>
                        )}

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="mt-10 sm:mt-12 md:mt-16 border-l-2 border-white/10 pl-4 sm:pl-6 backdrop-blur-sm"
                        >
                            <p className="text-gray-400 text-sm sm:text-sm max-w-sm leading-relaxed">
                                {tagline || defaultTagline}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right side spacer */}
                <div className="hidden md:block h-full"></div>
            </div>

            {/* Background Graphic - Hidden on mobile to prevent text overlap */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 1000"
                    fill="none"
                    preserveAspectRatio="xMidYMin slice"
                    xmlns="http://www.w3.org/2000/svg"
                    color="white"
                >
                    <motion.path
                        d="
              M 85 60
              L 85 240
              Q 85 290 135 290
              L 610 290
              Q 700 290 700 350
              L 700 450
              Q 700 500 750 500
              L 1250 500
              Q 1350 500 1350 600
              L 1350 650
              Q 1350 700 1250 700
              L 600 700
              Q 500 700 500 750
              L 500 850
              Q 500 900 600 900
              L 2200 900
            "
                        stroke="#4ADE80"
                        strokeWidth="35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{
                            pathLength: pathLen,
                            // opacity
                        }}
                    />
                </svg>
            </div>

            {/* Mobile Background - Simple gradient accent */}
            <div className="absolute bottom-0 right-0 w-full h-1/3 pointer-events-none z-0 md:hidden">
                <div className="absolute bottom-0 right-0 w-3/4 h-full bg-gradient-to-tl from-[#4ADE80]/10 to-transparent rounded-tl-[100px]"></div>
            </div>
        </section>
    );
}
