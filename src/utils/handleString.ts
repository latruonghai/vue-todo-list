export const getIndexFromIdName = (name: string): number => {
    const length = name.length;
    return Number(name.split("-")[length - 1]);
}