import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#05070a] border-t border-white/10 pt-10 md:pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-4 flex flex-col items-center text-center">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                W
                            </div>
                            <span className="text-xl font-bold text-white">Webify</span>
                        </Link>
                        <p className="text-white/60 mb-6 max-w-sm">
                            The AI website builder that turns your ideas into reality. Generate, customize, and deploy in minutes.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-center text-white/40 text-sm">
                    <p>&copy; {new Date().getFullYear()} Webify Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
