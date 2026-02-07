"use client";

import { motion } from "framer-motion";

type CTAProps = {
    heading: string;
    subheading?: string;
    buttonText: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
};

export function CTA({ heading, subheading, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink }: CTAProps) {
    return (
        <section className="relative w-full py-20 sm:py-28 md:py-32 px-4 sm:px-8 bg-[#1B243F] text-white text-center overflow-hidden">
            {/* Converging Lines Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none">
                    {/* Lines converging to the center button area (approx 50% width, 70% height) */}
                    {[...Array(20)].map((_, i) => (
                        <motion.line
                            key={i}
                            x1={i * 5 + "%"}
                            y1="0%"
                            x2="50%"
                            y2="70%"
                            stroke="#4ADE80"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                        />
                    ))}
                    {[...Array(20)].map((_, i) => (
                        <motion.line
                            key={i + 20}
                            x1={i * 5 + "%"}
                            y1="100%"
                            x2="50%"
                            y2="70%"
                            stroke="#4ADE80"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                        />
                    ))}
                </svg>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
                >
                    {heading}
                </motion.h2>

                {subheading && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10"
                    >
                        {subheading}
                    </motion.p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 30px rgba(74, 222, 128, 0.5)",
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg md:text-xl font-bold shadow-2xl transition-all duration-300"
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-primary-dark)'
                        }}
                    >
                        {buttonText}
                    </motion.button>

                    {secondaryButtonText && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(74, 222, 128, 0.1)",
                                borderColor: "#4ADE80",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-transparent border-2 border-white/30 text-white rounded-full text-base sm:text-lg md:text-xl font-bold transition-all duration-300"
                        >
                            {secondaryButtonText}
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
}
