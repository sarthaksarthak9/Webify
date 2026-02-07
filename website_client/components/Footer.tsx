"use client";

import { motion } from "framer-motion";

type SocialLink = {
    name: string;
    href: string;
};

type FooterProps = {
    logoText?: string;
    description?: string;
    text?: string;
    links?: Array<{ label: string; href: string }>;
    socialLinks?: SocialLink[];
    systemStatusText?: string;
};

export function Footer({
    logoText,
    description,
    text = "© 2026 AI Website Builder. All rights reserved.",
    links = [],
    socialLinks = [
        { name: "Github", href: "#" },
        { name: "Twitter", href: "#" },
        { name: "Discord", href: "#" },
    ],
    systemStatusText = "SYSTEM ONLINE",
}: FooterProps) {
    return (
        <footer className="w-full bg-black text-white relative overflow-hidden">
            {/* Pulsing Bottom Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#4ADE80]/30">
                <motion.div
                    className="w-[100px] h-[2px] bg-[#4ADE80] shadow-[0_0_20px_#4ADE80] absolute top-1/2 -translate-y-1/2"
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8">
                {/* Top section with logo, description, and links */}
                {(logoText || description || links.length > 0) && (
                    <div className="mb-8 sm:mb-12">
                        {logoText && (
                            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#4ADE80]">
                                {logoText}
                            </div>
                        )}
                        {description && (
                            <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-2xl">
                                {description}
                            </p>
                        )}
                        {links.length > 0 && (
                            <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4ADE80] text-sm transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2 order-2 md:order-1">
                        <div className="w-3 h-3 bg-[#4ADE80] rounded-full animate-pulse" />
                        <span className="font-mono text-xs sm:text-sm text-[#4ADE80]">{systemStatusText}</span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm font-light text-center order-1 md:order-2">
                        {text}
                    </p>

                    <div className="flex gap-3 sm:gap-4 order-3">
                        {socialLinks.map((social) => (
                            <a key={social.name} href={social.href} className="text-gray-500 hover:text-[#4ADE80] text-xs sm:text-sm transition-colors uppercase tracking-widest">
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
