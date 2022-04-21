<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

// import Vue from 'vue'
export default defineComponent({
    inheritAttrs: false,
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
            type: Object as () => (value: Event) => void
        },
        idName: {
            type: String,
            default: ''
        }
    }
});
</script>

<template>
    <input
        :id="idName"
        class="input-section"
        :type="typeName"
        :placeholder="placeHolder"
        @change="onChange"
    />
</template>

<style lang="scss" scope>
@tailwind components;

@layer components {
    body {
        .input-section {
            @apply w-full shadow-sm border-black focus:text-black appearance-none border rounded-md py-2 px-3 mr-4;
        }
    }
}
</style>
