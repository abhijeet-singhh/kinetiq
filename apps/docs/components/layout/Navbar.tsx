"use client";

import Link from "next/link";
import { Menu, MoonIcon, SunMediumIcon, X } from "lucide-react";
import Image from "next/image";
import { useAppTheme } from "../theme-context";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useAppTheme();

  return (
    <nav
      className={cn(
        "absolute top-0 w-full z-50 bg-transparent px-6 py-3 flex justify-between items-center",
        "md:px-14",
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative flex items-center gap-2 font-oxanium font-black tracking-widest text-lg uppercase text-foreground"
      >
        <Image
          src="/logo.png"
          alt="Kinetiq Logo"
          width={32}
          height={32}
          className="object-contain grayscale-50"
        />
        <span className="mt-0.5">kinetiq</span>
      </Link>

      <div className="flex justify-center items-center gap-7">
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] tracking-widest text-muted-foreground uppercase font-inter">
          <Link
            href="/explore"
            className="hover:text-primary transition-colors"
          >
            Components
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Documentation
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Github
          </Link>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-colors rounded-full md:mb-1"
        >
          {theme === "dark" ? (
            <SunMediumIcon size={20} />
          ) : (
            <MoonIcon size={20} />
          )}
        </button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-muted-foreground flex items-center justify-center w-10 h-10 z-60"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background blur/fade overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 z-40 bg-background/50 backdrop-blur-2xl"
            />

            {/* Sliding menu with stagger */}
            <motion.div
              key="menu"
              className="fixed top-0 left-0 right-0 z-50 md:hidden flex flex-col items-center
           w-full max-w-md mx-auto mt-15 rounded-xl overflow-hidden
           bg-background/40 backdrop-blur-lg divide-y divide-border/40 border border-border/30"
              // Parent variants with slide + stagger
              variants={{
                closed: { y: "-100%", opacity: 0 },
                open: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    staggerChildren: 0.15,
                    staggerDirection: -1,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {[
                { href: "/explore", label: "Components" },
                { href: "#", label: "Documentation" },
                { href: "#", label: "Github" },
              ].map(({ href, label }) => (
                <motion.div
                  key={label}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -20 },
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-5 text-sm tracking-widest uppercase
                    text-foreground hover:text-primary transition hover:bg-primary/5"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
