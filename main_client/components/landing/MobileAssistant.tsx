'use client';

import React, { useState } from 'react';
import { FEATURES } from '../3d/features';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

export default function MobileAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    };

    const handleClose = () => {
        setIsOpen(false);
        setCurrentIndex(0); // Reset on close
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] md:hidden font-sans">
            {/* Floating Action Button */}
            <motion.button
                layout
                initial={{ width: '48px' }}
                animate={{ width: isHovered ? 'auto' : '48px' }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center bg-blue-600 h-12 rounded-full shadow-lg hover:bg-blue-500 transition-colors overflow-hidden"
            >
                <div className="flex items-center justify-center min-w-[48px] h-12">
                    <HelpCircle className="w-6 h-6 text-white" />
                </div>

                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-white text-sm font-medium whitespace-nowrap pr-4"
                        >
                            Did you know about tambo.ai?
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-sm bg-[#0B0E14] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="flex flex-col items-center text-center space-y-4 pt-2">
                                <div className="text-4xl">{FEATURES[currentIndex].icon}</div>
                                <h3 className="text-xl font-bold text-white">
                                    {FEATURES[currentIndex].title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {FEATURES[currentIndex].description}
                                </p>
                            </div>

                            {/* Progression Indicator */}
                            <div className="flex justify-center gap-1 mt-6 mb-2">
                                {FEATURES.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-blue-500' : 'w-1 bg-gray-700'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                <button
                                    onClick={handleClose}
                                    className="text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    Skip
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePrev}
                                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
