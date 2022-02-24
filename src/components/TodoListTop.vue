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

<script lang='ts'>
import { nanoid } from 'nanoid';
import { reactive, toRef, defineComponent, PropType } from 'vue';

interface Todo {
  id: number,
  name: string,
  completed: boolean,
  uneditable :boolean
};

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
      item: '',
    });

    function add(): void {
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

    function selectAll(): void {
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
});
</script>

<style scoped>

</style>
