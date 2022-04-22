<script lang="ts">
// import useTodoList from '../store/todolistItem';
import { computed, defineComponent } from '@vue/runtime-core';
import { TodoListItem } from '../../typings/store';
import { useCompletedToDoItem, useTodoList, useToggleModal } from '../store';
import { findIndexObjectByProperties } from '../utils/handleCollection';
import { dayFrom, getRelativeDay } from '../utils/handleDate';
import Button from './Button.vue';
// import produce from "immer";
import Input from './Input.vue';

export default defineComponent({
    inheritAttrs: false,
    props: {
        itemContent: {
            type: Object as () => TodoListItem,
            default: 'Todo',
            validation(value: string) {
                return value.length > 0;
            }
        },
        order: Number,
        idName: String
    },
    components: {
        Button,
        Input
    },
    setup(props: any) {
        const todoListStore = useTodoList();
        const toggleModal = useToggleModal();
        const { setFilterState } = useCompletedToDoItem();
        const { toggleModalAction } = toggleModal;
        const { removeTodoItem, setDoneItem, setCurrentItem } = todoListStore;
        const indexOfElement = computed(() => {
            return findIndexObjectByProperties(todoListStore.todoListArray, {
                order: props.order
            });
        });

        const removeItemHandler = () => {
            removeTodoItem(indexOfElement.value);
            setFilterState(-1);
        };

        const setDoneItemHandler = () => {
            setDoneItem(indexOfElement.value);
        };

        const onClickEdit = () => {
            setCurrentItem(props.itemContent);
            toggleModalAction(true);
        };
        const doneStatus = computed(() => {
            return props.itemContent.done ? 'done' : '';
        });
        const todoInformation = computed(() => {
            return `${props.itemContent.todoWorks} on ${props.itemContent.dayComplete}`;
        });
        const dayExpiration = computed(() => {
            const dayString = (<TodoListItem>props.itemContent)
                .dayComplete as string;

            const dayRelative = getRelativeDay(dayFrom(dayString));
            // const dayCreated = normalizeDate(dayString);
            return dayRelative === '' ? dayString : dayRelative;
        });
        return {
            removeItemHandler,
            setDoneItemHandler,
            dayExpiration,
            doneStatus,
            toggleModalAction,
            setCurrentItem,
            onClickEdit,
            todoInformation
        };
    }
});
</script>

<template>
    <div class="work-counter">
        <span>{{ itemContent.numOfWorks }}</span>
    </div>
    <div :id="`cart-${order}`" :title="todoInformation" class="cart-item">
        <!-- <input :type="'checkbox'" v-model="getStatus" @change="
        "/> -->
        <p :class="`cart-content ${doneStatus}`">
            {{ itemContent.todoWorks }}<span class="comma"> | </span>
            <span class="title">{{ dayExpiration }}</span>
        </p>
        <!-- <p v-else  class="cart-content done" >{{itemContent.todoWorks}}</p> -->
        <Button
            :contentButton="doneStatus ? 'Not Done' : 'Done'"
            :extraClassName="'edit'"
            :onClickHandler="setDoneItemHandler"
            :titleString="doneStatus ? 'Make it not done' : 'Make it done'"
        />
        <Button
            v-if="!itemContent.done"
            titleString="Edit todo list information"
            contentButton="Edit"
            :extraClassName="'remove'"
            :onClickHandler="onClickEdit"
        />
        <Button
            v-else
            titleString="Remove todo list"
            contentButton="Remove"
            :extraClassName="'remove'"
            :onClickHandler="removeItemHandler"
        />
    </div>
</template>

<style lang="scss">
@tailwind components;

@layer components {
    body {
        .cart {
            &-item {
                @apply my-2 p-1 flex items-center ml-2 hover:scale-110;
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
