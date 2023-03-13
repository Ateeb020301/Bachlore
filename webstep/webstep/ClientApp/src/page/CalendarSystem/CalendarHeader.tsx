import React from 'react';

interface CalendarHeaderProps {
    header: string;
    children?: React.ReactNode;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ header, children }) => {
    return (
        <div className='calendar-header'>
            <strong>{header}</strong>
            {children}
        </div>

    );
};
