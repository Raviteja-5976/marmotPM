'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <button
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      className="p-2.5 rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300 shadow-sm border border-border/50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  )
}
