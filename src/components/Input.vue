<template>
    <input
        :id="idName"
        class="input-section"
        :type="typeName"
        :placeholder="placeHolder"
        @change="(e) => onChange(e)"
    />
</template>

<script lang="ts">
// import Vue from 'vue'
export default {
    props: {
        extraClassName: {
            type: String,
            default: ''
        },
        typeName: {
            type: String,
            default: 'text'
        },
        placeHolder: {
            type: String,
            default: ''
        },

        onChange: {
            type: Function,
            default: (event: any) => {
                console.log('This is input ');
            }
        },
        idName: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
@tailwind components;

@layer components {
    body {
        .input-section {
            @apply w-full shadow-lg border-black focus:text-black appearance-none border rounded-md py-2 px-3 mr-4;
        }
    }
}
</style>
