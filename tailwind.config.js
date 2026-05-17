/** @type {import('tailwindcss').Config} */
const primaryScale = {
  50: '#d9ebfd',
  100: '#d9ebfd',
  200: '#a8c2df',
  300: '#a8c2df',
  400: '#002a8d',
  500: '#002a8d',
  600: '#002a8d',
  700: '#002a8d',
  800: '#002a8d',
  900: '#002a8d',
}

const buttonScale = {
  50: '#d9ebfd',
  100: '#d9ebfd',
  200: '#a8c2df',
  300: '#a8c2df',
  400: '#fe951f',
  500: '#fe951f',
  600: '#fe951f',
  700: '#002a8d',
  800: '#002a8d',
  900: '#002a8d',
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily:  'Roboto Medium',
      
      colors: {
        brand: {
          ...primaryScale,
        },
        blue: primaryScale,
        sky: primaryScale,
        teal: primaryScale,
        emerald: primaryScale,
        rose: primaryScale,
        pink: primaryScale,
        orange: buttonScale,
        amber: buttonScale,
        red: buttonScale,
        palette: {
          'text-primary': '#002a8d',
          'text-small': '#668ebb',
          'button-primary': '#ff7800',
          'wt-accent': '#7ea500',
          'fonto-light': '#d9ebfd',
        }
      },
      animation: {
        'ring-fill': 'ring-fill 1.4s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'ring-fill': {
          '0%': { 'stroke-dashoffset': '502' },
          '100%': {}
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}
