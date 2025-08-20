/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6', // Bright Purple
        'primary-dark': '#7C3AED', // Darker purple
        'primary-light': '#A78BFA', // Light purple
        accent: '#84FF00', // Bright Lime
        'accent-light': '#BFFF00', // Light lime
        'accent-dark': '#65CB00', // Dark lime
        neon: {
          purple: '#8B5CF6',
          lime: '#84FF00',
          pink: '#FF00FF',
          cyan: '#00FFFF',
          yellow: '#FFFF00',
        },
        secondary: '#5B6170',
        yellow: '#FFFF00',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
        success: '#10B981',
        warning: '#FBBF24',
        danger: '#EF4444',
        dark: '#0A0A0A',
        'text-primary': '#000000',
        'text-secondary': '#5B6170',
        'text-white': '#FFFFFF',
        'bg-light': '#FAFAFA',
        'bg-dark': '#0A0A0A',
        white: '#FFFFFF',
        black: '#000000',
      },
      backgroundImage: {
        'none': 'none',
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'switzer': ['Switzer Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' 
          },
        },
        pulseGlow: {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hover': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'float': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'glow-lime': '0 0 40px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
        'glow-purple-sm': '0 0 15px rgba(139, 92, 246, 0.6)',
        'glow-lime-sm': '0 0 15px rgba(139, 92, 246, 0.6)',
        'neon-purple': '0 0 8px #8B5CF6, 0 0 16px #8B5CF6, 0 0 24px #8B5CF6',
        'neon-lime': '0 0 8px #8B5CF6, 0 0 16px #8B5CF6, 0 0 24px #8B5CF6',
      },
      dropShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.7)',
        'glow-lime': '0 0 20px rgba(139, 92, 246, 0.7)',
        'neon': '0 0 25px rgba(139, 92, 246, 0.8)',
      },
    },
  },
  plugins: [],
}