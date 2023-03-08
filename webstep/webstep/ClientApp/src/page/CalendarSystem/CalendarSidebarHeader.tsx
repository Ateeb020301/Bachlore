import React from 'react';
import Popover from '@mui/material/Popover';
import './Calendar.css'

interface CalendarSidebarHeaderProps {
    header: string;
    children?: React.ReactNode;
}

export const CalendarSidebarHeader: React.FC<CalendarSidebarHeaderProps> = ({ header, children }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <div className='sidebar-header'>
            <div>
                <strong
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    {header}
                </strong>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    Team 1
                </Popover>
            </div>
            <div>{children}</div>
        </div>
    );
};
