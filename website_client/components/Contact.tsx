"use client";

import { motion } from "framer-motion";

type TerminalConfig = {
    prompt?: string;
    command?: string;
    loadingText?: string;
};

type ContactProps = {
    heading?: string;
    email?: string;
    phone?: string;
    address?: string;
    terminal?: TerminalConfig;
};

export function Contact({
    heading = "Contact Us",
    email,
    phone,
    address,
    terminal = {
        prompt: "root@webify:~$",
        command: "./initiate_contact.sh",
        loadingText: "Loading contact protocols...",
    },
}: ContactProps) {
    return (
        <section className="w-full py-16 sm:py-24 px-4 sm:px-8 bg-[#0F172A] text-white overflow-hidden relative" id="contact">
            {/* Circuit Board SVG Background Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="2" fill="#4ADE80" />
                        <circle cx="90" cy="90" r="2" fill="#4ADE80" />
                        <path d="M10 10 H 50 V 50 H 90" stroke="#4ADE80" strokeWidth="1" fill="none" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center relative z-10">
                {/* Left: Terminal Output Style */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
                        {heading}
                        <span className="text-[#4ADE80] animate-pulse">_</span>
                    </h2>

                    <div className="font-mono bg-black/40 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-700 backdrop-blur-sm shadow-2xl">
                        <div className="flex gap-2 mb-4 sm:mb-6">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-green-400 text-xs sm:text-sm md:text-base">
                            <p><span className="text-blue-400">{terminal.prompt}</span> {terminal.command}</p>
                            <p>{terminal.loadingText}</p>

                            {email && (
                                <p className="ml-2 sm:ml-4">
                                    <span className="text-gray-400">Email:</span> <a href={`mailto:${email}`} className="hover:underline text-white break-all">{email}</a>
                                </p>
                            )}
                            {phone && (
                                <p className="ml-2 sm:ml-4">
                                    <span className="text-gray-400">Phone:</span> <a href={`tel:${phone}`} className="hover:underline text-white">{phone}</a>
                                </p>
                            )}
                            {address && (
                                <p className="ml-2 sm:ml-4">
                                    <span className="text-gray-400">Location:</span> <span className="text-white">{address}</span>
                                </p>
                            )}

                            <p className="animate-pulse mt-4">_</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Decorative "Motherboard" Graphic using CSS/Divs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full hidden md:block" // Hidden on mobile for simplicity
                >
                    {/* Abstract representation of connection nodes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] border border-[#4ADE80]/30 rounded-full flex items-center justify-center">
                        <div className="w-[130px] md:w-[200px] h-[130px] md:h-[200px] border border-[#4ADE80]/50 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-[70px] md:w-[100px] h-[70px] md:h-[100px] border-2 border-[#4ADE80] rounded-full flex items-center justify-center shadow-[0_0_30px_#4ADE80]">
                            <svg className="w-7 h-7 md:w-10 md:h-10 text-[#4ADE80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Random connection lines radiating out */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-[100px] md:w-[150px] h-[2px] bg-gradient-to-r from-[#4ADE80]/50 to-transparent origin-left"
                            style={{ rotate: deg }}
                            initial={{ width: 0 }}
                            whileInView={{ width: 150 }} // Extending slightly beyond the circle
                            transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
