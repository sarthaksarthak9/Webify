"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type FeatureItem = {
  title: string;
  bullets: string[];
  imageUrl?: string;
};

type FeaturesProps = {
  heading?: string;
  items: FeatureItem[];
  defaultImages?: string[];
};

// Default fallback images
const DEFAULT_FEATURE_IMAGES = [
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
];

export function Features({ heading = "Features", items, defaultImages = DEFAULT_FEATURE_IMAGES }: FeaturesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 px-4 md:px-8 bg-[#1B243F] text-white overflow-hidden"
    >
      {/* Background Path */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 2000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 
            Path needs to align with the cards. 
            Assuming 3 cards in a staggered layout: Center, Right, Left/Center.
            Let's draw a winding path.
           */}
          <motion.path
            d="M -100 200 Q 400 200 400 500 T 1040 1000 T 400 1500"
            stroke="#4ADE80"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16 sm:space-y-24 md:space-y-32">
        {/* Render Items */}
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const fallbackImage = defaultImages[index % defaultImages.length];
          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 bg-white text-[#1B243F] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl relative"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{item.title}</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4ADE80] rounded-full flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-4 border-white/10"
              >
                <img
                  src={item.imageUrl || fallbackImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
