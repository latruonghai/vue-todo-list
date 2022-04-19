<script lang="ts">
import { computed, defineComponent, watch } from '@vue/runtime-core';
import { TodoListItem } from '../../../typings/store';
import { useTodoList } from '../../store';
// import InputForm from './InputForm.vue';
import { checkExistElement } from '../../utils/handleArray';
import { toUpperCase, standardizeString } from '../../utils/handleString';
import InputForm from './InputForm.vue';

export default defineComponent({
    name: 'Form',
    props: {
        itemSelected: {
            type: Object as () => TodoListItem,
            default : {

            }
        },
        
    },
    setup(props) {

        const DONT_RENDER_LABEL = ["todoWorks", "dayIssue"];
        const checkValidLabel = (label: string): boolean => {
            // console.log("label", label);
            return DONT_RENDER_LABEL.includes(label, 0);
        };
        
        const todoList = useTodoList();
        // console.log("Item selected", props.itemSelected);
        const { todoListArray } = todoList;
        
        return { toUpperCase, props, todoListArray, checkValidLabel, standardizeString };
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
            v-for="(value, name, index) in props.itemSelected"
            :key="index"
        >
            <InputForm
                :label-name="standardizeString(toUpperCase(name))"
                v-if="checkValidLabel(name)"
                :inputValue="((value) as string)"
            />
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
