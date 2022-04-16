export interface TodoListItem{
    todoWorks: string;
    numOfWorks?: number;
    done?: boolean;
    dayCreated?: string;
}

export interface TodoListItemArray{
    todoListArray: TodoListItem[],
    currentItem: TodoListItem
}


export type StateGlobal =  TodoListItem | TodoListItemArray| null;