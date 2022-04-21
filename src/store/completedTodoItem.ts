import { NumberState } from './../../typings/store/index.d';
import { defineStore } from 'pinia';

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
            console.log('filter', this.filterTodoList);
        }
    }
});
