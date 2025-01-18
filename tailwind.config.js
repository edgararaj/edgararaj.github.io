/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        cube: ['cuberegular', 'sans-serif'],
        primary: ['tt_lakes_neue_trialbold', 'sans-serif'],
        secondary: ['cascadia_code_nf_semibold', 'sans-serif'],
        code: ['cascadia_code_nf_regular', 'sans-serif'],
      },
    },
    colors: {
      primary: '#a3c3cc',
      stroke: '#2b2d33',
      black: '#000000',
      white: '#ffffff',
      gray: {
        400: '#909090',
      },
      'dark-primary': '#16161a',
      'dark-secondary': '#2b2d33',
    },
  },
  plugins: [],
}
