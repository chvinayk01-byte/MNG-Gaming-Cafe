/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: '#0e181c',       // Deepest Dark Teal Base
          card: '#15242b',       // Deep Card Teal Background
          surface: '#1b2d36',    // Dark Surface Element
          deep: '#2b6777',       // User Primary Palette (#2b6777)
          mint: '#52ab98',       // User Secondary Mint (#52ab98)
          ice: '#c8d8e4',        // User Ice Accent (#c8d8e4)
          light: '#f2f2f2',      // User Soft Off-White (#f2f2f2)
          white: '#ffffff',      // User Pure White (#ffffff)
        },
        dark: {
          950: '#0e181c',
          900: '#132128',
          800: '#1b2d36',
          700: '#263b46',
          600: '#2b6777',
        },
        neon: {
          cyan: '#52ab98',       // Mint Emerald
          green: '#52ab98',      // Mint Accent
          purple: '#2b6777',     // Deep Teal
          pink: '#c8d8e4',       // Soft Ice Blue
          amber: '#e6a15c',      // Warm Amber Accent
          red: '#e74c3c'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'theme-glow': '0 0 25px rgba(82, 171, 152, 0.25)',
        'teal-glow': '0 0 25px rgba(43, 103, 119, 0.3)',
      }
    },
  },
  plugins: [],
}
