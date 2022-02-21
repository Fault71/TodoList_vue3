<template>
  <div class="flex flex-row flex-nowrap  items-center h-10 w-full bg-white shadow">
    <button
      class="w-6 h-10 text-xs"
      @click="selectAll"
    >
      ⬇
    </button>
    <input
      class="flex-1 h-full pl-1 outline-none text-sm placeholder-gray-200"
      type="text"
      placeholder="What needs to be done?"
      v-model.trim="item"
      @keyup.enter="add"
    >
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { reactive, toRef } from 'vue';

export default {
  name: 'TodoListTop',

  props: {
    todos: Array,
    addTodo: Function,
  },

  emits: ['addTodo'],

  setup(props, context) {
    const data = reactive({
      item: '',
    });

    function add() {
      if (data.item === '') return;
      const newTodo = {
        id: nanoid(),
        name: data.item,
        completed: false,
        uneditable: true,
      };
      context.emit('addTodo', newTodo);
      data.item = '';
    }

    function selectAll() {
      const i = props.todos.reduce((pre, cur) => {
        if (cur.completed === true) pre += 1;
        return pre;
      }, 0);
      if (i !== props.todos.length) {
        props.todos.forEach((todo) => {
          todo.completed = true;
        });
      } else {
        props.todos.forEach((todo) => {
          todo.completed = false;
        });
      }
    }

    return {
      item: toRef(data, 'item'),
      add,
      selectAll,
    };
  },
};
</script>

<style scoped>

</style>
