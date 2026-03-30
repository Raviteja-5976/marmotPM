"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, hoverCard } from "@/lib/motion";
import { Lightbulb, ListPlus, Map, Database, Server, Cog, Rocket } from "lucide-react";

const flowNodes = [
  { id: 1, label: "Idea", icon: <Lightbulb className="w-5 h-5" />, color: "text-amber-500" },
  { id: 2, label: "Features", icon: <ListPlus className="w-5 h-5" />, color: "text-marmot-orange" },
  { id: 3, label: "Sitemap", icon: <Map className="w-5 h-5" />, color: "text-marmot-brown" },
  { id: 4, label: "DB Design", icon: <Database className="w-5 h-5" />, color: "text-marmot-teal" },
  { id: 5, label: "Backend", icon: <Server className="w-5 h-5" />, color: "text-indigo-400" },
  { id: 6, label: "Build", icon: <Cog className="w-5 h-5" />, color: "text-marmot-gray" },
  { id: 7, label: "Launch", icon: <Rocket className="w-5 h-5" />, color: "text-green-500" }
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-marmot-card/30 relative overflow-hidden z-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            One system to plan and build everything
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-marmot-gray"
          >
            From idea to launch — MarmotPM guides every step with AI.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto mt-16 pb-12 overflow-x-auto lg:overflow-visible">
          {/* Node Flow Track */}
          <div className="flex items-center min-w-[900px] justify-between relative px-8 py-10">
            {/* Connecting Line (Base) */}
            <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-marmot-border -translate-y-1/2 z-0" />
            
            {/* Connecting Line (Animated draw) */}
            <motion.div 
               className="absolute top-1/2 left-16 h-1 bg-gradient-to-r from-marmot-orange to-marmot-teal -translate-y-1/2 z-0 rounded-full origin-left"
               initial={{ width: 0 }}
               whileInView={{ width: "calc(100% - 128px)" }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Nodes */}
            <motion.div 
               variants={staggerContainer}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
               className="flex w-full justify-between relative z-10"
            >
              {flowNodes.map((node) => (
                <motion.div 
                  key={node.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  whileHover={hoverCard}
                  className="flex flex-col items-center group relative cursor-pointer"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Pill Node */}
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-marmot-border shadow-md group-hover:border-marmot-orange transition-colors relative z-10">
                    <div className={`${node.color} group-hover:scale-110 transition-transform`}>
                      {node.icon}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute top-16 whitespace-nowrap text-sm font-semibold text-marmot-gray group-hover:text-marmot-text transition-colors">
                    {node.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="text-center mt-12 relative z-10">
           <motion.p 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="text-marmot-brown font-semibold bg-white/60 inline-flex px-6 py-2 rounded-full border border-marmot-border/50 shadow-sm"
           >
             Stop guessing. Follow a clear, AI-generated path.
           </motion.p>
        </div>
      </div>
    </section>
  );
}
