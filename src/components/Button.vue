<template>
    <button @click="(e) => {onClickHandler()}" :class="'btn ' + extraClassName">{{contentButton}}</button>
</template>

<script lang="ts">
    import Vue from "vue";
    export default{
        props: {
            extraClassName:{
                type: String,
                default: "",
            },
            onClickHandler:{
                type: Function,
                default: () => {
                    console.log("This is button ");
                },
            },
            contentButton:{
                type: String,
                default: "Hello",
            },
        }
    }
</script>

<style lang="scss">
@tailwind components;

@layer components{
    body{
        .btn{
            @apply flex-shrink-0 p-2 border-black bg-blue-400 text-black rounded-md cursor-pointer;
        }
        .add{
            @apply text-teal-300 border-teal-400 hover:text-teal-400 
            hover:border-teal-600 bg-white;
        }
        .edit{
            @apply border-green-500 text-green-400 hover:border-green-600
            hover:text-white bg-white hover:font-bold hover:bg-green-600 ml-4 mr-2;
        }
        .remove{
            @apply border-red-500 bg-white text-red-500 hover:font-bold
            hover:border-red-600 hover:bg-red-500 hover:text-white hover:shadow-lg;
        }
    }
}
</style>