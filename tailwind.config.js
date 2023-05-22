/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "index.html",
];
export const theme = {
  extend: {},
  screens: {
    'xsm': "400px",
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px'
  },
};
export const plugins = [];

