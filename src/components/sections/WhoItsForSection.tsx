"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, hoverCard } from "@/lib/motion";
import { Laptop, Code, GraduationCap, Building2 } from "lucide-react";

const personas = [
  {
    role: "Indie Hackers",
    desc: "Turn ideas into products faster",
    icon: <Laptop className="w-6 h-6" />,
    color: "bg-amber-100/50 text-amber-600"
  },
  {
    role: "Developers",
    desc: "Skip planning chaos and build with clarity",
    icon: <Code className="w-6 h-6" />,
    color: "bg-marmot-orange/10 text-marmot-orange"
  },
  {
    role: "Students",
    desc: "Learn by building real projects step-by-step",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "bg-indigo-100/50 text-indigo-600"
  },
  {
    role: "Startups",
    desc: "Align teams and execute faster",
    icon: <Building2 className="w-6 h-6" />,
    color: "bg-marmot-teal/10 text-marmot-teal"
  }
];

export default function WhoItsForSection() {
  return (
    <section className="py-24 bg-marmot-card/50 relative z-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            Built for modern builders
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {personas.map((persona, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={hoverCard}
              className="bg-white rounded-[2rem] p-8 border border-marmot-border shadow-sm transition-all duration-300 group"
            >
              <div className={`w-14 h-14 ${persona.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                 <motion.div
                   whileHover={{ y: -8, scale: 1.1 }}
                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
                 >
                    {persona.icon}
                 </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-marmot-text mb-3 font-heading tracking-tight">{persona.role}</h3>
              <p className="text-marmot-gray leading-relaxed text-sm">
                {persona.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
