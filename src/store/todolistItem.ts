import { TodoListItemArray, TodoListItem } from '../../typings/store';
import { defineStore } from 'pinia';
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
                dayIssue: '',
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

        removeTodoItem(todoItem: TodoListItem): void {
            this.todoListArray.splice(this.todoListArray.indexOf(todoItem), 1);
        },
        setDoneItem(todoItem: TodoListItem): void {
            const stateItem = todoItem.done;
            this.todoListArray[this.todoListArray.indexOf(todoItem)].done =
                !stateItem;
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
