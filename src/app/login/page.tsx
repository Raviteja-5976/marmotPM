import React from 'react'
import LoginComponent from '@/components/auth/LoginComponent'
import ThemeToggle from '@/components/auth/ThemeToggle'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Login to MarmotPM',
  description: 'Secure dual-step authentication into the MarmotPM dashboard.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background transition-colors duration-500 relative overflow-hidden px-4">
      {/* Background blobs for visual interest matching the home page */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
      
      <div className="w-full max-w-md relative flex justify-center items-center mb-8 z-10">
        <Link href="/">
          <div className="flex items-center gap-3">
             <Image 
               src="/logo/marmot-logo.png" 
               alt="MarmotPM" 
               width={50} 
               height={50} 
               className="drop-shadow-md"
             />
             <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                Marmot<span className="text-primary">PM</span>
             </h1>
          </div>
        </Link>
        <div className="absolute right-0">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full z-10">
        <LoginComponent />
      </div>
    </div>
  )
}
