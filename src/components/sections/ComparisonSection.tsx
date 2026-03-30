"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const theOldWay = [
  "Epics",
  "Stories",
  "Manual planning",
  "Complex workflows"
];

const marmotWay = [
  "Milestones",
  "Tasks",
  "AI guidance",
  "Clear execution path"
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-marmot-orange/5 relative z-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            Built for builders, not managers
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Traditional Tools */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 bg-white/60 rounded-3xl p-10 border border-marmot-border flex flex-col relative z-10"
          >
            <h3 className="text-2xl font-bold text-marmot-text mb-8 font-heading flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
                <X className="w-5 h-5" />
              </span>
              Traditional Tools
            </h3>
            
            <ul className="space-y-4 flex-1">
              {theOldWay.map((item, idx) => (
                <li key={idx} className="flex gap-4 text-marmot-gray items-center py-2 px-4 rounded-xl hover:bg-red-50/50 transition-colors">
                  <X className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Marmot Way */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex-1 bg-marmot-orange rounded-3xl p-10 shadow-xl shadow-marmot-orange/20 flex flex-col relative overflow-hidden z-10"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-white mb-8 font-heading flex items-center gap-3 relative z-10">
              <span className="w-10 h-10 rounded-full bg-white text-marmot-orange flex items-center justify-center shrink-0 shadow-md">
                <Check className="w-5 h-5" />
              </span>
              MarmotPM
            </h3>
            
            <motion.ul 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 flex-1 relative z-10"
            >
              {marmotWay.map((item, idx) => (
                <motion.li 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex gap-4 text-white items-center py-2 px-4 rounded-xl hover:bg-white/10 transition-colors cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-lg">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
