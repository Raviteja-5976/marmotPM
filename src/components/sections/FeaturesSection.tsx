"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, hoverCard } from "@/lib/motion";
import { 
  FileText, Wand2, Map, Layers, Layout, 
  GitMerge, Route, Terminal, Activity, Bug, Users 
} from "lucide-react";

const planningFeatures = [
  { title: "Turn idea into structured PRD", icon: <FileText className="w-5 h-5" /> },
  { title: "Generate features automatically", icon: <Wand2 className="w-5 h-5" /> },
  { title: "Create sitemap & user flows", icon: <Map className="w-5 h-5" /> },
  { title: "Suggest tech stack & architecture", icon: <Layers className="w-5 h-5" /> },
  { title: "Generate UI prompts", icon: <Layout className="w-5 h-5" /> }
];

const buildFeatures = [
  { title: "Milestones → Tasks → Subtasks system", icon: <GitMerge className="w-5 h-5" /> },
  { title: "AI-generated dev roadmap", icon: <Route className="w-5 h-5" /> },
  { title: "Vibe coding prompts", icon: <Terminal className="w-5 h-5" /> },
  { title: "Real-time progress tracking", icon: <Activity className="w-5 h-5" /> },
  { title: "AI debugging assistant", icon: <Bug className="w-5 h-5" /> },
  { title: "Team collaboration with @marmot", icon: <Users className="w-5 h-5" /> }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white relative z-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            Everything you need to plan and build
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Group 1 */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-heading text-marmot-brown mb-8 border-b border-marmot-border pb-4"
            >
              Smart Planning Engine
            </motion.h3>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4"
            >
              {planningFeatures.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 25px -5px rgba(244,162,97,0.15)" }}
                  className="bg-marmot-card/40 p-5 rounded-2xl border border-marmot-border/60 transition-all duration-300 flex items-center gap-4 cursor-default group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border shadow-sm flex items-center justify-center text-marmot-orange group-hover:bg-marmot-orange group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-marmot-text">{feature.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Group 2 */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-heading text-marmot-teal mb-8 border-b border-marmot-border pb-4"
            >
              AI Build Workspace
            </motion.h3>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4"
            >
              {buildFeatures.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 25px -5px rgba(95,179,162,0.15)" }}
                  className="bg-[#F2FAF8] p-5 rounded-2xl border border-marmot-teal/10 transition-all duration-300 flex items-center gap-4 cursor-default group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-marmot-teal/20 shadow-sm flex items-center justify-center text-marmot-teal group-hover:bg-marmot-teal group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-marmot-text">{feature.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
