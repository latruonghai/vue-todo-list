<template>
    <div :id="`cart-${order}`" class="cart-item">
        <!-- <input :type="'checkbox'" v-model="getStatus" @change="
        "/> -->
        <p v-if="!done" class="cart-content">{{itemContent}}</p>
        <p v-else  class="cart-content done" >{{itemContent}}</p>

        <Button :contentButton="done?'Not Done':'Done'" :extraClassName="'edit'" :onClickHandler="setDoneItemHandler" ></Button>
        <Button contentButton="Remove" :extraClassName="'remove'" :onClickHandler="removeItemHandler"></Button>
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import useTodoList from '../store/todolistItem';
import Button from "./Button.vue"
import Input from './Input.vue';
import { TodoListItem } from '../../typings/globals';
export default {
    props:{
        itemContent: { 
            type: String,
            default: "Todo",
            validation(value: string){
                // console.log(value.length>0);
                return value.length > 0;
            }
        },
        done:{
            type: Boolean,
            default: true,
        },
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
            const item = todoListStore.todoListArray[props.order as number];
            // console.log("Remove item", item);
            removeTodoItem(item);
        }
        const setDoneItemHandler = () =>{
            const item = todoListStore.todoListArray[props.order as number];
            // console.log("Set done item", item);
            setDoneItem(item);
        }
        return{
            removeItemHandler,
            setDoneItemHandler
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
                @apply my-2 p-1 flex items-center;
            }
            &-content{
                @apply w-full text-gray-600 text-left font-mono; 
            }

        }
        .done{
            @apply line-through text-red-500;
        }
    }
}
</style>