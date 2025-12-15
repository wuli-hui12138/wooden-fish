/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500 equivalent, adjusted for theme
        secondary: '#a855f7', // Purple-500
        background: '#f8fafc', // Slate-50
      }
    },
  },
  plugins: [],
}
