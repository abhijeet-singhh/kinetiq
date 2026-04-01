"use client";

import Link from "next/link";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import Image from "next/image";
import { useAppTheme } from "../theme-context";

export default function Navbar() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent px-14 py-3 flex justify-between items-center">
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

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-[10px] tracking-widest text-muted-foreground uppercase font-inter">
        <Link href="/explore" className="hover:text-primary transition-colors">
          Components
        </Link>
        <Link href="#" className="hover:text-primary transition-colors">
          Documentation
        </Link>
        <Link href="#" className="hover:text-primary transition-colors">
          Github
        </Link>
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary transition-colors rounded-full mb-1"
        >
          {theme === "dark" ? (
            <SunMediumIcon size={20} />
          ) : (
            <MoonIcon size={20} />
          )}
        </button>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden">{/* You can add a hamburger menu here */}</div>
    </nav>
  );
}
