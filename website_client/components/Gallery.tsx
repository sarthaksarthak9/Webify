"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type GalleryProps = {
  heading?: string;
  subtitle?: string;
  images?: {
    src: string;
    alt?: string;
  }[];
};

export function Gallery({ heading = "Gallery", subtitle, images = [] }: GalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 md:px-8 bg-[#0F172A] text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6"
        >
          {heading}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 text-center mb-12 sm:mb-16 md:mb-24 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <div className="relative">
          {/* 
                Connecting Circuit Line - SVG Overlay 
                We'll hardcode a path that fits a 4-item zig-zag layout for demo purposes.
                Top-Left -> Top-Right -> Mid-Left -> Mid-Right
            */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden lg:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 1200"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 
                        M 250 150  (Center of 1st image area - Left)
                        L 750 150  (Horizontal to Right)
                        L 750 450  (Down to 2nd image area)
                        L 250 450  (Horizontal to Left)
                        L 250 750  (Down to 3rd image area)
                        L 750 750  (Horizontal to Right)
                        L 750 1050 (Down to 4th image area)
                    */}
              <motion.path
                d="M 250 100 L 750 100 L 750 400 L 250 400 L 250 700 L 750 700 L 750 1000"
                stroke="#4ADE80"
                strokeWidth="10"
                strokeLinecap="square"
                strokeLinejoin="round"
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-16 md:gap-y-24 gap-x-6 sm:gap-x-8 md:gap-x-12 relative z-10">
            {images.slice(0, 4).map((image, index) => {
              // Logic for Zig-Zag: 
              // Index 0: Col 1 (Left)
              // Index 1: Col 2 (Right)
              // Index 2: Col 1 (Left) - but in grid flow this just works automatically if we have 2 cols?
              // Yes, CSS Grid 2 cols:
              // 0 (Left), 1 (Right)
              // 2 (Left), 3 (Right)
              // Matches the SVG path logic!

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} md:mt-0`}
                >
                  {/* Circuit Node Dot */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 lg:w-8 lg:h-8 bg-[#4ADE80] rounded-full border-4 border-[#0F172A] z-20 
                                ${index % 2 === 0 ? 'hidden lg:block -right-[calc(1.5rem_+_1px)] translate-x-1/2' : 'hidden lg:block -left-[calc(1.5rem_+_1px)] -translate-x-1/2'} 
                                shadow-[0_0_20px_rgba(74,222,128,0.5)]`}
                  />

                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800 group-hover:border-[#4ADE80] transition-colors duration-500 h-[200px] sm:h-[250px] md:h-[300px]">
                    <img
                      src={image.src}
                      alt={image.alt || `Gallery Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
