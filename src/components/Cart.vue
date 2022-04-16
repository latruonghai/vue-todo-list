<template>
    <div class="work-counter">
        <span>{{itemContent.numOfWorks}}</span>
    </div>
    <div :id="`cart-${order}`" class="cart-item">
        <!-- <input :type="'checkbox'" v-model="getStatus" @change="
        "/> -->
        <p :class="`cart-content ${doneStatus}`">
            <span class="title">{{dayCreated}}</span>
            {{itemContent.todoWorks}}
        </p>
        <!-- <p v-else  class="cart-content done" >{{itemContent.todoWorks}}</p> -->

        <Button :contentButton="itemContent.done?'Not Done':'Done'" :extraClassName="'edit'" :onClickHandler="setDoneItemHandler" ></Button>
        <Button contentButton="Remove" :extraClassName="'remove'" :onClickHandler="removeItemHandler"></Button>
    </div>
</template>

<script lang="ts">
import useTodoList from '../store/todolistItem';
import Button from "./Button.vue";
// import produce from "immer";
import Input from './Input.vue';
import { TodoListItem } from '../../typings/globals';
import { dayFrom, getRelativeDay } from '../utils/handleDate';
import { computed } from '@vue/runtime-core';

export default {
    props:{
        itemContent: { 
            type: Object as () => TodoListItem,
            default: "Todo",
            validation(value: string){
                // console.log(value.length>0);
                return value.length > 0;
            }
        },
        // done:{
        //     type: Boolean,
        //     default: true,
        // },
        order: Number,
    },
    components:{
        Button,
        Input
    },
    setup(props: any){


        const todoListStore = useTodoList();
        const {removeTodoItem,setDoneItem} = todoListStore;
        const removeItemHandler = () =>{
            const length = todoListStore.todoListArray.length;
            const item = todoListStore.todoListArray[length - 1 - props.order as number];
            // console.log("Remove item", item);
            removeTodoItem(item);
        }
        const setDoneItemHandler = () =>{
            const item = todoListStore.todoListArray[length - 1 - props.order as number];
            // console.log("Set done item", item);
            setDoneItem(item);
        };

        const doneStatus = computed(() =>{
            return props.itemContent.done?"done":"";
        });
        const dayCreated = computed(() =>{
            const dayString = props.itemContent.dayCreated;
            const dayRelative = getRelativeDay(dayFrom(dayString));
            return dayRelative === ""? props.itemContent.dayString: dayRelative;
        })
        return{
            removeItemHandler,
            setDoneItemHandler,
            dayCreated,
            doneStatus
        }
    }
}
</script>

<style lang="scss">
@tailwind components;

@layer components{
    body{
        .cart{
            &-item{
                @apply my-2 p-1 flex items-center ml-2;
            }
            &-content{
                @apply w-full text-gray-600 text-left font-mono; 
            }

        }
        .done{
            @apply line-through text-red-500;
        }
        .title{
            @apply text-red-500;
        }
        .work-counter{
            @apply rounded-md items-center relative w-1/12;
            transform: translateY(35%);
        }
    }
}
</style>