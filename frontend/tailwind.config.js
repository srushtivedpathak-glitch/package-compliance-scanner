/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          primary: '#0F8F83',
          dark: '#08766D',
          light: '#E6F4F3',
          50: '#F0FAF9',
          100: '#D8F2F0',
          200: '#B2E5E1',
          300: '#7DD1CB',
          400: '#45B8B0',
          500: '#0F8F83',
          600: '#08766D',
          700: '#065F58',
          800: '#054845',
          900: '#043632',
        },
        navy: {
          DEFAULT: '#0B2638',
          light: '#1A3A50',
          50: '#EEF4F8',
        },
        brand: {
          bg: '#F7FAFA',
          sidebar: '#F2F8F8',
          border: '#E4ECEC',
          success: '#18A874',
          warning: '#E6A817',
          danger: '#E34B4B',
          info: '#3478F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(11,38,56,0.06), 0 1px 2px rgba(11,38,56,0.04)',
        'card-hover': '0 10px 25px rgba(11,38,56,0.10), 0 4px 10px rgba(11,38,56,0.06)',
        'sidebar': '2px 0 12px rgba(11,38,56,0.06)',
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
      },
    },
  },
  plugins: [],
}

