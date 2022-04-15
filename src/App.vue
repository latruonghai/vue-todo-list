<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue';
import TodoList from './components/TodoList.vue';
// import component from './env';
// import {methods, state} from './store';
import { provide } from 'vue';
// import TodoList from './components/TodoList.vue';
export default {
  components: {
    TodoList,
  },
  setup(){
    // provide("store", {methods, state});
  }
}
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <todo-list />
</template>

<style>
/* @tailwind base; */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
