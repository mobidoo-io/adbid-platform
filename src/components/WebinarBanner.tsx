import React, { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

const WebinarBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-accent relative px-4 py-3 border-b-2 border-accent-dark">
      <div className="container-max flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-black animate-pulse" />
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-glow-purple-sm">
            Webinar
          </span>
        </div>
        <p className="text-black text-sm sm:text-base font-bold">
          $100k → $1M: how our client scaled ad spend x10
        </p>
        <span className="hidden sm:inline text-black/70 text-sm font-medium">
          / Aug 14th, 16:00 CET/
        </span>
        <a 
          href="#" 
          className="bg-black text-accent px-4 py-1.5 rounded-full font-bold hover:shadow-neon-lime transition-all text-sm sm:text-base"
        >
          Learn more
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:opacity-70"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default WebinarBanner