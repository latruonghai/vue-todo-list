<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue';
import TodoList from './components/TodoList.vue';
import BasicForm from './components/Form/BasicForm.vue';
// import useToggleModal from './store';
import { useCompletedToDoItem, useTodoList, useToggleModal } from './store';
import Modal from './components/Modal.vue';
import Button from './components/Button.vue';
import { computed, defineComponent, ref, watch } from '@vue/runtime-core';
import { storeToRefs } from 'pinia';
import { filterObject } from './utils/handleCollection';
import { TodoListItem } from '../typings/store';
// import useToggleModal from './store/toggleModal';
// import TodoList from './components/TodoList.vue';
export default defineComponent({
    components: {
        TodoList,
        Modal,
        Button,
        BasicForm
    },
    setup() {
        // provide("store", {methods, state});
        const toggleModal = useToggleModal();
        const todoListItem = useTodoList();
        const todoItemState = useCompletedToDoItem();
        const { todoListArray } = storeToRefs(todoListItem);
        const { filterTodoList } = storeToRefs(todoItemState);
        // const item = ref<TodoListItem>();
        // const item = ref<TodoListItem[]>(todoListArray.value);y
        // const completedState = ref(false);
        const worksCompleted = computed(() => {
            return filterObject(todoListArray.value, function (o: any) {
                return o.done === true;
            });
        });

        const unCompletedWorks = computed(() => {
            return filterObject(todoListArray.value, function (o: any) {
                return o.done === false;
            });
        });
        // watch
        return {
            toggleModal,
            todoListArray: todoListArray.value,
            completedState: filterTodoList,
            worksCompleted,
            unCompletedWorks
        };
    }
});
</script>

<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
    <todo-list v-if="completedState === 1" :itemArray="worksCompleted">
    </todo-list>

    <todo-list v-else-if="completedState === 0" :itemArray="unCompletedWorks">
    </todo-list>
    <todo-list v-else :itemArray="todoListArray"> </todo-list>

    <!-- <todo-list v-else-if="" :itemArray="todoListArray">
        <template #footer>
            <Button
                contentButton="Completed Works"
                :onClickHandler="onClickCompleted"
            ></Button>
        </template>
    </todo-list> -->
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
    background-color: #ecf0f1;
}
.title {
    font-weight: 700;
}
</style>
