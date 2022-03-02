<template>
  <ul class=" w-full border-t">
    <li
      class="group relative shadow bg-white border-b"
      v-for="todo in filterData"
      :key="todo.id"
    >
      <div
        :class="{
          view: true,
          'view-editing': todo === editedTodo,
        }"
      >
        <input
          :id="todo.id"
          type="checkbox"
          class="w-4 h-4 my-2 ml-2 appearance-none"
          v-model="todo.completed"
        >
        <label
          :for="todo.id"
          :class="{
            'label-unselected': true,
            'label-selected': todo.completed,
          }"
        >
          <span
            v-show="todo.completed"
            class="absolute left-0.5 text-green-400 text-xs select-none"
          >
            &#8730;
          </span>
        </label>
        <label
          :class="{
            active: true,
            done: todo.completed,
          }"
          @dblclick="toEdit(todo.id)"
        >
          {{todo.name}}
        </label>
        <button
          class="hidden absolute top-2 right-3 w-2 h-2 group-hover:block text-xs text-red-600"
          @click="destroyTodo(todo.id)"
        >
          &#935;
        </button>
      </div>
      <input
        type="text"
        :class="{
          edit: true,
          'edit-editing': todo === editedTodo,
        }"
        v-model="todo.name"
        v-focus="todo === editedTodo"
        @blur="finishEditing(todo.id)"
      >
    </li>
  </ul>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, reactive, toRef } from 'vue';
import { Todo } from '../App.vue';

interface Data {
  editedTodo :object
}

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
    const data: Data = reactive({
      editedTodo: {}
    });

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

    function destroyTodo(id: number): void {
      context.emit('deleteTodo', id);
    }

    function toEdit(id: number): void {
      props.todos.forEach((todo) => {
        if (todo.id === id) data.editedTodo = todo;
      });
    }

    function finishEditing(id: number): void {
      props.todos.forEach((todo) => {
        if (todo.id === id) data.editedTodo = {};
      });
    }

    return {
      editedTodo: toRef(data, 'editedTodo'),
      filterData,
      destroyTodo,
      toEdit,
      finishEditing,
    };
  },

  directives: {
    focus: function(el,binding){
      if(binding.value) {
        el.focus();
      };
    },
  },
});
</script>

<style scoped>
  .view{
    @apply h-8
  }
  .view-editing{
    @apply hidden
  }
  .label-unselected{
    @apply absolute left-2 w-4 h-4 my-2 border border-gray-300 rounded-full
  }
  .label-selected{
    @apply border-blue-200
  }
  .active{
    @apply inline-block w-72 h-8 py-1 pl-2 outline-none text-xs align-top leading-6
  }
  .done{
    @apply  line-through text-gray-300
  }
  .edit{
    @apply hidden w-72 h-8 border border-gray-400 ml-6 py-1 pl-2 outline-none text-xs shadow-inner
  }
  .edit-editing{
    @apply inline-block
  }
</style>
