<template>
    <div class="cart-item">
        <p class="cart-content">{{itemContent}}</p>
        <Button contentButton="Edit" :extraClassName="'edit'"></Button>
        <Button contentButton="Remove" :extraClassName="'done'"></Button>
    </div>
</template>

<script lang="ts">
import Button from "./Button.vue"
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
            default: false,
        },
    },
    components:{
        Button
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
    }
}
</style>