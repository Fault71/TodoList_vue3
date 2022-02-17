<template>
  <div class="todo-topper">
    <button @click="selectAll">全选</button>
    <input
      class="top-inp"
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
  .todo-topper{
    float: left;
    width: 100%;
    border: 2px  solid;
  }
  .todo-topper button{
    float: left;
    width: 50px;
    height: 80px;
    background-color: white;
    border: none;
  }

  .todo-topper .top-inp{
    float: right;
    width: 460px;
    height: 60px;
    padding: 10px 20px;
    border: none;
    outline: none;
  }
</style>
