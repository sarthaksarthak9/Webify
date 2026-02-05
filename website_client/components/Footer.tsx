"use client";

import { motion } from "framer-motion";

type SocialLink = {
    name: string;
    href: string;
};

type FooterProps = {
    text?: string;
    socialLinks?: SocialLink[];
    systemStatusText?: string;
};

export function Footer({
    text = "© 2026 AI Website Builder. All rights reserved.",
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

            <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
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
        </footer>
    );
}
