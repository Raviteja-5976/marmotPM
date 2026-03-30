"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fadeInUp } from "@/lib/motion";

const conversation = [
  { role: "user", text: "Build a project management tool" },
  { role: "system", text: "Generating features..." },
  { role: "system", text: "Creating roadmap..." },
  { role: "system", text: "Designing database..." },
  { role: "system", text: "Suggesting tech stack..." },
  { role: "ai", text: "I've drafted 5 core modules: Auth, Tasks, Boards, Teams, and Billing. The database schema in PostgreSQL is ready for your review." }
];

export default function AiDemoSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const interval = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => {
          current += 1;
          setVisibleMessages(current);
          setIsTyping(false);
          if (current >= conversation.length) {
            clearInterval(interval);
          }
        }, 1000); // typing delay
      }, 2000); // interval between messages
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section id="demo" className="py-24 bg-marmot-bg/40 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-marmot-text tracking-tight mb-4"
          >
            See MarmotPM in action
          </motion.h2>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-marmot-gray"
          >
            Describe your idea — MarmotPM handles the planning.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto" ref={containerRef}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-[2rem] border border-marmot-border/60 shadow-2xl shadow-marmot-orange/5 overflow-hidden"
          >
             {/* Header */}
             <div className="bg-marmot-bg/50 border-b border-marmot-border p-4 flex items-center gap-3">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
               </div>
               <div className="mx-auto font-medium text-sm text-marmot-gray">Marmot AI Assistant</div>
               <div className="w-12" /> {/* spacer */}
             </div>

             {/* Chat container */}
             <div className="h-[450px] overflow-y-auto p-6 flex flex-col gap-6 bg-gradient-to-b from-white to-marmot-bg/20">
               {conversation.slice(0, visibleMessages).map((msg, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ duration: 0.4 }}
                   className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                 >
                   {msg.role !== 'system' && (
                     <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-sm overflow-hidden border ${msg.role === 'ai' ? 'border-marmot-teal/30 bg-marmot-teal/10' : 'border-marmot-border bg-marmot-card'}`}>
                        {msg.role === 'ai' ? (
                          <Image src="/logo/marmot-logo.png" alt="AI" width={32} height={32} className="object-cover scale-150 translate-y-1" />
                        ) : (
                          <span className="text-xs font-bold text-marmot-brown">YOU</span>
                        )}
                     </div>
                   )}
                   
                   {msg.role === 'system' ? (
                     <div className="w-full flex justify-center py-1">
                       <span className="text-xs font-semibold text-marmot-orange uppercase tracking-widest animate-pulse border border-marmot-orange/30 rounded-full px-5 py-2 bg-marmot-orange/5 shadow-sm">
                         {msg.text}
                       </span>
                     </div>
                   ) : (
                     <div className={`max-w-[75%] p-5 rounded-2xl ${msg.role === 'user' ? 'bg-marmot-card text-marmot-text rounded-tr-sm border border-marmot-border font-medium text-base shadow-sm' : 'bg-[#F2FAF8] text-marmot-text rounded-tl-sm border border-marmot-teal/20 text-base shadow-sm'}`}>
                        <p className="leading-relaxed">{msg.text}</p>
                     </div>
                   )}
                 </motion.div>
               ))}
               
               {isTyping && visibleMessages < conversation.length && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex gap-4 items-center"
                 >
                   <div className="w-10 h-10 rounded-full bg-marmot-teal/10 border border-marmot-teal/30 shrink-0 flex items-center justify-center overflow-hidden">
                      <Image src="/logo/marmot-logo.png" alt="AI" width={32} height={32} className="object-cover scale-150 translate-y-1" />
                   </div>
                   <div className="p-4 rounded-2xl rounded-tl-sm bg-[#F2FAF8] border border-marmot-teal/20 flex items-center gap-1.5 shadow-sm h-[48px]">
                     <span className="w-2 h-2 bg-marmot-teal/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-2 h-2 bg-marmot-teal/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-2 h-2 bg-marmot-teal/50 rounded-full animate-bounce"></span>
                   </div>
                 </motion.div>
               )}
               
               {/* Auto-scroll anchor */}
               <div className="h-4" />
             </div>
             
             {/* Input Area */}
             <div className="p-4 bg-white border-t border-marmot-border m-3 rounded-xl shadow-sm mx-4 flex items-center gap-4">
               <div className="flex-1 text-base text-marmot-gray/50 px-3 font-medium cursor-text">Describe an idea...</div>
               <motion.div 
                 whileHover={{ scale: 1.05 }} 
                 whileTap={{ scale: 0.95 }}
                 className="w-12 h-12 bg-marmot-orange rounded-full flex items-center justify-center text-white cursor-pointer shadow-md shadow-marmot-orange/30"
               >
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84553 7.90002H9C9.22091 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22091 7.10002 9 7.10002H4.84553Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
