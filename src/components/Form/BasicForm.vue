<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TodoListItem } from '../../../typings/store';
// import InputForm from './InputForm.vue';
import { toUpperCase } from '../../utils/handleString';
import InputForm from './InputForm.vue';

export default defineComponent({
    name: 'Form',
    props: {
        itemTodoList: {
            type: Object as PropType<TodoListItem>,
            default: () => {
                return {
                    todoWorks: '',
                    dayIssue: '',
                    dayCreated: ''
                };
            }
        }
    },
    setup(props) {
        return { toUpperCase, props };
    },
    components: { InputForm }
});
</script>

<template>
    <div class="form-section">
        <div class="form-header">
            <h1 class="form-title">This is Form</h1>
        </div>
        <div
            class="input-area"
            v-for="(value, name, index) in props.itemTodoList"
            :key="index"
        >
            <InputForm :label-name="toUpperCase(name)" />
        </div>
        <div class="form-body"></div>
    </div>
</template>

<style
    lang="scss"
    scoped
>
@tailwind components;

@layer components {
    body {
        .form {
            &-section {
                @apply w-5/6 overflow-auto flex-col items-center m-2
                border-2 rounded-md;
            }
            &-header {
                @apply left-1;
            }
            &-title {
                @apply text-blue-600 font-mono items-start;
                text-align: left;
            }
            &-body {
                @apply flex flex-row space-y-4;
            }
        }
    }
}
</style>
