export interface TodoListItem{
    todoWoks: string;
    numOfWorks?: number;
    done?: boolean;
}

export interface TodoListItemArray{
    todoListArray: TodoListItem[]
}
export type StateGlobal =  TodoListItem | TodoListItemArray| null;