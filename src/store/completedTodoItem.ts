import { defineStore } from 'pinia';
import { NumberState } from './../../typings/store/index.d';

interface StateItem {
    filterTodoList: NumberState;
}
export const useCompletedToDoItem = defineStore('completedTodoItem', {
    state: (): StateItem => {
        return {
            filterTodoList: -1
        };
    },
    actions: {
        setFilterState(state: NumberState): void {
            this.filterTodoList = state;
        }
    }
});
