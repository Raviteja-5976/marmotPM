"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOutAction } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch user securely via server action
    getCurrentUser().then((fetchedUser) => {
      setUser(fetchedUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle outside click for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOutAction();
    setDropdownOpen(false);
    setUser(null);
    router.refresh();
  };

  const displayName = user?.user_metadata?.name || user?.email;

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
        
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-marmot-card hover:bg-marmot-orange/10 border border-marmot-border transition-all duration-300 px-2 py-1.5 pr-3 rounded-full text-marmot-text group"
              >
                <div className="w-8 h-8 bg-marmot-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className={`w-4 h-4 text-marmot-gray transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-background rounded-2xl shadow-xl border border-marmot-border overflow-hidden origin-top-right z-50 flex flex-col"
                  >
                    <div className="px-4 py-3 border-b border-marmot-border bg-muted/30">
                      <p className="text-xs font-semibold text-marmot-gray uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                    </div>
                    <div className="p-2 flex flex-col">
                      <Link 
                        href="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors font-medium"
                      >
                        <UserIcon className="w-4 h-4 text-marmot-gray" />
                        Profile Settings
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium text-left w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <Button size="lg" className="bg-marmot-orange hover:bg-marmot-orange/90 text-white rounded-full px-8 py-6 text-base tracking-wide transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-marmot-orange/20">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
