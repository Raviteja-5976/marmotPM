'use client'

import React, { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2, Mail, Lock, KeyRound, ArrowRight, User } from 'lucide-react'
import { initiateLogin, initiateSignup, verifyAuthOtp } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'

export default function LoginComponent() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [step, setStep] = useState<1 | 2>(1)
  
  // State for Step 1
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // State for Step 2
  const [otp, setOtp] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleModeChange = (newMode: 'login' | 'signup') => {
    setMode(newMode)
    setError(null)
    setSuccess(null)
    setStep(1)
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    
    if (mode === 'login') {
      if (!email || !password) {
        setError('Please fill in all fields.')
        return
      }

      startTransition(async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        const result = await initiateLogin(formData)
        
        if (result?.error) {
          setError(result.error)
        } else if (result?.success) {
          setSuccess(result.message || 'OTP sent successfully.')
          setStep(2)
        }
      })
    } else {
      if (!email || !password || !name || !confirmPassword) {
        setError('Please fill in all fields.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      startTransition(async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('name', name)
        formData.append('confirmPassword', confirmPassword)

        const result = await initiateSignup(formData)
        
        if (result?.error) {
          setError(result.error)
        } else if (result?.success) {
          setSuccess(result.message || 'Account created! OTP sent.')
          setStep(2)
        }
      })
    }
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    
    if (!otp) {
      setError('Please enter the verification code.')
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('otp', otp)

      const result = await verifyAuthOtp(formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess('Authentication successful! Redirecting...')
        setTimeout(() => {
          router.push('/')
        }, 1200)
      }
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card shadow-xl border border-border rounded-3xl p-8 relative overflow-hidden transition-colors duration-500"
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          {step === 1 && (
            <div className="flex p-1 mb-8 bg-muted rounded-xl">
              <button
                type="button"
                disabled={isPending}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === 'login' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleModeChange('login')}
              >
                Login
              </button>
              <button
                type="button"
                disabled={isPending}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === 'signup' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleModeChange('signup')}
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              {step === 1 ? (mode === 'login' ? 'Welcome Back' : 'Create Account') : 'Verify Identity'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === 1 
                ? (mode === 'login' ? 'Enter your credentials to continue' : 'Join us to start building with MarmotPM') 
                : `We've sent a code to ${email}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key={`step1-${mode}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleStep1Submit}
                className="space-y-4"
              >
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all placeholder:text-muted-foreground"
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all placeholder:text-muted-foreground"
                      placeholder="founder@marmotpm.com"
                      disabled={isPending}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all placeholder:text-muted-foreground"
                      placeholder="••••••••"
                      disabled={isPending}
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all placeholder:text-muted-foreground"
                        placeholder="••••••••"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-6 py-3 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-xl flex items-center justify-center transition-all disabled:opacity-70 group"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Login' : 'Create Account'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleStep2Submit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium text-foreground">Verification Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="otp"
                      type="text"
                      maxLength={8}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all placeholder:text-muted-foreground text-center tracking-[0.5em] font-bold text-lg"
                      placeholder="••••••••"
                      disabled={isPending}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-3 mt-6">
                  <button
                    type="submit"
                    disabled={isPending || otp.length < 6}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-xl flex items-center justify-center transition-all disabled:opacity-70 shadow-md shadow-primary/20"
                  >
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Verify & Login'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setOtp(''); setError(null); setSuccess(null); }}
                    disabled={isPending}
                    className="w-full py-3 px-4 bg-background border border-border text-foreground hover:bg-muted font-medium rounded-xl transition-all"
                  >
                    Back to {mode === 'login' ? 'Login' : 'Signup'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Feedback Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 flex items-start space-x-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 flex items-start space-x-3 p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

