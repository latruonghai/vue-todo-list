import _ from 'lodash';
export const getIndexFromIdName = (name: string): number => {
    const length = name.length;
    return Number(name.split('-')[length - 1]);
};

export const removeBlankString = (str: string): string => {
    return _.trim(str);
};

export const standardizeString = (str: string): string => {
    return _.capitalize(removeBlankString(str));
};

export const toLowerString = (str: string): string => {
    return _.toLower(str);
};
export const toUpperCase = (str: string): string => {
    return _.upperCase(str);
};
