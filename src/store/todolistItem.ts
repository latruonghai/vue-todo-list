import { defineStore } from 'pinia';
import { TodoListItem, TodoListItemArray } from '../../typings/store';
// import TodoListItemArray
import {
    checkExistElement,
    findExistElementByProperties
} from '../utils/handleArray';
import { getToday } from '../utils/handleDate';

const useTodoList = defineStore('todoListItem', {
    state: (): TodoListItemArray => {
        return {
            todoListArray: [],
            currentItem: {
                todoWorks: '',
                numOfWorks: 0,
                done: false,
                dayCreated: getToday(),
                dayComplete: '',
                order: 0,
                timeStamp: Date.now()
            }
        };
    },
    getters: {
        getStatus(): boolean {
            return this.todoListArray[0].done as boolean;
        }
    },
    actions: {
        addTodoItem(todoItem: TodoListItem): void {
            const todoWorks = todoItem.todoWorks;
            if (
                !checkExistElement(this.todoListArray, todoWorks, 'todoWorks')
            ) {
                this.todoListArray.push(todoItem);
                // sortByDay(arr, )
            } else {
                const item = findExistElementByProperties(
                    this.todoListArray,
                    todoWorks,
                    'todoWorks'
                );
                item.numOfWorks += 1;
            }
        },

        removeTodoItem(index: number): void {
            this.todoListArray.splice(index, 1);
        },
        setDoneItem(index: number): void {
            const stateItem = this.todoListArray[index].done as boolean;
            this.todoListArray[index].done = !stateItem;
        },
        setCurrentItem(todoItem: TodoListItem): void {
            this.currentItem = todoItem;
        },
        updateTodoListItem(todoItem: TodoListItem, index: number): void {
            this.todoListArray[index] = todoItem;
        }
    }
});

export { useTodoList };
