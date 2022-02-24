<template>
  <ul class=" w-full border-t">
    <li
      class="group relative h-8 shadow"
      v-for="todo in filterData"
      :key="todo.id"
    >
      <input
        :id="todo.id"
        class="absolute top-0 left-1 w-4 h-4 my-2 mx-0 appearance-none"
        type="checkbox"
        v-model="todo.completed"
      >
      <label
        :for="todo.id"
        class="absolute z-0 w-4 h-4 my-2 mx-1 border border-gray-300 rounded-full">
      </label>
      <input
        :class="getClass(todo.completed)"
        type="text"
        v-model="todo.name"
        :readonly="todo.uneditable"
        @dblclick="toEdit(todo.id)"
        @blur="finishEditing(todo.id)"
      >
      <button
        class="hidden absolute top-2 right-3 w-2 h-2 group-hover:block text-xs text-red-600"
        @click="destroy(todo.id)"
      >
        ╳
      </button>
    </li>
  </ul>
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
  name: 'TodoListMiddle',

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

  emits: ['deleteTodo'],

  setup(props, context) {
    const filterData = computed(() => {
      const filter: { [k:string]: Function } = {
        all(todos: Todo[]): Todo[] {
          return todos;
        },
        active(todos: Todo[]): Todo[] {
          return todos.filter((todo) => !todo.completed);
        },
        completed(todos: Todo[]): Todo[] {
          return todos.filter((todo) => todo.completed);
        },
      };
      return filter[props.visibility](props.todos);
    });

    function getClass(status: boolean): string {
      if (status === true) return 'done';
      return 'undone';
    }

    function destroy(id: number): void {
      context.emit('deleteTodo', id);
    }

    function toEdit(id: number): void {
      props.todos.forEach((todo) => {
        if (todo.id === id) todo.uneditable = false;
      });
    }

    function finishEditing(id: number): void {
      props.todos.forEach((todo) => {
        if (todo.id === id) todo.uneditable = true;
      });
    }

    return {
      filterData,
      getClass,
      destroy,
      toEdit,
      finishEditing,
    };
  },
});
</script>

<style scoped>
  .undone{
    @apply w-full h-8 py-1 pl-8 outline-none border-b text-xs
  }
  .done{
    @apply w-full h-8 py-1 pl-8 outline-none border-b text-xs line-through text-gray-300
  }
  li input:first-child:checked + label{
    @apply border-blue-200
  }
  li input:first-child:checked + label::after{
    content: '\2713';
    position: absolute;
    top: 0px;
    left: 8px;
    font-size: 20px;
    color: rgb(117, 196, 0);
  }
</style>
