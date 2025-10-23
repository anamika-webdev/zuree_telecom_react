// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#cd1537',
          50: '#fef2f4',
          100: '#fde6e9',
          200: '#fad0d8',
          300: '#f7a9b9',
          400: '#f17794',
          500: '#e64b71',
          600: '#cd1537',
          700: '#b91330',
          800: '#99122c',
          900: '#801229',
        },
        secondary: {
          DEFAULT: '#2d3e50',
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b1bcc9',
          400: '#8797ab',
          500: '#697a90',
          600: '#546278',
          700: '#455062',
          800: '#3c4553',
          900: '#2d3e50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'layout': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}




