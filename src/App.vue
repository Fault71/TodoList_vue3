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
          @clearTodo='clearTodo'
          @getVisibility='getVisibility'
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRef, watch } from 'vue';
import TodoListTop from './components/TodoListTop.vue';
import TodoListMiddle from './components/TodoListMiddle.vue';
import TodoListBottom from './components/TodoListBottom.vue';

export default {
  name: 'App',

  components: {
    TodoListTop,
    TodoListMiddle,
    TodoListBottom,
  },

  setup() {
    const data = reactive({
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      visibility: 'all',
    });

    watch(
      () => data.todos,
      (value) => { localStorage.setItem('todos', JSON.stringify(value)); },
      { deep: true },
    );

    function addTodo(todo) {
      data.todos.unshift(todo);
    }

    function deleteTodo(id) {
      data.todos = data.todos.filter((todo) => todo.id !== id);
    }

    function clearTodo() {
      data.todos = data.todos.filter((todo) => !todo.completed);
    }

    function getVisibility(status) {
      data.visibility = status;
    }

    return {
      todos: toRef(data, 'todos'),
      visibility: toRef(data, 'visibility'),
      addTodo,
      deleteTodo,
      clearTodo,
      getVisibility,
    };
  },
};
</script>

<style>
html{
  font-size: 32px;
  background-color: rgb(235, 235, 235);
}
#app{
  font-size: 16px;
}
</style>
