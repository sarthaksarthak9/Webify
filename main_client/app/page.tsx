'use client';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Gallery from '@/components/landing/Gallery';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Footer />
    </main>
  );
}
