/**
  Get the number of ISO weeks in any given year.
 */
export function getWeeksInYear(y: number) {
    var d, isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52;
}

export function getWeekNumbersArrayFromTotal(totalWeeks: number): number[] {
    let weekNumbers: number[] = [];
    for (let i = 1; i <= totalWeeks; i++) {
        weekNumbers.push(i);
    }
    return weekNumbers;
}

/**
  Creates an array of all week numbers spanning the years in parameter array.
 */
export function getMultiYearWeekNumbersArray(years: number[]): number[] {
    let multiYearWeekNumbers: number[] = [];
    years.forEach((year) => {
        let totalWeeks = getWeeksInYear(year);
        let weekNumbers = getWeekNumbersArrayFromTotal(totalWeeks);
        multiYearWeekNumbers = multiYearWeekNumbers.concat(weekNumbers);
    });

    return multiYearWeekNumbers;
}

export function getCurrentWeek(): number {
    let generator = require('current-week-number');
    return generator();
}

// stackoverflow magic
const getZeroBasedIsoWeekDay = (date: Date) => (date.getDay() + 6) % 7;
const getIsoWeekDay = (date: Date) => getZeroBasedIsoWeekDay(date) + 1;

/**
 * Gives the date of a certain weekday in a certain week in a certain year.
 * @param year Year
 * @param week ISO Week number
 * @param weekDay 1 = monday 7 = sunday
 */
export function weekDateToDate(year: number, week: number, weekDay: number) {
    const zeroBasedWeek = week - 1;
    const zeroBasedWeekDay = weekDay - 1;
    let days = zeroBasedWeek * 7 + zeroBasedWeekDay;

    // Dates start at 2017-01-01 and not 2017-01-00
    days += 1;

    const firstDayOfYear = new Date(year, 0, 1);
    const firstIsoWeekDay = getIsoWeekDay(firstDayOfYear);
    const zeroBasedFirstIsoWeekDay = getZeroBasedIsoWeekDay(firstDayOfYear);

    // If year begins with W52 or W53
    if (firstIsoWeekDay > 4) days += 8 - firstIsoWeekDay;
    // Else begins with W01
    else days -= zeroBasedFirstIsoWeekDay;

    return new Date(year, 0, days);
}

/**
 * Checks if date d is before first monday of year y.
 * @param d Date to compare with first monday
 * @param y Year of first monday
 * @returns Returns whether the date is before the first monday of year y
 */
export const isDateBeforeFirstMonday = (d: Date, y: number) => {
    let firstMonday = weekDateToDate(y, 1, 1);
    return firstMonday.getTime() > d.getTime();
};

export function ISO8601_week_no(d: Date) {
    var tdt = new Date(d.valueOf());
    var dayn = (d.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
}

export function toISOStringNoTimezoneOffset(d: Date): string {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
}

export const weekIsLastInYear = (w: number, d: Date) => {
    return w >= getWeeksInYear(d.getFullYear());
};

const nearestPointFive = (num: number): number => {
    return Number((Math.round(num * 2) / 2).toFixed(1));
};
export const capacityToDays = (capacity: number, capped = false): number => {
    if (capacity < 0) return 0;
    if (capped) {
        if (capacity > 100) {
            return 5;
        }
    }
    return nearestPointFive(capacity / 20);
};

export const daysToCapacity = (days: number, capped = false): number => {
    if (days < 0) return 0;
    if (capped) {
        if (days > 5) {
            return 100;
        }
    }
    return nearestPointFive(days * 20);
};
