import { defineStore } from "pinia";
import { TodoListItem, TodoListItemArray } from "../../typings/globals";

const useTodoList = defineStore("todoListItem",{
    state: ():TodoListItemArray => {
        return {
            todoListArray: [
                {
                    todoWorks: "Hello",
                    numOfWorks: 1,
                    done: true
                }
            ],
            currentItem: {
                todoWorks: "",
                numOfWorks: 0,
                done: false
            }
            
        }
    },
    getters:{
        getStatus(): boolean {
            return this.todoListArray[0].done as boolean;
        }
    },
    actions: {
        addTodoItem(todoItem: TodoListItem): void {
            this.todoListArray.push(todoItem);
        },
        removeTodoItem(todoItem: TodoListItem): void {
            this.todoListArray.splice(this.todoListArray.indexOf(todoItem), 1);
        },
        setCurrentItem(todoItem: TodoListItem): void {
            this.currentItem = todoItem;
        },
        setDoneItem(todoItem: TodoListItem): void {
            const stateItem = todoItem.done;
            // console.log("stateItem", stateItem);
            this.todoListArray[this.todoListArray.indexOf(todoItem)].done = !stateItem;
        }
    }
})

export default useTodoList;