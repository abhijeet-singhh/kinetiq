"use client";

import { notFound } from "next/navigation";
import { use, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeftIcon,
  Fingerprint,
  Copy,
  Check,
  Terminal,
  Layers,
  SunMediumIcon,
  MoonIcon,
} from "lucide-react";

import { components } from "@/content/components";
import { componentRegistry } from "@/components/registry";
import PreviewRenderer from "@/components/PreviewRenderer";
import { useAppTheme } from "@/components/theme-context";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ComponentPage({ params }: Props) {
  const { slug } = use(params);
  const scrollRef = useRef(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const { theme, toggleTheme } = useAppTheme();

  const component = components.find((c) => c.slug === slug);
  const entry = componentRegistry[slug as keyof typeof componentRegistry];

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (!component || !entry) return notFound();

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden font-mono selection:bg-primary/30">
      {/* ─── TOP NAVIGATION ─────────────────────────────────── */}
      <header className="h-16 border-b border-border/60 px-8 flex items-center justify-between z-50 bg-background backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link
            href="/explore"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="size-3 group-hover:-translate-x-1 transition-transform" />
            <span className="group-hover:tracking-[0.2em] transition-all">
              Back to explore
            </span>
          </Link>
          <div className="h-4 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-80">
              Module_{component.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end opacity-40 hover:opacity-100 transition-opacity cursor-default">
            <span className="text-[7px] uppercase tracking-tighter">
              Hash_Reference
            </span>
            <span className="text-[10px] font-light">
              0x_{slug.toUpperCase()}
            </span>
          </div>
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
          <button
            onClick={() => setShowDocs((prev) => !prev)}
            className="text-[11px] uppercase tracking-widest text-background px-4 py-2.5 bg-primary cursor-pointer"
          >
            {showDocs ? "CLOSE_DOCS" : "OPEN_DOCS"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* ─── LEFT SIDE: VISUAL LAB (Fixed) ────────────────────────────────── */}
        <motion.aside
          animate={{ width: showDocs ? "50%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-col border-r border-border/60 bg-background overflow-hidden"
        >
          {/* Ambient Background UI */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff10 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="p-12 relative z-10 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-auto"
            >
              <h1 className="text-6xl font-black uppercase tracking-tighter italic text-foreground/10 leading-none">
                {component.name}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-12 bg-primary" />
                <span className="text-xs text-primary/80 font-bold uppercase tracking-[0.4em]">
                  Asset_Preview
                </span>
              </div>
            </motion.div>

            {/* Preview Container */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 border border-border/80 mt-12 mx-12 rounded-sm bg-background" />
              <div className="relative transform ">
                <PreviewRenderer
                  componentName={entry.previewComponent}
                  category={entry.category}
                />
              </div>

              {/* Metadata Overlay */}
              <div className="absolute bottom-5 left-16 flex items-center gap-2">
                <Fingerprint size={12} className="text-primary/60" />
                <span className="text-[8px] text-foreground/25 uppercase tracking-widest">
                  Validated_Component_Structure
                </span>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ─── RIGHT SIDE: DOC TERMINAL ────────────────── */}
        <motion.main
          ref={scrollRef}
          initial={false}
          animate={{ width: showDocs ? "50%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "width" }}
          className={`bg-background selection:bg-primary/30 scrollbar-green ${showDocs ? "overflow-y-auto" : "overflow-hidden"}`}
        >
          <div
            className={`h-full transition-opacity duration-300 ${showDocs ? "opacity-100" : "opacity-0"}`}
          >
            <div className="max-w-3xl mx-auto p-12 md:p-20 space-y-24">
              {/* 1. Context Brief */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-8 group">
                  <Layers
                    size={14}
                    className="text-primary/60 group-hover:text-primary transition-colors"
                  />
                  <h2 className="text-[10px] font-bold text-primary/80 tracking-[0.4em] uppercase">
                    Context_Brief
                  </h2>
                </div>
                <p className="text-xl font-sans text-foreground/60 leading-relaxed font-light italic border-l-2 border-primary/40 pl-8 bg-linear-to-r from-primary/8 to-transparent">
                  {component.description}
                </p>
              </motion.section>

              {/* 2. Installation Terminal */}
              <section>
                <h2 className="text-[10px] font-bold text-foreground/40 tracking-[0.4em] uppercase mb-6 text-center md:text-left">
                  Terminal_Entry
                </h2>
                <div
                  onClick={() => handleCopy("pnpm add kinetiq", "install")}
                  className="group relative cursor-pointer bg-transparent border border-border/60 p-5 rounded-lg hover:border-primary/40 hover:transition-all hover:duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Terminal
                        size={16}
                        className="text-primary animate-pulse"
                      />
                      <code className="text-sm text-foreground">
                        pnpm add kinetiq
                      </code>
                    </div>
                    <div className="text-[10px] font-black text-primary/80 uppercase tracking-widest">
                      {copiedType === "install" ? "SUCCESS" : "COPY_CMD"}
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Implementation Code (Usage) */}
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[10px] font-bold text-primary/80 tracking-[0.4em] uppercase">
                      Usage_Implementation
                    </h2>
                    <span className="text-[9px] text-foreground/30">
                      HOOK_INTERFACE // REACT_19
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(entry.code || "", "impl")}
                    className="text-[10px] text-foreground/40 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                  >
                    {copiedType === "impl" ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedType === "impl" ? "SYNCED" : "COPY_CODE"}
                  </button>
                </div>
                <div className="relative group rounded-xl overflow-hidden bg-background border border-border/60">
                  <div className="h-10 border-b border-border/50 bg-foreground/4 flex items-center px-4 justify-between">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                    </div>
                    <span className="text-[8px] text-foreground/50 uppercase tracking-[0.2em]">
                      Module.tsx
                    </span>
                  </div>
                  <div className="pb-8 px-8 overflow-x-auto bg-[linear-gradient(45deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px]">
                    <pre className="text-[13px] leading-relaxed text-foreground/50 font-mono">
                      <code>
                        {entry.code || "// No implementation logic provided."}
                      </code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* 4. Source Code (The Raw File) */}
              <section className="pb-32">
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[10px] font-bold text-foreground/40 tracking-[0.4em] uppercase">
                      Core_Source
                    </h2>
                    <span className="text-[9px] text-foreground/30">
                      READ_ONLY // SYSTEM_COMPONENT
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(entry.manual || "", "source")}
                    className="text-[10px] text-foreground/40 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                  >
                    {copiedType === "source" ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                    {copiedType === "source" ? "COPIED" : "COPY_RAW"}
                  </button>
                </div>

                <div className="relative group rounded-xl overflow-hidden bg-background border border-border/60">
                  <div className="h-10 border-b border-border/50 bg-foreground/4 flex items-center px-4 justify-between">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                      <div className="size-2 rounded-full bg-neutral-500/20" />
                    </div>
                    <span className="text-[8px] text-foreground/50 uppercase tracking-[0.2em]">
                      Module.tsx
                    </span>
                  </div>

                  {/* Subtle Scanline Effect for Raw Source */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />

                  <div className="pb-8 px-8 max-h-[500px] overflow-y-auto hide-scrollbar relative">
                    <pre className="text-[12px] leading-6 text-foreground/50 font-mono">
                      <code>
                        {entry.manual ||
                          "// Detailed source code missing from registry."}
                      </code>
                    </pre>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.main>
      </div>

      {/* ─── BOTTOM STATUS BAR ─────────────────────────────────────────── */}
      <footer className="h-16 border-t border-border/50 px-8 flex items-center justify-between bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[7px] text-foreground/40 uppercase tracking-[0.3em]">
              <span>Buffer_Status</span>
              <span className="text-primary/80">Ready</span>
            </div>
            <div className="w-56 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-primary shadow-[0_0_8px_primary]"
                style={{ scaleX }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 text-[9px] tracking-[0.4em] text-foreground/30 font-bold">
          <div className="flex items-center gap-3">
            <span className="size-1.5 bg-primary/80 rounded-full animate-pulse shadow-[0_0_5px_var(--color-primary)]" />
            <span>CORE_STABLE</span>
          </div>
          <div className="h-4 w-px bg-foreground/40" />
          <span className="hover:text-primary transition-colors cursor-help">
            © 2026 KINETIQ.OS
          </span>
        </div>
      </footer>
    </div>
  );
}
