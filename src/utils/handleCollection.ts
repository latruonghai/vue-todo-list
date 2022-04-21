import _ from 'lodash';
import { TodoListItem } from '../../typings/store';

export const filterObject = (obj: TodoListItem[], filter: any) => {
    return _.filter(obj, filter);
};

export const findIndexObjectByProperties = (obj: any, filter: any): number => {
    return _.findIndex(obj, filter);
};
