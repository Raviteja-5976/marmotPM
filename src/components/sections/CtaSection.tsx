"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp, hoverButton } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/auth/actions";

export default function CtaSection() {
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    getCurrentUser().then(user => setUserExists(!!user));
  }, []);
  return (
    <section id="waitlist" className="py-32 bg-[#FDF9F3] relative z-0 border-t border-marmot-border/40 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marmot-orange/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-marmot-text tracking-tight mb-6">
            Start building smarter with AI
          </h2>
          <p className="text-lg md:text-xl text-marmot-gray max-w-2xl mx-auto mb-16">
            Stop overthinking. Start building.
          </p>
          
          <div className="bg-[#FFF7D6] rounded-[3rem] p-10 md:p-14 text-center shadow-xl relative overflow-hidden ring-1 ring-marmot-border/40">
            <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-marmot-brown tracking-tight mb-4">
              Launching May 15
            </h3>
            <p className="text-base md:text-lg text-marmot-gray max-w-2xl mx-auto mb-10">
              Join now to experience MarmotPM.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3 relative z-10">
              <Link href={userExists ? "#" : "/login"} className="w-full sm:w-auto">
                <motion.div whileHover={hoverButton} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="h-14 bg-marmot-text hover:bg-marmot-text/90 text-white rounded-full px-8 text-base tracking-wide font-semibold shadow-xl shadow-marmot-text/30 w-full overflow-hidden relative group">
                      <span className="relative z-10 flex items-center justify-center">
                        Start Building
                      </span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Button>
                </motion.div>
              </Link>
            </div>

            <p className="text-sm mt-6 text-marmot-brown/60 font-medium">Get 1 month free Pro access</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
