"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/Hero";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <Navbar />
      <HeroSection />
    </div>
  );
}
