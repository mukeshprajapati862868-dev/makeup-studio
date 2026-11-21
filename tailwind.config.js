/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        champagne: {
          50: '#fef9f3',
          100: '#fef0e0',
          200: '#fde0c0',
          300: '#fbc890',
          400: '#f8a85a',
          500: '#f58a2f',
          600: '#e66d1a',
          700: '#bf5217',
          800: '#98421a',
          900: '#7b3818',
        },
        ivory: '#FFFEF7',
        charcoal: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(236, 72, 153, 0.08)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 20px rgba(245, 138, 47, 0.15)',
      }
    },
  },
  plugins: [],
}
