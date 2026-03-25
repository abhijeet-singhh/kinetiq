"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { components } from "@/content/components";
import { componentRegistry } from "@/components/registry";
import { categories } from "@/content/categories";
import PreviewRenderer from "@/components/PreviewRenderer";
import Link from "next/link";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("button");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = components.filter((c) => c.category === activeCategory);

  return (
    <div className="h-screen w-full bg-[#080808] text-[#e0e0e0] overflow-hidden flex font-mono pt-20">
      {/* 1. THE RAIL: High-fidelity layout-aware navigation */}
      <nav className="w-32 md:w-44 border-r border-white/5 mb-1 flex flex-col items-start py-12 justify-between z-50 bg-[#080808] relative">
        <div className="flex flex-col w-full relative">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;

            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className="group relative px-8 py-3 flex items-center w-full transition-colors duration-300"
              >
                {/* 1. The Gliding Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                      mass: 1,
                    }}
                    className="absolute left-0 right-4 h-10 bg-primary/3 border-l-2 border-primary z-0"
                    style={{ borderRadius: "0 4px 4px 0" }}
                  />
                )}

                {/* 2. The Content Wrapper */}
                <div className="relative z-10 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    {/* Animated Dot */}
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.5, 1.2] : 1,
                        backgroundColor: isActive
                          ? "#228b22"
                          : "rgba(255,255,255,0.1)",
                      }}
                      className="h-1 w-1 active:w-10 rounded-full shadow-[0_0_10px_rgba(212,255,63,0)] isActive:shadow-[0_0_10px_rgba(212,255,63,0.5)]"
                    />

                    <motion.span
                      animate={{
                        x: isActive ? 6 : 0,
                        color: isActive ? "#228b22" : "rgba(255,255,255,0.3)",
                        filter: isActive ? "blur(0px)" : "blur(0.5px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      className="text-[12px] font-black uppercase tracking-[0.15em] group-hover:text-white/90 transition-colors"
                    >
                      {cat.name}
                    </motion.span>
                  </div>

                  {/* 3. Sliding Detail Line */}
                  <div className="overflow-hidden h-[10px] mt-1 ml-4">
                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.span
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "circOut" }}
                          className="text-[8px] text-primary/40 font-mono block uppercase tracking-tighter"
                        >
                          Active_State
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-8 w-full">
          <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
      </nav>

      {/* 2. THE STAGE: Horizontal Component Display */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        {/* Header Section */}
        <div className="pt-5 px-12 flex justify-between items-end">
          <div>
            <motion.h1
              key={activeCategory}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-4xl text-white/80 font-black tracking-tighter uppercase font-oxanium"
            >
              {activeCategory}
              <span className="text-primary">.</span>
            </motion.h1>
            <p className="text-white/30 text-xs mt-4 tracking-widest uppercase font-oxanium ml-1">
              Filtered_Results ({filtered.length})
            </p>
          </div>

          <div className="hidden md:block text-right border-l border-white/10 pl-8">
            <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-tight">
              Architecture: Modular React
              <br />
              Animation: Motion/React
              <br />
              Styling: Tailwind CSS
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center overflow-x-auto overflow-y-hidden no-scrollbar px-12 gap-12 snap-x"
        >
          <AnimatePresence mode="wait">
            {filtered.map((component, index) => {
              const entry =
                componentRegistry[
                  component.slug as keyof typeof componentRegistry
                ];

              return (
                <motion.div
                  key={component.slug}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="snap-center shrink-0"
                >
                  <Link
                    href={`/components/${component.slug}`}
                    className="group relative"
                  >
                    {/* The Card */}
                    <div className="w-75 md:w-100 aspect-4/5 bg-[#111] border border-white/5 rounded-sm p-1 flex flex-col transition-all duration-500 group-hover:border-primary/30 group-hover:bg-[#151515]">
                      {/* Preview Area */}
                      <div className="flex-1 relative overflow-hidden bg-[#0c0c0c] flex items-center justify-center">
                        <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-125">
                          {entry && (
                            <PreviewRenderer
                              componentName={entry.previewComponent}
                              category={entry.category}
                            />
                          )}
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
                        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-primary/40" />
                      </div>

                      {/* Info Panel */}
                      <div className="p-8 relative">
                        <span className="text-[10px] text-primary mb-2 block font-bold tracking-[0.3em]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl text-white/80 font-bold tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500 font-oxanium">
                          {component.name}
                        </h3>
                        <p className="text-sm text-white/40 line-clamp-2 font-sans">
                          {component.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Progress Bar (Bottom) */}
        <div className="h-14 px-12 flex items-center gap-4 mb-1">
          <div className="h-px flex-1 bg-white/10 relative">
            <motion.div
              className="absolute top-0 left-0 h-px bg-primary"
              style={{ width: `${(filtered.indexOf(filtered[0]) + 1) * 20}%` }} // Simplified logic
            />
          </div>
          <span className="text-[11px] text-white/40">SCROLL_TO_EXPLORE</span>
        </div>
      </main>
    </div>
  );
}
