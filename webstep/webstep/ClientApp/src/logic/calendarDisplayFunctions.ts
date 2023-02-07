import { getCurrentWeek, getWeeksInYear } from './dateFunctions';

// UNFINISHED REFACTOR

export function getColorFromSumConsultants(consultants: number): string {
    if (consultants < 0) return 'lightblue'; //random

    if (consultants === 1) {
        return '#FFFFE0';
    } else if (consultants < 3) {
        return '#FFFACD';
    } else if (consultants < 5) {
        return '#FAFAD2';
    } else if (consultants < 7) {
        return '#FFEFD5';
    } else if (consultants < 9) {
        return '#FFA500';
    } else if (consultants < 11) {
        return '#FF8C00';
    } else if (consultants < 13) {
        return '#FF7F50';
    } else if (consultants < 15) {
        return '#FF6347';
    } else if (consultants < 17) {
        return '#e60000';
    } else {
        return '#e60000';
    }
}

export function getColorFromDaysOfWeek(days: number): string {
    if (days < 0) return 'lightblue'; //random

    if (days === 1) {
        return '#ff9966';
    } else if (days < 3) {
        return '#ff884d';
    } else if (days < 4) {
        return '#ff7733';
    } else if (days < 5) {
        return '#ff661a';
    } else {
        return '#ff5500';
    }
}

const currentYear = new Date().getFullYear();
const currentWeek = getCurrentWeek();

export const getEndWeekPlacement = (endWeek: number, endYear: number): number => {
    if (endYear === currentYear) {
        return endWeek - currentWeek + 2;
    } else if (endYear === currentYear + 1) {
        let weeksOnCurrentYearTimeline = getWeeksInYear(currentYear) - currentWeek;
        return weeksOnCurrentYearTimeline + endWeek + 2;
    } else if (endYear === currentYear + 2) {
        let weeksOnCurrentYearTimeline = getWeeksInYear(currentYear) - currentWeek;
        let weeksOnMiddleYearTimeline = getWeeksInYear(currentYear + 1);

        return weeksOnCurrentYearTimeline + weeksOnMiddleYearTimeline + endWeek + 2;
    } else {
        // should never happen
        return 1;
    }
};

export const getStartWeekPlacement = (startWeek: number, startYear: number): number => {
    if (startYear === currentYear) {
        return startWeek - currentWeek + 1;
    } else if (startYear === currentYear + 1) {
        let weeksOnCurrentYearTimeline = getWeeksInYear(currentYear) - currentWeek;
        return weeksOnCurrentYearTimeline + startWeek + 1;
    } else if (startYear === currentYear + 2) {
        let weeksOnCurrentYearTimeline = getWeeksInYear(currentYear) - currentWeek;
        let weeksOnMiddleYearTimeline = getWeeksInYear(currentYear + 1);

        return weeksOnCurrentYearTimeline + weeksOnMiddleYearTimeline + startWeek + 1;
    } else {
        // should never happen
        return 1;
    }
};
