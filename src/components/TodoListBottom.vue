<template>
  <div
    class="flex flex-row justify-between items-center w-full h-5 bg-white text-tiny"
    v-show="totalCount"
  >
    <div class="pl-1.5 cursor-default">
      {{activeTodos}} items left
    </div>
    <div class="flex-grow-0 pr-1">
      <button
        :class="{
          btn: true,
          selected: visibility === 'all',
        }"
        @click="showAllTodos"
      >
        All
      </button>
      <button
        :class="{
          btn: true,
          selected: visibility === 'active',
        }"
        @click="showActiveTodos"
      >
        Active
      </button>
      <button
        :class="{
          btn: true,
          selected: visibility === 'completed',
        }"
        @click="showCompletedTodos"
      >
        Completed
      </button>
    </div>
    <button
      class="hover:underline pr-1.5"
      v-show="clearCompletedButton()"
      @click="clearCompletedTodos"
    >
      Clear completed
    </button>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import { Todo } from '../App.vue';

export default defineComponent({
  name: 'TodoListBottom',

  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
  },

  emits: ['clearTodo', 'changeVisibility'],

  setup(props, context) {
    const totalCount = computed(() => props.todos.length);

    const activeTodos = computed(() => props.todos.reduce((pre, cur) => {
      return cur.completed ? pre : pre + 1;
    }, 0));

    function clearCompletedTodos(): void {
      context.emit('clearTodo');
    }

    function showAllTodos(): void {
      context.emit('changeVisibility', 'all');
    }

    function showActiveTodos(): void {
      context.emit('changeVisibility', 'active');
    }

    function showCompletedTodos(): void {
      context.emit('changeVisibility', 'completed');
    }

    function clearCompletedButton(): boolean {
      if (props.todos.length - activeTodos.value <= 0) return false;
      return true;
    }

    return {
      totalCount,
      activeTodos,
      clearCompletedTodos,
      showAllTodos,
      showActiveTodos,
      showCompletedTodos,
      clearCompletedButton,
    };
  },

});
</script>

<style scoped>
.btn{
  @apply inline-block p-0.5 mx-px border border-white hover:border-yellow-200
}
.selected{
  @apply border-yellow-400
}
</style>
