import { defineStore } from 'pinia';
import { TodoListItem, TodoListItemArray } from '../../typings/globals';
import {
    checkExistElement,
    findExistElementByProperties
} from '../utils/handleArray';
import { getToday, convertDayToNumber, dayFrom } from '../utils/handleDate';

const useTodoList = defineStore('todoListItem', {
    state: (): TodoListItemArray => {
        return {
            todoListArray: []
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
            } else {
                const item = findExistElementByProperties(
                    this.todoListArray,
                    todoWorks,
                    'todoWorks'
                );
                console.log('item ', item);
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
        }
    }
});

export default useTodoList;
