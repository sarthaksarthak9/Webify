// components/About.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Default fallback image
const DEFAULT_ABOUT_IMAGE = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop";

type AboutProps = {
    heading?: string;
    description: string;
    imageUrl?: string;
};

export function About({ heading = "About Us", description, imageUrl }: AboutProps) {
    const containerRef = useRef<HTMLElement>(null);

    // Track scroll progress for the SVGs
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

    // Simple logic to wrap "Optimize" in a green span if present in heading
    const renderHeading = (text: string) => {
        const parts = text.split(/(Optimize)/i);
        return parts.map((part, i) =>
            part.toLowerCase() === "optimize" ? (
                <span key={i} className="text-[#4ADE80]">{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <section ref={containerRef} className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-32 sm:pb-48 md:pb-64 px-4 sm:px-8 bg-white text-[#1B243F] overflow-hidden">
            {/* Background Green Path */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1440 1000"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M 1600 300 L 1150 300 L 1150 750 Q 1150 850 1050 850 L -100 850"
                        stroke="#4ADE80"
                        strokeWidth="35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        style={{ pathLength }}
                    />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
                {/* Left Content */}
                <div className="text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight"
                    >
                        {renderHeading(heading)}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-sm sm:text-base md:text-lg space-y-4 sm:space-y-6 leading-relaxed"
                    >
                        {/* Split description by newlines to create paragraphs if needed */}
                        {description.split('\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white"
                >
                    <img
                        src={imageUrl || DEFAULT_ABOUT_IMAGE}
                        alt="About Feature"
                        className="w-full h-full object-cover"
                    />
                    {/* Green sliver accent on the right edge */}
                    <div className="absolute top-10 right-0 w-1.5 sm:w-2 h-16 sm:h-20 bg-[#4ADE80] rounded-l-lg" />
                </motion.div>
            </div>
        </section>
    );
}
