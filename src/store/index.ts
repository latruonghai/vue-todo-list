import { StateGlobal, TodoListItem } from './../../typings/globals.d';
import { reactive } from "vue";

const state: StateGlobal = reactive(
    {
        todoListArray: [
            {
                todoWoks: "Hello",
                numOfWorks: 0,
                done: false
            }
        ]
    }
);

const methods = {
    addTodoListItem(todoListItem: TodoListItem): number {
        return state.todoListArray.push(todoListItem);
    }
}
export {
    state,
    methods
}