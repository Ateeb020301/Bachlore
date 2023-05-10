import React from 'react';
import './Calendar.css'
import { Box } from '@mui/material';

interface CalendarSidebarHeaderProps {
    header: string;
    children?: React.ReactNode;
}

export const CalendarSidebarHeader: React.FC<CalendarSidebarHeaderProps> = ({ header, children }) => {

    return (
        <Box sx={{display: 'flex'}} className='sidebar-header'>
                <Box sx={{flex: 1, px: 1}}>
                    <strong>
                        {header}
                    </strong>
                </Box>
                <Box sx={{flex: 1, pl: 1}}>{children}</Box>
            </Box>
    );
};
