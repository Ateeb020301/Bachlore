import React, { useState } from 'react';
import { render } from 'react-dom';
import './Calendar.css';
import { CalendarHeader } from './CalendarHeader';
import { CalendarRow } from './CalendarRow';
import { CalendarWeeks } from './CalendarWeeks';
import { DisplayToggler } from './DisplayToggler';

interface CalendarProps {
    title: string;
    render: (b: boolean) => JSX.Element[] | undefined;
}

export const Calendar: React.FC<CalendarProps> = ({ title, render }) => {
    const [showEvents, setShowEvents] = useState(true);

    const toggle = () => {
        setShowEvents(!showEvents);
    };

    const sections = render(showEvents);

    return (
        <div className='calendar-wrapper'>
            <CalendarRow
                sidebarContent={
                    <CalendarHeader header={title}>
                        <DisplayToggler toggle={toggle} currentState={showEvents} />
                    </CalendarHeader>
                }
                timelineContent={<CalendarWeeks />}
            />
            {sections && sections}
        </div>
    );
};
