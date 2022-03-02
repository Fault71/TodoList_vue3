<template>
  <div
    id="app"
    class="clearfix mx-auto w-80"
  >
    <div class="clearfix w-full" >
      <div>
        <div class="text-4xl text-red-500 text-center">
          todos
        </div>
      </div>
      <div class="clearfix w-full">
        <TodoListTop
          :todos='todos'
          @addTodo='addTodo'
        />
        <TodoListMiddle
          :todos='todos'
          :visibility='visibility'
          @deleteTodo='deleteTodo'
        />
        <TodoListBottom
          :todos='todos'
          :visibility='visibility'
          @clearTodo='clearTodo'
          @changeVisibility='changeVisibility'
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  reactive, toRef, watch, defineComponent,
} from 'vue';
import TodoListTop from './components/TodoListTop.vue';
import TodoListMiddle from './components/TodoListMiddle.vue';
import TodoListBottom from './components/TodoListBottom.vue';

export interface Todo {
  id: number,
  name: string,
  completed: boolean,
};

interface Data {
  todos: Todo[],
  visibility: string
};

export default defineComponent({
  name: 'App',

  components: {
    TodoListTop,
    TodoListMiddle,
    TodoListBottom,
  },

  setup() {
    const data:Data = reactive({
      todos: JSON.parse(localStorage.getItem('todos') as string) || [],
      visibility: 'all',
    });

    watch(
      () => data.todos,
      (value: object[]) => { localStorage.setItem('todos', JSON.stringify(value)); },
      { deep: true },
    );

    function addTodo(todo: Todo): void {
      data.todos.unshift(todo);
    }

    function deleteTodo(id: number): void {
      data.todos = data.todos.filter((todo) => (<Todo>todo).id !== id);
    }

    function clearTodo(): void {
      data.todos = data.todos.filter((todo) => !(<Todo>todo).completed);
    }

    function changeVisibility(status: string): void {
      data.visibility = status;
    }

    return {
      todos: toRef(data, 'todos'),
      visibility: toRef(data, 'visibility'),
      addTodo,
      deleteTodo,
      clearTodo,
      changeVisibility,
    };
  },
});
</script>

