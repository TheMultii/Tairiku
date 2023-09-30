/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        primary: '#1ab69d',
        'dark-100': '#181818',
        'dark-200': '#1c1c1c',
        'dark-300': '#4a4a4a',
      },
    },
    keyframes: {
      'scroll-down': {
        '0%': { height: '0' },
        '50%': { height: '100%' },
        '70%': {
          height: '100%',
          transform: 'scaleY(0.5)',
          transformOrigin: 'bottom',
        },
        '100%': {
          height: '100%',
          transform: 'scaleY(0)',
          transformOrigin: 'bottom',
        },
      },
      'bg-img-unzoom': {
        '0%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
      },
      lineAnim: {
        '0%': { left: '-40%' },
        '50%': { left: '20%', width: '100%' },
        '100%': { left: '100%', width: '80%' },
      },
    },
    animation: {
      'scroll-down': 'scroll-down 2s ease-in-out infinite',
      'bg-img-unzoom': 'bg-img-unzoom 10s ease-out',
      lineAnim: 'lineAnim 1.5s linear infinite',
    },
  },
  plugins: [],
}
