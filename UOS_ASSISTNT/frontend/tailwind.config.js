/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uos: {
          dark: '#143828',
          pine: '#1b4332',
          emerald: '#16a378',
          teal: '#159873',
          bg: '#e9eee9',
          card: '#ffffff',
          accent: '#8b1e22',
          errorBg: '#fef2f2',
          errorText: '#991b1b',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
