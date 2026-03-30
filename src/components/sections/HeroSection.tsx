"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { sendWaitlistOtp, verifyWaitlistOtp } from "@/app/actions/waitlist";

export default function HeroSection() {
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

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "awaiting_otp" | "verifying_otp" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("You're on the list! Keep an eye on your inbox.");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const emailValue = formData.get("email")?.toString();
    if (emailValue) setUserEmail(emailValue);

    startTransition(async () => {
      setStatus("idle");
      setErrorMessage("");
      
      const result = await sendWaitlistOtp(formData);
      
      if (result.success) {
        if (result.alreadyExists) {
          setStatus("success");
          setSuccessMessage(result.message || "You are already in the waitlist.");
        } else {
          setStatus("awaiting_otp");
          setSuccessMessage("You're on the list! Keep an eye on your inbox.");
        }
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to join waitlist. Please try again.");
      }
    });
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 6 || !userEmail) return;
    
    startTransition(async () => {
      setStatus("verifying_otp");
      setErrorMessage("");

      const result = await verifyWaitlistOtp(userEmail, otp);

      if (result.success) {
        setStatus("success");
        setOtp("");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to verify OTP.");
        setStatus("awaiting_otp");
      }
    });
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
            <form action={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            {status === "success" ? (
              <div className="w-full h-14 rounded-full border border-green-200 bg-green-50 backdrop-blur-sm flex items-center justify-center px-6 text-green-700 shadow-sm font-medium">
                {successMessage}
              </div>
            ) : (
               <>
                <div className="relative flex-1 group">
                   <div className="absolute inset-0 bg-marmot-orange/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                   <Input 
                     type="email" 
                     name="email"
                     placeholder="Enter your email" 
                     required
                     disabled={isPending}
                     className="relative h-14 rounded-full border-marmot-border/60 bg-white/80 backdrop-blur-sm px-6 text-base text-marmot-text placeholder:text-marmot-gray focus-visible:ring-2 focus-visible:ring-marmot-orange/50 shadow-sm transition-all w-full"
                   />
                </div>
                <motion.div
                   whileHover={{ scale: 1.03 }}
                   whileTap={{ scale: 0.97 }}
                >
                   <Button type="submit" size="lg" disabled={isPending} className="h-14 bg-marmot-orange hover:bg-marmot-orange text-white rounded-full px-8 text-base tracking-wide font-semibold shadow-xl shadow-marmot-orange/20 w-full sm:w-auto overflow-hidden relative group">
                     <span className="relative z-10 flex items-center justify-center">
                       Join Waitlist
                     </span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                   </Button>
                </motion.div>
                </>
              )}
            </form>
          </motion.div>
          
          {status === "error" && (
            <motion.p variants={itemVariants} className="text-sm font-medium text-red-500 mt-2">
              {errorMessage}
            </motion.p>
          )}

          <motion.p variants={itemVariants} className="text-xs text-marmot-gray mt-2">
            Limited spots available for the private beta.
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

      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <Image src="/logo/marmot-logo.png" width={80} height={80} alt="Loading" className="animate-bounce drop-shadow-2xl" />
          </motion.div>
        </div>
      )}

      {/* OTP Modal */}
      {(status === "awaiting_otp" || status === "verifying_otp") && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative border border-marmot-border/50 text-center"
          >
            <div className="w-16 h-16 bg-marmot-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-marmot-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-marmot-text mb-2">Check your email</h3>
            <p className="text-sm text-marmot-gray mb-6">We've sent a 6-digit code to your email. Please enter it below to verify.</p>
            
            <div className="space-y-4">
              <Input 
                type="text" 
                placeholder="Enter 6-digit code" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest bg-gray-50 border-gray-200"
                disabled={isPending}
              />
              <Button 
                onClick={verifyOtp} 
                disabled={isPending || otp.length < 6}
                type="button"
                className="w-full bg-marmot-orange hover:bg-marmot-orange/90 text-white rounded-full h-12"
              >
                {isPending ? "Verifying..." : "Verify & Join"}
              </Button>
              <button 
                type="button"
                onClick={() => { setStatus("idle"); setOtp(""); }}
                className="text-sm text-marmot-gray hover:text-marmot-text transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
             {errorMessage && (
                <p className="text-sm font-medium text-red-500 mt-4">
                  {errorMessage}
                </p>
              )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
