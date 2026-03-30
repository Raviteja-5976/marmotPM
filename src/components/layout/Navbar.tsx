"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none"
    >
      <div className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between transition-all duration-300 rounded-full border px-4 py-3 md:px-8 md:py-4 ${
        scrolled ? "bg-marmot-bg/95 backdrop-blur-lg shadow-xl border-marmot-border/60" : "bg-white/90 backdrop-blur-md shadow-lg border-marmot-border/40"
      }`}>
        <Link href="/" className="flex items-center gap-2 z-10 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full border border-marmot-border/50 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo/marmot-logo.png" 
              alt="MarmotPM Logo" 
              fill
              className="object-cover"
            />
          </div>
          <span className="font-heading font-bold text-xl md:text-2xl tracking-tight text-marmot-text">
            Marmot<span className="text-marmot-orange">PM</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10 font-medium text-marmot-gray text-base lg:text-lg">
          <Link href="#problem" className="hover:text-marmot-orange transition-colors">Why Marmot?</Link>
          <Link href="#features" className="hover:text-marmot-orange transition-colors">Features</Link>

        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="#waitlist">
            <Button size="lg" className="bg-marmot-orange hover:bg-marmot-orange/90 text-white rounded-full px-8 py-6 text-base tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-marmot-orange/20">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
