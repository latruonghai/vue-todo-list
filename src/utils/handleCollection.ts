import _ from 'lodash';

export const filterObject = (obj: any, filter: any) => {
    return _.filter(obj, filter);
};
