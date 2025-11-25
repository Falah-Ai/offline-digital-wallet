/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        absher: {
          50: '#f6fbf7',
          100: '#e6f6ec',
          200: '#c9ecd6',
          300: '#9fe0b8',
          400: '#5fd08b',
          500: '#16a34a',
          600: '#148d3f',
          700: '#0f6b30',
          800: '#0b4a20',
          900: '#072f13'
        }
      },
      fontFamily: {
        sans: ["Noto Sans Arabic", 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial'],
      }
    }
  },
  plugins: [],
}
