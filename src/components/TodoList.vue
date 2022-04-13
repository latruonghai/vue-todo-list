
<template>
    <div class="todo-list-title">
        msg: {{ msg }}
    </div>
    <button @click="onClickHandler" >Hello {{count}}</button>
</template>

<script lang="ts">
// import Vue from 'vue';
import { ref } from 'vue';
// import component from '../env';
export default {
    name:"TodoList",
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
<style lang="scss" scoped>
// /* @tailwind base; */
@tailwind components;

@layer components{
    body{
        .todo-list{
            &-title{
                @apply text-red-500;
            }    
        }    
    }
}
</style> !==