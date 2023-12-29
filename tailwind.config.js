/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': 'hsl(0, 0%, 100%)',
        'off-white': 'hsl(0, 0%, 94%)',
        'light-gray': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-black': 'hsl(0, 0%, 8%)',
        'purple': 'hsl(259, 100%, 65%)',
        'light-red': 'hsl(0, 100%, 67%)',
      },
    },
    fontFamily: {
      'poppins': 'Poppins',
    },
    fontSize: {
      '104': ['6.5rem', {lineHeight: '6.5rem',}],
      '56': ['3.5rem', {lineHeight: '3.5rem',}],
      '32': ['2rem', {lineHeight: '3rem',}],
      '20': ['1.25rem', {lineHeight: '1.875rem',}],
      '14': ['0.875rem', {lineHeight: '1.3125rem',}],
      '12': ['0.75rem', {lineHeight: '1.125rem',}],
    },
    letterSpacing: {
      tightest: '-.02em',
      wide: '.01em',
      widest: '.25em',
    }
  },
  plugins: [],
}

