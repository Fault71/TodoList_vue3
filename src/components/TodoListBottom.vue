<template>
  <div
    class="todo-bottom"
    v-show="total"
  >
    <div class="count">{{leftTodo}} items left</div>
    <div class="status">
      <button
        class="unselected"
        @click="allButton"
      >
        All
      </button>
      <button
        class="unselected"
        @click="activeButton"
      >
        Active
      </button>
      <button
        class="unselected"
        @click="completedButton"
      >
        Completed
      </button>
    </div>
    <button
      class="clear"
      v-show="clearDisplay()"
      @click="clearCompleted"
    >
      Clear completed
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'TodoListBottom',

  props: {
    todos: Array,
    clearTodo: Function,
  },

  emits: ['clearTodo', 'getVisibility'],

  setup(props, context) {
    const total = computed(() => props.todos.length);

    const leftTodo = computed(() => props.todos.reduce((pre, cur) => {
      if (cur.completed !== true) pre += 1;
      return pre;
    }, 0));

    function clearCompleted() {
      context.emit('clearTodo');
    }

    function allButton() {
      context.emit('getVisibility', 'all');
    }

    function activeButton() {
      context.emit('getVisibility', 'active');
    }

    function completedButton() {
      context.emit('getVisibility', 'completed');
    }

    function clearDisplay() {
      if (props.todos.length - props.leftTodo <= 0) return false;
      return true;
    }

    return {
      total,
      leftTodo,
      clearCompleted,
      allButton,
      activeButton,
      completedButton,
      clearDisplay,
    };
  },

};
</script>

<style scoped>
  .todo-bottom{
    width: 100%;
    float: left;
    border: 1px solid;
  }
  .count{
    float: left;
    height: 50px;
    line-height: 50px;
    padding-right: 100px;
  }
  .status{
    float: left;
    height: 50px;
  }
  .status button{
    margin: 17px 10px 5px 10px;
    background-color: white;
  }
  .unselected{
    border: none;
  }
  .unselected:hover{
    border-bottom: 1px grey solid;
  }
  .clear{
    float: right;
    height: 50px;
    background-color: white;
    border: none;
  }
  .clear:hover{
    color: red;
  }
</style>
