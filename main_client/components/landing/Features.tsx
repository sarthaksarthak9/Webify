'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, MousePointer, Layout, Globe, Smartphone } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: 'Instant Generation',
        description: 'Transform a single text prompt into a fully functional website in seconds.'
    },
    {
        icon: <Layout className="w-6 h-6 text-blue-400" />,
        title: 'Smart Layouts',
        description: 'AI automatically selects the best structure and design for your specific niche.'
    },
    {
        icon: <MousePointer className="w-6 h-6 text-purple-400" />,
        title: 'Admin Dashboard',
        description: 'Full backend control to manage content, users, and settings with ease.'
    },
    {
        icon: <Shield className="w-6 h-6 text-green-400" />,
        title: 'Secure Hosting',
        description: 'Enterprise-grade security and automated SSL certificates for every site.'
    },
    {
        icon: <Globe className="w-6 h-6 text-cyan-400" />,
        title: 'One-Click Publish',
        description: 'Deploy your website to a live URL instantly. No devops knowledge required.'
    },
    {
        icon: <Smartphone className="w-6 h-6 text-pink-400" />,
        title: 'Mobile Perfection',
        description: 'All generated websites are fully responsive and optimized for mobile devices.'
    }
];

export default function Features() {
    return (
        <section id="features" className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] -translate-y-1/2 -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Powerful Features
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 max-w-2xl mx-auto"
                    >
                        Everything you need to build professional websites without writing a single line of code.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
