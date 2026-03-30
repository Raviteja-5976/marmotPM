"use client";

import { motion } from "framer-motion";
import { Wrench, Network, LayoutTemplate, Users } from "lucide-react";
import { staggerContainer, fadeInUp, hoverCard } from "@/lib/motion";

const problems = [
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Too many tools, no clear flow",
    desc: "Bouncing between Notion, Jira, Linear, and Slack just to figure out what a single feature is supposed to do."
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Don't know what to build next",
    desc: "Endless backlog grooming sessions trying to decide priorities, while engineers wait for actionable tasks."
  },
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "Planning feels overwhelming",
    desc: "Writing detailed specifications and translating them into technical architecture takes days of manual effort."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Teams get stuck and confused",
    desc: "Designers, product managers, and developers lose context in translation, leading to broken products."
  }
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-white/60 relative z-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text mb-6 tracking-tight leading-tight"
          >
            Building products is <span className="text-marmot-orange">harder</span> than it should be
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-marmot-gray"
          >
            You start with an idea, but end up stuck in tools, decisions, and confusion.
          </motion.p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {problems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={hoverCard}
              className="bg-[#F5E6D3] rounded-2xl p-8 shadow-sm transition-all duration-300 group"
            >
              <motion.div 
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-marmot-orange mb-6 shadow-sm duration-300 group-hover:bg-marmot-orange group-hover:text-white"
                whileHover={{ rotate: 5 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-marmot-text mb-3">{item.title}</h3>
              <p className="text-marmot-gray leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
