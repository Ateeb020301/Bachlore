import React from 'react';

interface CalendarSidebarHeaderProps {
    header: string;
    children?: React.ReactNode;
}

export const CalendarSidebarHeader: React.FC<CalendarSidebarHeaderProps> = ({ header, children }) => {
    return (
        <div className='sidebar-header'>
            <strong>{header}</strong>
            <div>{children}</div>
        </div>
    );
};
