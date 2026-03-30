"use client";

import { motion } from "framer-motion";
import { TerminalSquare, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const vibeSteps = [
  "Setup auth routes",
  "Create DB schema",
  "Implement login logic",
  "Add validation"
];

export default function VibeCodingSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-marmot-text z-0">
      <div className="absolute inset-0 z-0 pointer-events-none">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.2, 0.1]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-marmot-orange/40 rounded-full blur-[120px]"
         />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          
          {/* Left Visual Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full flex flex-col gap-6"
          >
             {/* Prompt Box */}
             <div className="bg-[#1C1714] border border-white/10 rounded-2xl p-6 shadow-2xl">
               <div className="flex items-center gap-3 text-marmot-orange mb-4 font-mono text-sm">
                 <TerminalSquare className="w-4 h-4" />
                 <span>Prompt Workspace</span>
               </div>
               <p className="text-[#D5CDC4] text-lg font-medium leading-relaxed font-sans">
                 &quot;Create authentication system&quot;
               </p>
             </div>

             {/* Output Box */}
             <div className="bg-[#120E0C] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-marmot-orange/50 shadow-[0_0_15px_rgba(244,162,97,0.8)]" />
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-6 pl-4"
                >
                  <div className="text-[#8B7D74] text-xs font-mono uppercase tracking-widest mb-2">Executing Plan...</div>
                  {vibeSteps.map((step, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                      }}
                      className="flex items-center gap-4 text-white group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-marmot-orange group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(244,162,97,0.3)] rounded-full" />
                      <span className="text-base font-medium">{step}</span>
                    </motion.div>
                  ))}
                </motion.div>
             </div>
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-6 leading-tight"
            >
              Build with AI, <span className="text-transparent bg-clip-text bg-gradient-to-r from-marmot-orange to-amber-500">not confusion</span>
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-lg md:text-xl text-[#D5CDC4] mb-8 leading-relaxed max-w-lg"
            >
              Get step-by-step prompts to build your product faster.
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
