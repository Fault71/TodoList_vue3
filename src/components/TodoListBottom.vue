<template>
  <div
    class="flex flex-row flex-nowrap justify-between items-center w-full h-5 bg-white"
    v-show="total"
  >
    <div class="pl-1.5 cursor-default">
      {{leftTodo}} items left
    </div>
    <div>
      <button
        class="inline-block p-0.5 mx-px border border-white hover:border-yellow-200"
        @click="allButton"
      >
        All
      </button>
      <button
        class="inline-block p-0.5 mx-px border border-white hover:border-yellow-200"
        @click="activeButton"
      >
        Active
      </button>
      <button
        class="inline-block p-0.5 mx-px border border-white hover:border-yellow-200"
        @click="completedButton"
      >
        Completed
      </button>
    </div>
    <button
      class="hover:underline pr-1.5"
      v-show="clearDisplay()"
      @click="clearCompleted"
    >
      Clear completed
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TodoListBottom',

  props: {
    todos: Array,
    clearTodo: Function,
  },

  emits: ['clearTodo', 'getVisibility'],

  setup(props, context) {
    const total = computed(() => props.todos.length);

    const leftTodo = computed(() => props.todos.reduce((pre, cur) => {
      if (cur.completed !== true) pre += 1;
      return pre;
    }, 0));

    function clearCompleted() {
      context.emit('clearTodo');
    }

    function allButton() {
      context.emit('getVisibility', 'all');
    }

    function activeButton() {
      context.emit('getVisibility', 'active');
    }

    function completedButton() {
      context.emit('getVisibility', 'completed');
    }

    function clearDisplay() {
      if (props.todos.length - props.leftTodo <= 0) return false;
      return true;
    }

    return {
      total,
      leftTodo,
      clearCompleted,
      allButton,
      activeButton,
      completedButton,
      clearDisplay,
    };
  },

};
</script>

<style scoped>

</style>
