"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/auth/actions";

export default function HeroSection() {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    getCurrentUser().then(user => setUserExists(!!user));
  }, []);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-24 overflow-hidden min-h-[85vh] flex items-center">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="flex flex-col gap-6 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-marmot-card border border-marmot-border/60 w-fit">
            <span className="flex h-2 w-2 rounded-full bg-marmot-orange animate-pulse"></span>
            <span className="text-xs font-semibold text-marmot-brown tracking-wide uppercase">Launching on May 15th, 2026</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-heading font-extrabold text-marmot-text leading-[1.1] tracking-tight">
            The AI Project Manager that <span className="text-transparent bg-clip-text bg-gradient-to-r from-marmot-orange to-amber-500">gets it done.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-marmot-gray max-w-lg leading-relaxed">
            Stop manually planning sprints and writing tickets. MarmotPM turns your vision into structured architecture and actionable tasks in seconds.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-4 w-full max-w-lg">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={userExists ? "#" : "/login"} className="w-full sm:w-auto">
                <motion.div
                   whileHover={{ scale: 1.03 }}
                   whileTap={{ scale: 0.97 }}
                >
                   <Button size="lg" className="h-14 bg-marmot-orange hover:bg-marmot-orange text-white rounded-full px-8 text-base tracking-wide font-semibold shadow-xl shadow-marmot-orange/20 w-full overflow-hidden relative group">
                     <span className="relative z-10 flex items-center justify-center">
                       Start Building
                     </span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                   </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs text-marmot-gray mt-2">
            Sign up today to get started.
          </motion.p>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div 
          className="relative lg:h-[600px] flex items-center justify-center z-0 lg:ml-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-marmot-orange/10 blur-3xl rounded-full scale-75 animate-pulse" />
          
          {/* Parallax / Breathing container */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.02, 1] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-72 h-72 md:w-[450px] md:h-[450px] z-10 filter drop-shadow-2xl"
          >
            <Image
              src="/logo/marmot-logo.png"
              alt="MarmotPM Mascot"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Floating UI Elements */}
          <motion.div 
            className="absolute top-10 right-0 md:bg-white/80 md:backdrop-blur-md rounded-2xl p-4 shadow-lg border border-marmot-border/50 hidden md:flex items-center gap-3 z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1 },
              x: { duration: 0.8, delay: 1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            <div className="w-10 h-10 rounded-full bg-marmot-teal/10 flex items-center justify-center">
              <span className="text-marmot-teal font-bold border-marmot-teal border-[1px] rounded-full px-2 py-0.5 text-xs">AI</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-marmot-text">Auth System Planned</p>
              <p className="text-xs text-marmot-gray">Generated 5 tickets in 2s</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 left-0 md:bg-white/80 md:backdrop-blur-md rounded-2xl p-4 shadow-lg border border-marmot-border/50 hidden md:flex items-center gap-3 z-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1.2 },
              x: { duration: 0.8, delay: 1.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-marmot-text">Sprint Active</p>
              <p className="text-xs text-marmot-gray">Team velocity: 100%</p>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
