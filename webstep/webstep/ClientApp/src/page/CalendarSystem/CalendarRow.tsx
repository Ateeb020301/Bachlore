import React from 'react';

interface CalendarRowProps {
    sidebarContent: JSX.Element;
    timelineContent: JSX.Element;
}

export const CalendarRow: React.FC<CalendarRowProps> = ({ sidebarContent, timelineContent }) => {
    return (
        <>
                <div className='sidebar-content'>{sidebarContent}</div>
                <div className='timeline-content'>{timelineContent}</div>
        </>
    );
};
