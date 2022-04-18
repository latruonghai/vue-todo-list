import _ from 'lodash';
import moment, { Moment } from 'moment';

const FORMAT_ISO = 'dddd, DD-MM-YYYY';
const FORMAT_US_DATE = 'YYYY-MM-DD';

// Convert day to number
// export function convertDayToNumber(day: string): number {
//     return parseInt(day.split("/")[0]);
// }
export function getToday(): string {
    return moment().format(FORMAT_ISO);
}

export function normalizeDate(date: string): string {
    return moment(date, FORMAT_US_DATE).format(FORMAT_ISO);
}
export function dayFrom(day1: string): number {
    const today = moment(getToday(), FORMAT_ISO);
    const dayCompared: Moment = moment(day1, FORMAT_ISO);

    const day = dayCompared.diff(today, 'days');
    return day;
}
export function convertDayToNumber(day: string): string {
    return day.valueOf();
}

export function getRelativeDay(numOfDay: number): string {
    // switch
    switch (numOfDay) {
        case 0:
            return 'Today';
        case 1:
            return 'Tomorrow';
        case -1:
            return 'Yesterday';
        default:
            return '';
    }
}

export function sortByDay(day1: any[]) {
    return _.sortBy(day1, [
        function (o) {
            return o.timeStamp;
        }
    ]);
}

export function toTimeStamp(day1: string): number {
    return moment(day1, FORMAT_ISO).unix();
}
