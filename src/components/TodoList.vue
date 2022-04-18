<template>
    <div class="todo-list-form">
        <div class="todo-list-section">
            <div class="todo-list-content">
                <h1 class="todo-list-title">Todo List</h1>
                <div class="todo-list-input-section">
                    <Input
                        :idName="'todo-item-content'"
                        placeHolder="Add Todo"
                    />
                    <Input
                        typeName="date"
                        idName="todo-item-date"
                    />
                    <Button
                        contentButton="Add"
                        :extraClassName="'add'"
                        :onClickHandler="addTodoHandler"
                    ></Button>
                </div>
                <div
                    class="cart-section"
                    v-for="(item, index) in arrayCart"
                    :key="index"
                >
                    <Cart
                        :itemContent="item"
                        :done="item.done"
                        :order="item.order"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Button from '../components/Button.vue';
import Input from './Input.vue';
import Cart from './CartItem.vue';
import { TodoListItem } from '../../typings/store';
import { useTodoList } from '../store';
import { numberOfExistObjectElement } from '../utils/handleArray';
import {
    getToday,
    normalizeDate,
    sortByDay,
    toTimeStamp
} from '../utils/handleDate';
import { standardizeString } from '../utils/handleString';
import { getElementInputContent } from '../utils/handleDOM';

export default defineComponent({
    name: 'TodoList',
    components: {
        Button,
        Input,
        Cart
    },
    props: {
        itemArray: {
            type: Array as PropType<TodoListItem[]>,
            default: () => []
        }
    },
    setup() {
        const stateTodoList = useTodoList();
        const { addTodoItem } = stateTodoList;
        const arrayCart = computed(() => {
            console.log('arrayCart', stateTodoList.todoListArray);
            let arr = sortByDay(stateTodoList.todoListArray);

            return arr;
        });

        const addTodoHandler = () => {
            const content = getElementInputContent('todo-item-content');
            const dateValueContent = getElementInputContent('todo-item-date');
            const today = getToday();
            const dayIssue =
                (dateValueContent && normalizeDate(dateValueContent)) || today;

            if (content.length > 0) {
                const item: TodoListItem = {
                    todoWorks: standardizeString(content),
                    done: false,
                    numOfWorks:
                        numberOfExistObjectElement(
                            stateTodoList.todoListArray,
                            content,
                            'todoWorks'
                        ) + 1,
                    dayCreated: today,
                    dayIssue: dayIssue,
                    order: todoListArrayLength.value,
                    // : getToday(),
                    timeStamp: toTimeStamp(dayIssue)
                };

                addTodoItem(item);
            }
        };

        const todoListArrayLength = computed(() => {
            return stateTodoList.todoListArray.length;
        });

        return {
            stateTodoList,
            addTodoHandler,
            arrayCart,
            todoListArrayLength
        };
    }
});
</script>
<style lang="scss">
@tailwind components;

@layer components {
    body {
        .todo-list {
            &-title {
                @apply text-2xl font-black;
            }
            &-section {
                @apply bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg;
            }
            &-form {
                @apply w-full flex flex-col items-center justify-center bg-teal-100 font-sans;
            }
            &-content {
                @apply mb-6 left-0;
            }
            &-input-section {
                @apply flex mt-1;
            }
            // &-input-area{
            //     @apply shadow-lg border-2 appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500 border-gray-400;
            // }
            &-button {
                @apply ml-2 rounded-xl bg-white border-teal-400 text-teal-600 cursor-pointer flex-shrink-0 p-2 hover:text-teal-800 hover:border-teal-600;
            }
        }
        .cart-section {
            @apply m-4 flex-col shadow-lg;
        }
    }
}
</style>
!==
