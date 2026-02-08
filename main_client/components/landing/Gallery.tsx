'use client';

import { motion } from 'framer-motion';

const examples = [
    {
        title: "Eco Store",
        category: "E-commerce",
        gradient: "from-green-400 to-emerald-600"
    },
    {
        title: "Tech Startup",
        category: "SaaS",
        gradient: "from-blue-400 to-indigo-600"
    },
    {
        title: "Portfolio",
        category: "Personal",
        gradient: "from-purple-400 to-pink-600"
    },
    {
        title: "Restaurant",
        category: "Hospitality",
        gradient: "from-orange-400 to-red-600"
    }
];

export default function Gallery() {
    return (
        <section id="gallery" className="py-16 md:py-24 bg-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Made with Webify
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 max-w-2xl mx-auto"
                    >
                        Check out some of the amazing websites created by our users.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {examples.map((example, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <h3 className="text-2xl font-bold mb-2">{example.title}</h3>
                                <span className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-md">
                                    {example.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
