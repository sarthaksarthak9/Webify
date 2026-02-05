"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavbarProps = {
    logoText?: string;
    links?: { label: string; href: string }[];
    demoButtonText?: string;
};

export function NavBar({ logoText = "MySite", links = [], demoButtonText = "Ask for a demo" }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-4 sm:py-6",
                scrolled
                    ? "bg-[#1B243F]/90 backdrop-blur-md shadow-lg py-3 sm:py-4"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-bold tracking-tighter text-white flex items-center gap-2">

                    {logoText}
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-4 lg:gap-8">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-green transition-colors"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <button className="px-4 lg:px-6 py-2 bg-brand-green text-[#1B243F] text-xs font-bold uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
                            {demoButtonText}
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#1B243F] border-t border-white/10 overflow-hidden"
                    >
                        <ul className="flex flex-col p-6 gap-4">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="block text-sm font-bold uppercase tracking-widest text-white/90 hover:text-white"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <button className="w-full py-3 bg-brand-green text-[#1B243F] text-sm font-bold uppercase tracking-wider rounded-full hover:brightness-110 transition-all">
                                    {demoButtonText}
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
