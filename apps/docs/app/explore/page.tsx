"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { components } from "@/content/components";
import { componentRegistry } from "@/components/registry";
import { categories } from "@/content/categories";
import PreviewRenderer from "@/components/PreviewRenderer";
import Link from "next/link";
import { ArrowLeftIcon, SunMediumIcon, MoonIcon } from "lucide-react";
import { useAppTheme } from "@/components/theme-context";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("button");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useAppTheme();

  // Smooth Progress Bar logic
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const filtered = components.filter((c) => c.category === activeCategory);

  return (
    <div className="h-screen w-full bg-background text-foreground overflow-hidden flex flex-col font-mono selection:bg-primary/30">
      {/* Top Navigation */}
      {/* Header with back link and category tabs */}
      <header className="h-20 border-b border-border/3 flex items-center justify-between px-10 z-50 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <div className="h-px bg-linear-to-r from-primary/40 via-primary/30 to-transparent flex-1 ml-5" />
        {/* scroll text */}
        <div className="text-[10px] text-foreground/30 mr-3 uppercase flex items-center">
          Scroll{" "}
          <motion.span
            className="ml-1 inline-block"
            animate={{ x: [0, 5] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.3,
              ease: "easeInOut",
            }}
          >
            &gt;&gt;
          </motion.span>
        </div>
        <nav className="flex gap-1 bg-foreground/5 p-1 rounded-sm w-164 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`relative px-6 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "text-background"
                  : "text-foreground/50 hover:text-black/80 dark:hover:text-primary"
              }`}
            >
              <span className="relative z-10">{cat.name}</span>
              {activeCategory === cat.slug && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className={`relative flex justify-center items-center w-10 h-10 text-[10px] uppercase tracking-widest transition-all duration-300 text-foreground/50 rounded-sm bg-foreground/5 ml-2`}
        >
          <span className="relative z-10">
            {theme === "dark" ? (
              <SunMediumIcon size={20} />
            ) : (
              <MoonIcon size={16} />
            )}
          </span>
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main content area */}
        <main className="flex-1 relative flex flex-col">
          {/* Background glow and grid texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff10 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          {/* Category header with title and count */}
          <div className="px-16 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-end gap-6"
              >
                <h1 className="text-7xl font-black uppercase tracking-tighter leading-none italic text-foreground/10">
                  {activeCategory}
                </h1>
                <div className="pb-2 border-b-2 border-primary">
                  <span className="text-primary text-xl font-bold tracking-tighter">
                    {filtered.length.toString().padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Horizontal Scroll Deck */}
          <div
            ref={scrollRef}
            className="flex-1 flex items-center overflow-x-auto no-scrollbar px-16 gap-10 snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((component, index) => {
                const entry =
                  componentRegistry[
                    component.slug as keyof typeof componentRegistry
                  ];

                return (
                  <motion.div
                    key={component.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="snap-center shrink-0"
                  >
                    <Link
                      href={`/components/${component.slug}`}
                      className="group block relative"
                    >
                      {/* Perspective Card */}
                      <div className="w-[380px] h-[480px] bg-linear-to-b from-white/30 to-white/10 dark:from-white/5 dark:to-transparent border border-border p-px group-hover:border-primary/50 hover:transition-colors hover:duration-500">
                        <div className="w-full h-full bg-white dark:bg-[#0c0c0c] flex flex-col relative overflow-hidden">
                          {/* Preview Area */}
                          <div className="flex-1 bg-foreground/4 dark:bg-[#080808] flex items-center justify-center relative dark:group-hover:bg-[#0a0a0a] hover:transition-colors">
                            <div className="transform scale-110 group-hover:scale-125 transition-transform duration-700 ease-out">
                              {entry && (
                                <PreviewRenderer
                                  componentName={entry.previewComponent}
                                  category={entry.category}
                                />
                              )}
                            </div>

                            {/* Corner Decals */}
                            <div className="absolute bottom-4 right-4 h-1 w-8 bg-white/5 group-hover:bg-primary/40 transition-colors" />
                          </div>

                          {/* Info Area */}
                          <div className="h-32 p-6 border-t border-white/5 relative bg-foreground/8 dark:bg-[#0c0c0c] flex flex-col justify-center">
                            <h3 className="text-lg font-bold uppercase tracking-tight text-foreground/90 group-hover:translate-x-1.5 transition-transform duration-300">
                              {component.name}
                            </h3>
                            <p className="text-[12px] text-muted-foreground dark:text-white/30 mt-2 line-clamp-2 leading-relaxed font-sans">
                              {component.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom status bar */}
          <footer className="h-16 border-t border-white/5 px-16 flex items-center gap-12">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-[9px] text-foreground/50 uppercase whitespace-nowrap tracking-widest">
                Scroll_Progress
              </span>
              <div className="h-0.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary/80 origin-left"
                  style={{ scaleX }}
                />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[8px] text-foreground/40 uppercase">
                  Scroll_Direction
                </span>
                <span className="text-[10px] text-primary font-bold">
                  X_AXIS
                </span>
              </div>
              <div className="flex flex-col items-end border-l border-white/10 pl-8">
                <span className="text-[8px] text-foreground/40 uppercase">
                  Refresh_Rate
                </span>
                <span className="text-[10px] text-foreground/80">
                  60Hz_STBL
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
