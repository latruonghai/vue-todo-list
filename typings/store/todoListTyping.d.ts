interface TodoListItem {
    todoWorks: string;
    numOfWorks?: number;
    done?: boolean;
    dayCreated?: string;
    dayIssue?: string;
    order?: number;
    timeStamp?: number;
}

interface TodoListItemArray {
    todoListArray: TodoListItem[];
    // currentItem: TodoListItem;
}

type StateGlobal = TodoListItem | TodoListItemArray | null;

export { TodoListItem, TodoListItemArray, StateGlobal };
