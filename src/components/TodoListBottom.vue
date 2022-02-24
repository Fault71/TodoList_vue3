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

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';

interface Todo {
  id: number,
  name: string,
  completed: boolean,
  uneditable :boolean
};

export default defineComponent({
  name: 'TodoListBottom',

  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },

  emits: ['clearTodo', 'getVisibility'],

  setup(props, context) {
    const total = computed(() => props.todos.length);

    const leftTodo = computed(() => props.todos.reduce((pre, cur) => {
      if (cur.completed !== true) pre += 1;
      return pre;
    }, 0));

    function clearCompleted(): void {
      context.emit('clearTodo');
    }

    function allButton(): void {
      context.emit('getVisibility', 'all');
    }

    function activeButton(): void {
      context.emit('getVisibility', 'active');
    }

    function completedButton(): void {
      context.emit('getVisibility', 'completed');
    }

    function clearDisplay(): boolean {
      if (props.todos.length - leftTodo.value <= 0) return false;
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

});
</script>

<style scoped>

</style>
