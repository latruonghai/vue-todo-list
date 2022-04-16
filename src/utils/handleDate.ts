import moment, { Moment } from "moment";

const FORMAT_ISO =  "dddd, DD-MM-YYYY";

// Convert day to number
// export function convertDayToNumber(day: string): number {
//     return parseInt(day.split("/")[0]);
// }
export function getToday(): string{
    return moment().format(FORMAT_ISO);
}
export function dayFrom(day1: string): number{

    const today = moment(getToday(),FORMAT_ISO);
    const dayCompared: Moment = moment(day1, FORMAT_ISO);

    const day = dayCompared.diff(today);
    return day;

    
}
export function convertDayToNumber(day: string): string {
    return day.valueOf();
}

export function getRelativeDay(numOfDay: number): string {
    // switch
    switch (numOfDay) {
        case 0:
            return "Today";
        case 1:
            return "Tomorrow";
        case -1:
            return "Yesterday";
        default:
            return "";
    }
}