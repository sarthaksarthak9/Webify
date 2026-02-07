"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TestimonialItem = {
  name: string;
  role?: string;
  message: string;
  avatar?: string;
  rating?: number;
};

type TestimonialsProps = {
  heading?: string;
  items?: TestimonialItem[];
};

export function Testimonials({
  heading = "What People Say",
  items = [],
}: TestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 md:px-8 bg-[#1B243F] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-24 md:mb-32"
        >
          {heading}
        </motion.h2>

        {/* Desktop View: Horizontal Timeline */}
        <div className="hidden lg:block relative h-[600px] w-full">
          {/* Central Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0">
            <svg className="w-full h-[40px] overflow-visible" preserveAspectRatio="none">
              <motion.path
                d="M 0 20 L 1400 20"
                stroke="#4ADE80"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="10 10" // Optional techy texture? No, solid is better for the "flow"
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="relative w-full h-full flex justify-between items-center z-10 px-12">
            {items.map((item, index) => {
              const isTop = index % 2 === 0;
              return (
                <div key={index} className="relative flex-1 flex justify-center">
                  {/* Node on the line */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#1B243F] border-4 border-[#4ADE80] rounded-full z-20"
                  />

                  {/* Connection Stem */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100px' }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
                    viewport={{ once: true }}
                    className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#4ADE80]/50 z-0
                                    ${isTop ? 'bottom-1/2 mb-3 origins-bottom' : 'top-1/2 mt-3 origins-top'}
                                `}
                    style={{ height: '100px' }} // Fallback/Static sizing
                  />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute w-[220px] xl:w-[280px] 2xl:w-[300px] p-4 xl:p-6 bg-white text-[#1B243F] rounded-2xl shadow-xl
                                    ${isTop ? 'bottom-[calc(50%+100px)]' : 'top-[calc(50%+100px)]'}
                                    hover:scale-105 transition-transform duration-300 cursor-pointer
                                `}
                  >
                    <div className="absolute -left-2 top-8 text-4xl text-[#4ADE80]/30 font-serif leading-none">“</div>
                    <p className="relative z-10 text-gray-700 italic mb-4">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#1B243F] overflow-hidden">
                        {item.avatar ? (
                          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          item.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{item.name}</div>
                        {item.role && <div className="text-xs text-gray-500">{item.role}</div>}
                        {item.rating && (
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-[#4ADE80] text-xs">
                                {i < item.rating! ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet View: Vertical Stack */}
        <div className="lg:hidden relative space-y-8 sm:space-y-12">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#4ADE80]/30 z-0" />

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative pl-10 sm:pl-12"
            >
              {/* Node */}
              <div className="absolute left-[11px] top-6 w-3 h-3 sm:w-4 sm:h-4 bg-[#1B243F] border-2 border-[#4ADE80] rounded-full z-10" />

              <div className="bg-white text-[#1B243F] p-4 sm:p-6 rounded-2xl shadow-lg">
                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">"{item.message}"</p>
                <div className="font-bold text-sm sm:text-base">{item.name}</div>
                <div className="text-xs sm:text-sm text-gray-500">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
