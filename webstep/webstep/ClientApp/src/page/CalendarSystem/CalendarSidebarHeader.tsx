import React from 'react';
import './Calendar.css'

interface CalendarSidebarHeaderProps {
    header: string;
    children?: React.ReactNode;
}

export const CalendarSidebarHeader: React.FC<CalendarSidebarHeaderProps> = ({ header, children }) => {

    return (
        <div className='sidebar-header'>
                <div>
                    <strong>
                        {header}
                    </strong>
                </div>
                <div>{children}</div>
            </div>
    );
};
