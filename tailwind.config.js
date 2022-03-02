module.exports = {
  content: [
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    fontSize: {
      'tiny': '.5rem',
      'xs': '.75rem',
      'sm': '.875rem',
      '4xl': '2.25rem',
    },
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
