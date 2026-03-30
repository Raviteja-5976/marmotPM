"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp, hoverButton } from "@/lib/motion";
import { useState, useTransition } from "react";
import Image from "next/image";
import { sendWaitlistOtp, verifyWaitlistOtp } from "@/app/actions/waitlist";

export default function CtaSection() {
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
              Be among the first to experience MarmotPM.
            </p>
            
            <form className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3 relative z-10" action={handleSubmit}>
              {status === "success" ? (
                <div className="w-full h-14 rounded-full border border-green-200 bg-green-50 backdrop-blur-sm flex items-center justify-center px-6 text-green-700 shadow-sm font-medium">
                  {successMessage}
                </div>
              ) : (
                 <>
                  <div className="relative flex-1 group">
                     <div className="absolute inset-0 bg-marmot-orange/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                     <Input 
                       type="email" 
                       name="email"
                       placeholder="Enter your email" 
                       required
                       disabled={isPending}
                       className="relative h-14 rounded-full border-white bg-white/80 backdrop-blur-sm px-6 text-marmot-text placeholder:text-marmot-gray focus-visible:ring-2 focus-visible:ring-marmot-orange/50 shadow-sm transition-all text-base"
                     />
                  </div>
                  <motion.div whileHover={hoverButton} whileTap={{ scale: 0.97 }}>
                     <Button type="submit" size="lg" disabled={isPending} className="h-14 bg-marmot-text hover:bg-marmot-text/90 text-white rounded-full px-8 text-base tracking-wide font-semibold shadow-xl shadow-marmot-text/30 w-full sm:w-auto overflow-hidden relative group">
                       <span className="relative z-10 flex items-center justify-center">
                         Join Waitlist
                       </span>
                       <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                     </Button>
                  </motion.div>
                </>
              )}
            </form>
            
            {status === "error" && (
              <p className="text-sm font-medium text-red-500 mt-3">{errorMessage}</p>
            )}

            <p className="text-sm mt-6 text-marmot-brown/60 font-medium">Get 1 month free Pro access</p>
          </div>
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
