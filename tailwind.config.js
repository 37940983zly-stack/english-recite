/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adventure Theme Colors
        adventure: {
          // Primary: Treasure gold and adventure blue
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },
          // Quest green for success
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          },
          // Challenge orange/red
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
          },
        },
        // Achievement Metals
        metal: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        },
      },
      boxShadow: {
        // Game-style shadows
        'adventure': '4px 4px 0px 0px rgba(0, 0, 0, 0.15)',
        'adventure-lg': '8px 8px 0px 0px rgba(0, 0, 0, 0.15)',
        'adventure-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.15)',
        // Glow effects for achievements
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
      },
      backgroundImage: {
        // Adventure patterns
        'adventure-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'treasure-gradient': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'quest-gradient': 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      },
      animation: {
        // Game-inspired animations
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'pop-in': 'pop-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up': 'slide-up 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
