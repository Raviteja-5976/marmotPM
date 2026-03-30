"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, hoverCard } from "@/lib/motion";
import { Brain, Pickaxe, Paintbrush } from "lucide-react";

const steps = [
  { 
    step: "01", 
    title: "Plan", 
    desc: "Generate features, sitemap, and architecture instantly.",
    icon: <Brain className="w-8 h-8" />
  },
  { 
    step: "02", 
    title: "Design", 
    desc: "Get UI prompts, validate designs, and define database & backend.",
    icon: <Paintbrush className="w-8 h-8" />
  },
  { 
    step: "03", 
    title: "Build", 
    desc: "Follow milestones, tasks, and AI-guided development steps.",
    icon: <Pickaxe className="w-8 h-8" />
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            How MarmotPM works
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
        >
          {steps.map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={hoverCard}
              className="flex flex-col items-center text-center relative p-8 rounded-3xl bg-marmot-bg/50 border border-marmot-border/60 shadow-sm group"
            >
               <div className="absolute top-4 left-6 text-6xl font-black text-marmot-orange/10 font-heading select-none pointer-events-none transition-transform group-hover:scale-110">
                 {item.step}
               </div>

              <div className="w-20 h-20 rounded-2xl bg-white border border-marmot-border shadow-md flex items-center justify-center mb-8 relative overflow-hidden transition-colors group-hover:border-marmot-orange text-marmot-orange z-10">
                <div className="absolute inset-0 bg-marmot-orange/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.15 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              <h3 className="font-bold text-2xl text-marmot-text mb-4 z-10">{item.title}</h3>
              <p className="text-marmot-gray text-base leading-relaxed max-w-xs z-10">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
