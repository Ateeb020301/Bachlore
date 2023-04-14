import React, { useRef, useState } from 'react';
import { DeleteCornerButton } from '../Utils/DeleteCornerButton';
import { getCurrentWeek, getWeeksInYear } from '../../logic/dateFunctions';
import '../Utils/Normalize.css';
import { DragBar } from '../Utils/DragBar';
import { constants } from '../../logic/constants';

export interface Eventable {
    id: number;
    startWeek: number;
    startYear: number;
    endWeek: number;
    endYear: number;
}
interface CalendarEventProps {
    eventObj: Eventable;
    render: JSX.Element;
    color: string;
    deleteSelf: () => void;
    editPlacement: (input: Eventable) => void;
}
// CONSTANTS
const currentYear = new Date().getFullYear();
const currentWeek = getCurrentWeek();
const calendarRowHeight = constants.calendarRowHeight;

// STYLES
const inactiveStyle = {
    borderRadius: '10px',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
};

const activeStyle = {
    borderRadius: '12px',
    borderLeft: '2px solid black',
    borderRight: '1px solid black',
    borderBottom: '2px solid black',
    boxShadow: '5px 2px',
    opacity: 0.5,
};

export interface DragSideType {
    side: 'left' | 'right' | 'none';
}
// A calendar event is an element placed on the timeline
export const CalendarEvent: React.FC<CalendarEventProps> = ({ eventObj, render, color, editPlacement, deleteSelf }) => {
    const [isMoving, setIsMoving] = useState(false);
    const [isDragging, setIsDragging] = useState<DragSideType>({ side: 'none' });
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    const [startYear, setStartYear] = useState(eventObj.startYear);
    const [startWeek, setStartWeek] = useState(eventObj.startWeek);
    const [endYear, setEndYear] = useState(eventObj.endYear);
    const [endWeek, setEndWeek] = useState(eventObj.endWeek);

    const eventDivRef = useRef<HTMLDivElement>(null);

    // Calculates position and length of the event (TODO: Unit tests)
    let startPosition = getStartPositionInTimeline(startYear, startWeek);
    let widthFromWeeks = 40 * getDurationOfEventInWeeks(startYear, startWeek, endYear, endWeek) + 'px';

    const placementStyle = {
        position: 'absolute' as 'absolute',
        left: startPosition + 'px',
        top: '0px',
        height: calendarRowHeight,
        width: widthFromWeeks,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'all-scroll',
        zIndex: 1,
    };

    const stopEditing = () => {
        setIsMoving(false);
        setIsDragging({ side: 'none' });
    };

    const changeIsDragging = (newValue: DragSideType) => {
        setIsDragging(newValue);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // only left mouse button
        if (e.button !== 0) return;
        if (e.target !== e.currentTarget) return;
        setLastMousePosition({ x: e.pageX, y: e.pageY });
        setIsMoving(true);

        e.preventDefault();
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (timeoutId === undefined) return;
        stopTimeoutToStopDragging(timeoutId);
    };
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // only left mouse button
        if (e.button !== 0) return;

        updateEventTime();
        stopEditing();
        e.preventDefault();
    };
    const startTimeoutToStopDragging = (msToWait: number) => {
        return setTimeout(() => {
            setIsDragging({ side: 'none' });
            updateEventTime();
        }, msToWait);
    };

    const stopTimeoutToStopDragging = (id: NodeJS.Timeout) => {
        clearTimeout(id);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isMoving && isDragging.side === 'none') return;

        let distance = e.pageX - lastMousePosition.x;
        let columnSize = 38; // should be slightly less than columnWidth to allow movement of small events

        if (distance > columnSize) {
            if (endWeek === getMaxWeekBound() && endYear === currentYear + 2) return;

            if (isMoving) {
                incrementStartWeek();
                incrementEndWeek();
            } else if (isDragging.side === 'left') {
                incrementStartWeek();
            }
            setLastMousePosition({ x: e.pageX, y: e.pageY });
        } else if (distance < -columnSize) {
            if (startWeek === currentWeek && startYear === currentYear) return;

            if (isMoving) {
                decrementStartWeek();
                decrementEndWeek();
            } else if (isDragging.side === 'right') {
                decrementEndWeek();
            }

            setLastMousePosition({ x: e.pageX, y: e.pageY });
        }

        e.preventDefault();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isMoving && isDragging.side === 'none') return;

        if (isMoving) {
            updateEventTime();
            setIsMoving(false);
            return;
        }

        setTimeoutId(startTimeoutToStopDragging(500));
    };
    const getMaxWeekBound = () => {
        return 104 - (getWeeksInYear(currentYear) - currentWeek + 1) - getWeeksInYear(currentYear + 1);
    };

    const incrementStartWeek = () => {
        if (startWeek === endWeek) return;
        if (startWeek >= getWeeksInYear(startYear)) {
            let nextYear = startYear + 1;

            setStartYear(nextYear);
            setStartWeek(1);
        } else {
            let nextWeek = startWeek + 1;
            setStartWeek(nextWeek);
        }
    };

    const decrementStartWeek = () => {
        if (startWeek === currentWeek && startYear === currentYear) return;
        if (startWeek <= 1) {
            let previousYear = startYear - 1;
            setStartWeek(getWeeksInYear(previousYear));
            setStartYear(previousYear);
        } else {
            let previousWeek = startWeek - 1;
            setStartWeek(previousWeek);
        }
    };

    const decrementEndWeek = () => {
        if (startWeek === endWeek) return;
        if (endWeek <= 1) {
            let previousYear = endYear - 1;
            setEndWeek(getWeeksInYear(previousYear));
            setEndYear(previousYear);
        } else {
            let previousWeek = endWeek - 1;
            setEndWeek(previousWeek);
        }
    };

    const incrementEndWeek = () => {
        if (endWeek === getMaxWeekBound() && endYear === currentYear + 2) return;
        if (endWeek >= getWeeksInYear(endYear)) {
            let nextYear = endYear + 1;
            setEndYear(nextYear);
            setEndWeek(1);
        } else {
            let nextWeek = endWeek + 1;
            setEndWeek(nextWeek);
        }
    };

    const updateEventTime = () => {
        if (startWeek !== eventObj.startWeek || endWeek !== eventObj.endWeek) {
            editPlacement({
                id: eventObj.id,
                startWeek: startWeek,
                startYear: startYear,
                endWeek: endWeek,
                endYear: endYear,
            });
        }
    };

    // Wrapper function to avoid passing state setting method directly
    const setMousePosition = (newPos: { x: number; y: number }) => {
        setLastMousePosition(newPos);
    };

    const isActive = isMoving || isDragging.side !== 'none';

    return (
        <div
            style={isActive ? { ...placementStyle, ...activeStyle } : { ...placementStyle, ...inactiveStyle }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            ref={eventDivRef}>
            <DragBar
                growInDirection={decrementStartWeek}
                direction='left'
                setParentDragSide={changeIsDragging}
                setParentMousePosition={setMousePosition}
            />

            {render}

            <DragBar
                growInDirection={incrementEndWeek}
                direction='right'
                setParentDragSide={changeIsDragging}
                setParentMousePosition={setMousePosition}
            />
            {isDragging.side !== 'right' && deleteSelf && <DeleteCornerButton deleteFunc={deleteSelf} />}
        </div>
    );
};

// Calculates position in timeline that corresponds to year and week in timeline
const getStartPositionInTimeline = (startYear: number, startWeek: number): number => {
    let columnWidth = constants.calendarColumnWidth;
    let currentWeek = getCurrentWeek(); // corresponds to offset between gridline number and week number

    // Its important to subtract currentWeek from sum weeks before multiplying with columnWidth.
    // This is because the timeline starts at the current week number.
    // Any calculations therefore must take into consideration that the first year does not start at 1.
    if (startYear === currentYear) {
        if (startWeek === 1) return columnWidth;
        return (startWeek - currentWeek) * columnWidth;
    } else if (startYear === currentYear + 1) {
        return (getWeeksInYear(startYear) + (startWeek - currentWeek)) * columnWidth;
    } else if (startYear === currentYear + 2) {
        return (getWeeksInYear(startYear) + getWeeksInYear(startYear + 1) + (startWeek - currentWeek)) * columnWidth;
    }

    return 0;
};

const getDurationOfEventInWeeks = (startYear: number, startWeek: number, endYear: number, endWeek: number): number => {
    if (startYear === endYear) {
        return endWeek - startWeek + 1;
    }

    if (startYear + 1 === endYear) {
        return getWeeksInYear(startYear) - startWeek + endWeek + 1;
    }

    if (startYear + 2 === endYear) {
        return getWeeksInYear(startYear) - startWeek + getWeeksInYear(startYear + 1) + endWeek + 1;
    }

    return 0;
};
