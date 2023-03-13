import React from 'react';

interface CalendarTimelineBlockerProps { }

const style = {
    display: 'block',
    height: '100%',
    width: '100%',
    backgroundColor: '#637081',
};
export const CalendarTimelineBlocker: React.FC<CalendarTimelineBlockerProps> = ({ }) => {
    return <span style={style}></span>;
};