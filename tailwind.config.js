/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'zen-dark': '#1F2937',
        'zen-medium': '#FFFFFF',
        'zen-cream': '#1F2937',
        'zen-gold': '#FF9933',
        'zen-sage': '#FF9933',
        'zen-light': '#4B5563',
        'zen-deep': '#F3F4F6',
        vedic: {
          saffron: '#FF9933',
          'saffron-light': '#FFF4E6',
          'saffron-dark': '#E8872E',
          bg: '#FAFAFA',
          white: '#FFFFFF',
          dark: '#1F2937',
          body: '#4B5563',
          border: '#E5E7EB',
          success: '#10B981',
          forest: '#0D1F0F',
          gold: '#C9A84C',
          sage: '#7A9E7E',
          cream: '#F5F0E8',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'breathe': 'breathe 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fade-up 0.8s ease-out 0.4s forwards',
        'fade-up-delay-3': 'fade-up 0.8s ease-out 0.6s forwards',
        'fade-up-delay-4': 'fade-up 0.8s ease-out 0.8s forwards',
        'float-up': 'float-up 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.12' },
          '90%': { opacity: '0.08' },
          '100%': { transform: 'translateY(-10vh) rotate(360deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08)',
        'premium': '0 20px 60px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
