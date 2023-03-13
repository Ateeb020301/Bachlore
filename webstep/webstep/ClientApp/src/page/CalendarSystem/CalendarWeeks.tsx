import React, { useMemo } from 'react';
import { constants } from '../../logic/constants';
import { getMultiYearWeekNumbersArray } from '../../logic/dateFunctions';
import { getCurrentWeek } from '../../logic/dateFunctions';
import { v4 as uuidv4 } from 'uuid';

// CONSTANTS
const columnWidth = constants.calendarColumnWidth;
const weeksToShow = constants.weeksToShow;
const currentYear = new Date().getFullYear();
const secondYear = currentYear + 1;
const thirdYear = currentYear + 2;

const currentWeek = getCurrentWeek();
const firstWeekIndex = currentWeek - 1;
const endWeekIndex = firstWeekIndex + weeksToShow;

export const CalendarWeeks = () => {
    let arrayOfWeekNumbers = useMemo(() => getMultiYearWeekNumbersArray([currentYear, secondYear, thirdYear]), []);

    let weeksContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(' + weeksToShow + ',' + columnWidth + 'px)',
        width: '100%',
        height: columnWidth + 'px',
    };
    let weekBoxStyle = {
        width: '100%',
        borderLeft: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    };

    let weeks: JSX.Element[] = [];

    for (let weekIndex = firstWeekIndex; weekIndex < endWeekIndex; weekIndex++) {
        weeks.push(
            <span key={uuidv4()} style={weekBoxStyle}>
                {arrayOfWeekNumbers[weekIndex].toString()}
            </span>
        );
    }

    return (
        <div style={weeksContainerStyle}>
            {weeks}
        </div>
    );
};
