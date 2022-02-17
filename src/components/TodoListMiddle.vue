<template>
  <ul class="todo-middle">
    <li
      class="todo-li"
      v-for="todo in filterData"
      :key="todo.id"
    >
      <input
        class="mid-inp1"
        type="checkbox"
        v-model="todo.completed"
      >
      <input
        class="mid-inp2"
        type="text"
        v-model="todo.name"
        :readonly="todo.uneditable"
        @dblclick="toEdit(todo.id)"
        @blur="finishEditing(todo.id)"
      >
      <button
        class="delete"
        @click="destroy(todo.id)"
      >
        删除
      </button>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TodoListMiddle',

  props: {
    todos: Array,
    deleteTodo: Function,
    visibility: String,
  },

  emits: ['deleteTodo'],

  setup(props, context) {
    const filterData = computed(() => {
      const filter = {
        all(todos) {
          return todos;
        },
        active(todos) {
          return todos.filter((todo) => !todo.completed);
        },
        completed(todos) {
          return todos.filter((todo) => todo.completed);
        },
      };
      return filter[props.visibility](props.todos);
    });

    function destroy(id) {
      context.emit('deleteTodo', id);
    }

    function toEdit(id) {
      props.todos.forEach((todo) => {
        if (todo.id === id) todo.uneditable = false;
      });
    }

    function finishEditing(id) {
      props.todos.forEach((todo) => {
        if (todo.id === id) todo.uneditable = true;
      });
    }

    return {
      filterData,
      destroy,
      toEdit,
      finishEditing,
    };
  },
};
</script>

<style scoped>
  .todo-middle{
    float: left;
    width: 100%;
  }
  .todo-li{
    float: left;
    width: 100%;
    border: 1px solid;
    color: black;
    position: relative;
  }
  .mid-inp1{
    float: left;
    width: 50px;
    height: 30px;
    border: none;
    outline: none;
  }
  .mid-inp2{
    float: right;
    width: 460px;
    height: 30px;
  }
  .delete{
    display: none;
    width: 30px;
    height: 15px;
    position: absolute;
    z-index: 2;
    right:10px;
    top:10px;
    font-size: 10px;
  }
  .todo-li:hover .delete{
    display: block;
  }
</style>
