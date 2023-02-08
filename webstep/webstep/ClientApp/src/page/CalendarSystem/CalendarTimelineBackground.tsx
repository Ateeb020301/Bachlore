import React, { useState } from 'react';

interface CalendarTimelineBackgroundProps {
    children?: React.ReactNode;
    row?: number;
    column?: number;
    onClick?: () => void;
}

// This component is meant to simply fill the background of a calendar timeline row (useful for detecting clicks)
export const CalendarTimelineBackground: React.FC<CalendarTimelineBackgroundProps> = ({
    children,
    row,
    column,
    onClick,
}) => {
    const [isHovering, setIsHovering] = useState(false);

    let bg = isHovering ? 'aliceblue' : 'transparent';
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsHovering(false);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsHovering(true);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!onClick) return;
        onClick();
    };

    const style = {
        backgroundColor: bg,
        borderBottom: '1px solid black',
    };

    const timelineStyle = row === undefined ? { ...style, gridRowStart: 1 } : { ...style, gridRowStart: row };
    const hackyFix =
        column === undefined
            ? { ...timelineStyle, gridColumn: '1 / -1' }
            : { ...timelineStyle, gridColumn: column + ' / -1' };
    return (
        <div style={hackyFix} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {children && children}
        </div>
    );
};
