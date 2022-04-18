<template>
    <div class="work-counter">
        <span>{{ itemContent.numOfWorks }}</span>
    </div>
    <div
        :id="`cart-${order}`"
        class="cart-item"
    >
        <!-- <input :type="'checkbox'" v-model="getStatus" @change="
        "/> -->
        <p :class="`cart-content ${doneStatus}`">
            {{ itemContent.todoWorks }}<span class="comma"> | </span>
            <span class="title">{{ dayExpiration }}</span>
        </p>
        <!-- <p v-else  class="cart-content done" >{{itemContent.todoWorks}}</p> -->
        <Button
            :contentButton="itemContent.done ? 'Not Done' : 'Done'"
            :extraClassName="'edit'"
            :onClickHandler="setDoneItemHandler"
        ></Button>
        <Button
            v-if="!itemContent.done"
            contentButton="Edit"
            :extraClassName="'remove'"
            :onClickHandler="
                () => {
                    toggleModalAction(true);
                }
            "
        />
        <Button
            v-else
            contentButton="Remove"
            :extraClassName="'remove'"
            :onClickHandler="removeItemHandler"
        />
    </div>
</template>
<script lang="ts">
// import useTodoList from '../store/todolistItem';
import Button from './Button.vue';
// import produce from "immer";
import Input from './Input.vue';

import { dayFrom, getRelativeDay } from '../utils/handleDate';
import { computed, defineComponent } from '@vue/runtime-core';
import { TodoListItem } from '../../typings/store';
import { useToggleModal, useTodoList } from '../store';

export default defineComponent({
    props: {
        itemContent: {
            type: Object as () => TodoListItem,
            default: 'Todo',
            validation(value: string) {
                return value.length > 0;
            }
        },
        order: Number
    },
    components: {
        Button,
        Input
    },
    setup(props: any) {
        const todoListStore = useTodoList();
        const toggleModal = useToggleModal();
        const { toggleModalAction } = toggleModal;
        const { removeTodoItem, setDoneItem } = todoListStore;
        const removeItemHandler = () => {
            const item = todoListStore.todoListArray[props.order as number];
            removeTodoItem(item);
        };
        const setDoneItemHandler = () => {
            const item = todoListStore.todoListArray[props.order as number];

            setDoneItem(item);
        };

        const doneStatus = computed(() => {
            return props.itemContent.done ? 'done' : '';
        });
        const dayExpiration = computed(() => {
            const dayString = (<TodoListItem>props.itemContent)
                .dayIssue as string;

            const dayRelative = getRelativeDay(dayFrom(dayString));
            // const dayCreated = normalizeDate(dayString);
            return dayRelative === '' ? dayString : dayRelative;
        });
        return {
            removeItemHandler,
            setDoneItemHandler,
            dayExpiration,
            doneStatus,
            toggleModalAction
        };
    }
});
</script>

<style lang="scss">
@tailwind components;

@layer components {
    body {
        .cart {
            &-item {
                @apply my-2 p-1 flex items-center ml-2;
            }
            &-content {
                @apply w-full text-gray-600 text-left font-mono;
            }
        }
        .done {
            @apply line-through text-red-500;
        }
        .title {
            @apply text-red-500;
        }
        .work-counter {
            @apply rounded-md items-center relative w-1/12
            bg-green-500 font-bold;
            transform: translateY(35%);
        }
        .comma {
            @apply text-gray-500 font-bold;
        }
    }
}
</style>
