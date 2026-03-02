"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
  MousePointer2,
} from "lucide-react";

const KineticLanding = () => {
  const [copied, setCopied] = useState(false);
  const [tension, setTension] = useState(170);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-fuchsia-500/30">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-md rotate-12" />
          Motion.UI
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">
            Components
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Docs
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Examples
          </a>
          <a href="#" className="hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-20 pb-32 px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tighter">
            INTERFACES <br />
            THAT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-400">
              BREATHE.
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-md mb-10 leading-relaxed">
            A powerful motion-first UI library. Simple to use. Stunning by
            default.
          </p>

          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center gap-4 bg-[#161616] border border-white/10 px-6 py-4 rounded-xl">
              <code className="text-fuchsia-400 font-mono text-sm">
                $ npm i @motion-ui/react
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npm i @motion-ui/react");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy
                    size={18}
                    className="text-gray-500 hover:text-white transition-colors"
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* The 3D Floating Sphere/Blob from Image */}
        <div className="relative flex justify-center">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-80 h-80 md:w-[450px] md:h-[450px]"
          >
            {/* Glass Orb Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-full border border-white/20 backdrop-blur-3xl shadow-2xl" />
            {/* Internal Particles (Simplified representation) */}
            <div className="absolute inset-10 bg-gradient-to-tr from-fuchsia-500/40 via-indigo-500/20 to-transparent rounded-full blur-2xl animate-pulse" />
            <MousePointer2 className="absolute bottom-10 right-10 text-white/50 w-8 h-8 rotate-[-15deg]" />
          </motion.div>
        </div>
      </header>

      {/* COMPONENT SHOWCASE GRID (Bento Style) */}
      <section className="px-10 max-w-7xl mx-auto pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          <ShowcaseCard
            title="Physics-Based Curves"
            desc="Animated motion cards softly pop and scale."
            visual={
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-2xl shadow-lg shadow-fuchsia-500/20" />
            }
          />
          <ShowcaseCard
            title="Contextual Micro-Interactions"
            desc="Animated menus or cascades open smoothly."
            visual={
              <div className="space-y-2 w-full px-12">
                <div className="h-8 bg-white/10 rounded-md border border-white/5 flex items-center px-3 text-[10px] text-gray-400">
                  Submenu <ChevronRight size={10} className="ml-auto" />
                </div>
                <div className="h-8 bg-fuchsia-500/20 rounded-md border border-fuchsia-500/30 flex items-center px-3 text-[10px]">
                  Cascades open
                </div>
                <div className="h-8 bg-white/5 rounded-md border border-white/5 flex items-center px-3 text-[10px] text-gray-400 font-mono italic">
                  Loading...
                </div>
              </div>
            }
          />
          <ShowcaseCard
            title="Effortless State Changes"
            desc="Undulating loading states and motion transitions."
            visual={
              <div
                className="w-full h-12 bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent animate-[shimmer_2s_infinite]"
                style={{
                  clipPath:
                    "polygon(0 50%, 20% 40%, 40% 60%, 60% 30%, 80% 70%, 100% 50%, 100% 100%, 0% 100%)",
                }}
              />
            }
          />
        </div>
      </section>

      {/* THE MOTION SANDBOX SECTION */}
      <section className="bg-[#0D0D0D] border-y border-white/5 py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">The Motion Sandbox</h2>
            <p className="text-gray-500">
              Live demos update in real-time as interactions happen in the demo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls Side */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">
                    Interaction
                  </span>
                  <div className="w-10 h-5 bg-fuchsia-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                    <span>Tension</span>
                    <span>{tension}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={tension}
                    onChange={(e) => setTension(e.target.value)}
                    className="w-full accent-fuchsia-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex justify-center py-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ type: "spring", stiffness: tension }}
                    className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-fuchsia-500 rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Code Side */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 font-mono text-sm overflow-hidden">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <pre className="text-gray-400 leading-relaxed">
                <span className="text-fuchsia-400">export default</span>{" "}
                <span className="text-indigo-400">sayoo</span> {"{"}
                <br />
                &nbsp;&nbsp;const (I) =&gt; ({"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                <span className="text-fuchsia-400">div</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tension: {"{"} (s) =&gt; (
                {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;motion.
                <span className="text-indigo-300">logic</span>(true)
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"}"}) {"}"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
                <br />
                &nbsp;&nbsp;{"}"})<br />
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-32 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative group p-[2px] rounded-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 animate-[spin_3s_linear_infinite]" />
          <div className="relative px-12 py-6 bg-black rounded-full text-xl font-bold group-hover:bg-transparent transition-colors">
            EXPLORE THE DOCS
          </div>
        </motion.button>
      </footer>
    </div>
  );
};

const ShowcaseCard = ({ title, desc, visual }) => (
  <div className="bg-[#141414] border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all group overflow-hidden relative">
    <div className="h-40 flex items-center justify-center mb-6 bg-[#0A0A0A] rounded-2xl border border-white/5 relative overflow-hidden">
      {visual}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default KineticLanding;
