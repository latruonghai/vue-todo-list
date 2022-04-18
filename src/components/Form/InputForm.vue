<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { InputFormProps, TypeInput } from '../../../typings/props';

export default defineComponent({
    props: {
        extraClassName: String,
        labelName: {
            type: String,
            default: 'Label'
        },

        placeholderString: String,
        inputType: String,
        inputName: String,
        typeName: String
    },

    setup(props) {
        return { props };
    }
});
</script>

<template>
    <div class="input-section">
        <label
            :for="props.inputName"
            :class="`input-label ${props.extraClassName}`"
            >{{ props.labelName }}</label
        >
        <input
            :type="props.typeName"
            :class="`input-form ${props.extraClassName}`"
            :placeholder="props.placeholderString"
            :name="props.inputName"
        />
    </div>
</template>

<style lang="scss">
@tailwind components;
@layer components {
    body {
        .input {
            &-section {
                @apply w-4/5 flex items-center;
            }
            &-label {
                @apply text-black mr-2 font-serif;
            }
            &-form {
                @apply flex-shrink-0 flex ml-1;
            }
        }
    }
}
</style>
