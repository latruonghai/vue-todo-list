
<template>
    <div class="todo-list-form">
        <div class="todo-list-section">
            <div class="todo-list-content">
                <h1 class="todo-list-title">Todo List</h1>
                <div class="todo-list-input-section">
                    <Input :idName="'todo-item-content'" placeHolder="Add Todo"/>
                    <Button  contentButton="Add" :extraClassName="'add'" :onClickHandler="addTodoHandler"></Button>
                </div>
                <div class="cart-section" v-for="(item, index) in stateTodoList.$state.todoListArray" :key="index" >
                    <Cart :itemContent="`${item.numOfWorks}. ${item.todoWorks}`" :done="item.done" :order="index"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import { computed, defineComponent, inject, PropType } from 'vue';
// import component from '../env';
import Button from '../components/Button.vue';
import Input from './Input.vue';
import Cart from './Cart.vue';
import { TodoListItem } from '../../typings/globals';
import useTodoList from '../store/todolistItem';
import { numberOfExistElement, numberOfExistObjectElement } from '../utils/handleArray';

export default defineComponent({
    name:"TodoList",
    components:{
        Button,
        Input,
        Cart
    
    },
    props: {
        itemArray: {
            type: Array as PropType<TodoListItem[]>,
            default: () => [],
        },
    },
    setup(props){
        const stateTodoList = useTodoList();
        const { addTodoItem } = stateTodoList;
        // const { addTodo, removeTodo } = úe;
        const addTodoHandler = () =>{
            const elementInput = document.getElementById("todo-item-content") as HTMLInputElement;
            const content: string = elementInput!.value;
            elementInput.value = "";
            // console.log("Content", content);
            if(content.length>0){
                const item: TodoListItem = {
                    todoWorks: content,
                    done: false,
                }
                addTodoItem(item);
            }
        }
        
        return {
            stateTodoList,
            addTodoHandler,
        }
    },
    
});
</script>
<style lang="scss" >
// /* @tailwind base; */
@tailwind components;

@layer components{
    body{
        .todo-list{
            &-title{
                @apply text-2xl font-black;
            }
            &-section{
                @apply bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg;
            }
            &-form{
                @apply w-full flex flex-col items-center justify-center bg-teal-100 font-sans;
            }
            &-content{
                @apply mb-6 left-0;
            }
            &-input-section{
                @apply flex mt-1 ;
            }
            // &-input-area{
            //     @apply shadow-lg border-2 appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500 border-gray-400;
            // }
            &-button{
                @apply ml-2 rounded-xl bg-white border-teal-400 text-teal-600 cursor-pointer flex-shrink-0 p-2 hover:text-teal-800 hover:border-teal-600;
            }
        }
        .cart-section{
            @apply m-4 flex-row shadow-lg;
        }    
    }

}
</style> !==