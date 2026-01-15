/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefcfd',
          100: '#d5f6fa',
          200: '#b2eff7',
          300: '#7ce3f2',
          400: '#3ecced',
          500: '#17a1da', // Logo Blue
          600: '#0e81b3',
          700: '#0f6891',
          800: '#135777',
          900: '#154964',
        },
        secondary: '#243E63', // Keeping existing dark blue/gray
        brand: {
          red: '#5D0303',
          green: '#063307',
          blue: '#17A1DA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
