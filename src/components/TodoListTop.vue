<template>
  <div class="flex flex-row items-center h-10 w-full bg-white shadow">
    <button
      class="w-8 h-10 px-1 text-xs"
      @click="toggleAll"
    >
      ⬇
    </button>
    <input
      class="flex-1 h-full outline-none text-sm placeholder-gray-200"
      type="text"
      placeholder="What needs to be done?"
      v-model.trim="text"
      @keyup.enter="addNewTodo"
    >
  </div>
</template>

<script lang='ts'>
import { nanoid } from 'nanoid';
import { reactive, toRef, defineComponent, PropType } from 'vue';
import { Todo } from '../App.vue';

export default defineComponent({
  name: 'TodoListTop',

  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },

  emits: ['addTodo'],

  setup(props, context) {
    const data = reactive({
      text: '',
    });

    function addNewTodo(): void {
      if (data.text === '') return;
      const newTodo = {
        id: nanoid(),
        name: data.text,
        completed: false,
      };
      context.emit('addTodo', newTodo);
      data.text = '';
    }

    function toggleAll(): void {
      if (props.todos.some((todo) => todo.completed !== true)) {
        props.todos.forEach((todo) => { todo.completed = true; });
      } else {
        props.todos.forEach((todo) => { todo.completed = false; });
      };
    }

    return {
      text: toRef(data, 'text'),
      addNewTodo,
      toggleAll,
    };
  },
});
</script>
