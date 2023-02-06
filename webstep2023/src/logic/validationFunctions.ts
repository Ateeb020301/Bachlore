import { Contract, NewSubProspect, SubProspect } from './interfaces';
import { getCurrentWeek, getWeeksInYear } from './dateFunctions';

export function isValidCalendarEvent(p: SubProspect, currentYear: number, currentWeek: number): boolean {
    let startYear = p.startYear;
    let startWeek = p.startWeek;
    let weeksInStartYear = getWeeksInYear(startYear);

    let endYear = p.endYear;
    let endWeek = p.endWeek;
    let weeksInEndYear = getWeeksInYear(endYear);

    let areBothYearsCurrentYear = startYear === currentYear && endYear === currentYear;
    let isOnlyEndYearInFuture = startYear === currentYear && endYear > currentYear;
    let areBothYearsInFuture = startYear > currentYear && endYear > currentYear;

    if (startYear < currentYear || endYear < currentYear) {
        return false;
    }
    if (areBothYearsCurrentYear) {
        if (endWeek < startWeek) {
            return false;
        }
        if (startWeek < currentWeek) {
            return false;
        }
        if (endWeek > getWeeksInYear(currentYear) || startWeek > getWeeksInYear(currentYear)) {
            return false;
        }

        return true;
    }

    if (isOnlyEndYearInFuture) {
        if (endWeek > weeksInEndYear || startWeek > getWeeksInYear(currentYear)) {
            return false;
        }

        return true;
    }

    if (areBothYearsInFuture) {
        if (startYear === endYear) {
            // Same year in future
            if (endWeek > getWeeksInYear(startYear) || startWeek > getWeeksInYear(startYear)) {
                return false;
            }

            if (endWeek < startWeek) {
                return false;
            }
        } else {
            // Different years in future
            if (endWeek > weeksInEndYear || startWeek > weeksInStartYear) {
                return false;
            }

            if (endYear < startYear) {
                return false;
            }
        }
        return true;
    }

    return true;
}

export const inFutureOrToday = (date: Date) => {
    return date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
};

export const isStringOnlyNumbers = (s: string): boolean => {
    if (s === '') return false;
    // Checks if string only contains digits
    let isnum = /^\d+$/.test(s);
    if (isnum) {
        let n = parseInt(s);
        return n > 0;
    } else {
        return false;
    }
};
export const newSubProspectHasTruthyValues = (subProspect: NewSubProspect): boolean => {
    let hasTruthyValues =
        subProspect.endYear &&
        subProspect.endWeek &&
        subProspect.startYear &&
        subProspect.startWeek &&
        subProspect.probability &&
        subProspect.numOfConsultants &&
        subProspect.prospectId;
    if (hasTruthyValues) {
        return subProspect.endYear >= subProspect.startYear;
    }
    return false;
};

export const isValidWeekNumber = (week: number, year: number) => {
    return week > 0 && week <= getWeeksInYear(year);
};

export const isValidYearString = (year: string) => {
    return year.length === 4;
};

export const isContractValid = (c: Contract): boolean => {
    let currentYear = new Date().getFullYear();
    let validYear = c.startYear >= currentYear;
    let validWeek =
        c.startYear === currentYear ? c.startWeek >= getCurrentWeek() : c.startWeek > 0 && c.startYear >= currentYear;

    return validYear && validWeek;
};
