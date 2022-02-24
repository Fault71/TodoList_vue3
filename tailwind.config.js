module.exports = {
  content: [
    './src/App.vue',
    './src/components/TodoListTop.vue',
    './src/components/TodoListMiddle.vue',
    './src/components/TodoListBottom.vue',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
