<template>
    <div>
        <Modal v-show="isShow">
            <template #body>
                <BasicForm :itemSelected="stateTodoList.currentItem" />
            </template>
        </Modal>
        <div class="todo-list-form">
            <div class="todo-list-section">
                <span class="display-date">{{ today }}</span>
                <div class="todo-list-content">
                    <h1 class="todo-list-title">Todo List</h1>
                    <div class="todo-list-input-section">
                        <Input
                            :idName="'todo-item-content'"
                            placeHolder="Add Todo"
                        />
                        <Input typeName="date" idName="todo-item-date" />
                        <Button
                            contentButton="Add"
                            :extraClassName="'add'"
                            :onClickHandler="addTodoHandler"
                            titleString="Add new work into todo list"
                        ></Button>
                    </div>
                    <div class="cart-section">
                        <ListItem
                            v-for="(item, index) in arrayCart"
                            :key="index"
                            :idName="`cart-${item.order}`"
                            :itemContent="item"
                            :done="item.done"
                            :order="item.order"
                        />
                    </div>
                </div>
                <div class="todo-list-footer">
                    <slot v-if="isHasItem" name="footer">
                        <Button
                            extraClassName="show-all"
                            contentButton="All Works"
                            :onClickHandler="() => onClickCompleted(-1)"
                            :isDisable="matchValue(-1)"
                            titleString="Show all works"
                        />

                        <Button
                            extraClassName="completed"
                            contentButton="Completed Works"
                            :onClickHandler="() => onClickCompleted(1)"
                            :isDisable="matchValue(1)"
                            titleString="Show completed works"
                        />
                        <Button
                            extraClassName="uncompleted"
                            contentButton="Uncompleted Works"
                            :onClickHandler="() => onClickCompleted(0)"
                            :isDisable="matchValue(0)"
                            titleString="Show uncompleted works"
                        />
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
// import my-button from '../components/my-button.vue';
import Input from './Input.vue';
import ListItem from './ListItem.vue';
import Button from './Button.vue';
import { TodoListItem } from '../../typings/store';
import { useCompletedToDoItem, useTodoList, useToggleModal } from '../store';
import { numberOfExistObjectElement } from '../utils/handleArray';
import {
    getToday,
    normalizeDate,
    sortByDay,
    toTimeStamp
} from '../utils/handleDate';
import { standardizeString } from '../utils/handleString';
import { getElementInputContent } from '../utils/handleDOM';
import Modal from './Modal.vue';
import BasicForm from './Form/BasicForm.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'TodoList',
    inheritAttrs: false,
    components: {
        // my-button,
        Input,
        ListItem,
        Modal,
        BasicForm,
        Button
    },
    props: {
        itemArray: {
            type: Array as PropType<TodoListItem[]>,
            default: () => []
        }
    },
    setup({ itemArray }) {
        const { isShow } = storeToRefs(useToggleModal());
        const stateTodoList = useTodoList();
        const { addTodoItem } = stateTodoList;
        const { currentItem, todoListArray } = storeToRefs(stateTodoList);
        const completeTodoList = useCompletedToDoItem();
        const { setFilterState } = completeTodoList;
        const { filterTodoList } = storeToRefs(completeTodoList);
        const today = getToday();

        const onClickCompleted = (value: any) => {
            setFilterState(value);
        };

        const matchValue = (value: any) => {
            return filterTodoList.value === value;
        };
        // console.log('current', currentItem);
        const arrayCart = computed(() => {
            return sortByDay(itemArray);
        });

        const addTodoHandler = () => {
            const content = getElementInputContent('todo-item-content');
            const dateValueContent = getElementInputContent('todo-item-date');

            const dayComplete =
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
                    dayComplete: dayComplete,
                    order: todoListArrayLength.value,
                    // : getToday(),
                    timeStamp: toTimeStamp(dayComplete)
                };

                addTodoItem(item);
                setFilterState(-1);
            }
        };

        const isHasItem = computed((): boolean => {
            return todoListArrayLength.value > 0;
        });

        const todoListArrayLength = computed(() => {
            return todoListArray.value.length;
        });

        return {
            stateTodoList,
            addTodoHandler,
            arrayCart,
            todoListArrayLength,
            isShow,
            currentItem: currentItem.value,
            today,
            isHasItem,
            onClickCompleted,
            matchValue
        };
    }
});
</script>
<style lang="scss">
@tailwind components;

@layer components {
    body {
        .display-date {
            @apply font-thin text-gray-500 float-right italic;
        }
        .todo-list {
            &-title {
                @apply text-2xl font-black mb-2;
            }
            &-section {
                @apply bg-white rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg shadow-lg;
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

            &-button {
                @apply ml-2 rounded-xl bg-white border-teal-400 text-teal-600 cursor-pointer flex-shrink-0 p-2 hover:text-teal-800 hover:border-teal-600;
            }
        }
        .cart-section {
            @apply m-4 flex-col shadow-lg overflow-auto;
        }
    }
}
</style>
!==
