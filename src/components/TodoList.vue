
<template>
    <div class="todo-list-form">
        <div class="todo-list-section">
            <div class="todo-list-content">
                <h1 class="todo-list-title">Todo List</h1>
                <div class="todo-list-input-section">
                    <Input placeHolder="Add Todo"/>
                    <Button contentButton="Add" :extraClassName="'add'"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import { ref } from 'vue';
// import component from '../env';
import Button from '../components/Button.vue';
import Input from './Input.vue';
export default {
    name:"TodoList",
    components:{
    Button,
    Input
},
    props: {
        msg: {
            type: String,
            // required: true,
            default: 'Hello Vue 3 + TypeScript + Vite',
            validation(value: string){
                console.log(value.length>0);
                return value.length > 0;
            }
        },
    },
    setup(){
        const count = ref(0);
        // const onClickHandler = () => {
        //     count.value++;
        // }
        return {
            count,
            // onClickHandler
        }
    },
    methods: {
        onClickHandler(){
            this.count++;
        }
    }
    
    
    
    
}
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
    }
}
</style> !==