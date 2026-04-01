"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Cpu, Target, Layers, Zap } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for the spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-background selection:bg-primary/30 overflow-hidden hide-scrollbar"
    >
      {/* BACKGROUND LAYER: KINETIC GRID & SPOTLIGHT */}
      <motion.div
        style={{ opacity, scale }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        {/* Dynamic Spotlight */}
        <motion.div
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, rgba(183, 229, 186, 0.08), transparent 80%)`,
            ),
          }}
          className="absolute inset-0 z-10"
        />
      </motion.div>

      <section className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 px-6">
        {/* TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-8 bg-linear-to-r from-transparent to-primary/50" />
          <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md flex items-center gap-2">
            <Cpu size={10} className="text-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase">
              {/* V.02_Stable */}
              system_engaged
            </span>
          </div>
          <div className="h-px w-8 bg-linear-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* MAIN HEADING */}
        <div className="relative mb-8 text-center">
          <motion.h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.8] uppercase text-foreground">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              Your UI got
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block relative"
            >
              Some{" "}
              <span className="italic font-extralight text-primary font-serif lowercase tracking-tight">
                moves
              </span>
            </motion.span>
          </motion.h1>

          {/* Subtle line reveal */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-md text-center text-xs md:text-sm text-muted-foreground font-mono tracking-widest leading-loose mb-12 uppercase"
        >
          Breaking the 4th wall of digital interaction.
          <br />
          Physics derived motion for the modern architect.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <Link
            href="/explore"
            className="group relative px-12 py-5 bg-transparent border border-black/20 dark:border-white/10 overflow-hidden transition-all duration-300 hover:border-primary/50"
          >
            <span className="relative z-10 flex items-center gap-3 text-black dark:text-white font-mono text-[10px] tracking-[0.4em] uppercase dark:group-hover:text-black transition-colors duration-300">
              [ Initialize_Core ]
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-[#b7e5ba] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
          </Link>

          {/* Bottom: Specs (Properly anchored) */}
          <div className="grid grid-cols-3 gap-8 md:gap-24 w-full max-w-lg border-t border-white/5 pt-4">
            {[
              { label: "Physics", icon: <Target size={14} />, val: "Enabled" },
              { label: "Layers", icon: <Layers size={14} />, val: "Infinite" },
              { label: "Core", icon: <Zap size={14} />, val: "Atomic" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {stat.icon}
                </div>
                <span className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </span>
                <span className="text-foreground text-[10px] font-bold tracking-tighter uppercase ">
                  {stat.val}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SIDE DECORATION: VERTICAL DATA STREAM */}
        <div
          className={cn(
            "absolute right-12 bottom-12 flex flex-col items-end gap-2 overflow-hidden h-32 hidden",
            "md:flex",
          )}
        >
          {["01_MOTION", "02_GRAVITY", "03_SPRING", "04_INERTIA"].map(
            (text, i) => (
              <motion.span
                key={text}
                animate={{ y: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: i * 0.5 }}
                className="text-[9px] font-mono tracking-widest text-muted-foreground whitespace-nowrap"
              >
                {text}
              </motion.span>
            ),
          )}
        </div>
      </section>

      {/* FOOTER DETAIL */}
      <footer className="fixed bottom-0 w-full px-8 py-4 flex justify-between items-center text-[10px] text-black/20 dark:text-white/20 pointer-events-none font-inter">
        <div>STATUS: STABLE // ENV: PRODUCTION</div>
        <div>© 2026 KINETIQ_UI</div>
      </footer>
    </div>
  );
}
