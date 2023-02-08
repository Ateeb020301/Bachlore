import React, { useRef, useState } from 'react';
import { getClosestEdgeAndDistance } from '../../logic/mouseEvents';
import { DragSideType } from '../CalendarSystem/CalendarEvent';

const dragBarStyle = {
    position: 'absolute' as 'absolute',
    height: '100%',
    width: '15px',
    cursor: 'e-resize',
    backgroundColor: 'transparent',
};

interface DragBarProps {
    direction: 'left' | 'right';
    growInDirection: () => void;
    setParentDragSide: (d: DragSideType) => void;
    setParentMousePosition: (pos: { x: number; y: number }) => void;
}

export const DragBar: React.FC<DragBarProps> = ({
    direction,
    growInDirection,
    setParentDragSide,
    setParentMousePosition,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const dragBarDivRef = useRef<HTMLDivElement>(null);

    const directionStyle = direction === 'left' ? { left: '0' } : { right: '0' };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setIsDragging(true);
        setParentDragSide({ side: direction });
        setParentMousePosition({ x: e.pageX, y: e.pageY });
    };

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;

        let { edge, distance } = getClosestEdgeAndDistance(dragBarDivRef, e);

        if (edge === 'none') return; //means the div isnt mounted

        if (distance < 6 && (edge === 'top' || edge === 'bottom')) {
            setIsDragging(false);
            setParentDragSide({ side: 'none' });
            return;
        }

        if (direction === 'left') {
            if (edge === direction) {
                //setTimeoutId(startTimeoutToStopDragging(500));
                growInDirection();
                return;
            }
        }

        if (direction === 'right') {
            if (edge === direction) {
                //setTimeoutId(startTimeoutToStopDragging(500));
                growInDirection();
                return;
            }
        }
    };

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(false);
        setParentDragSide({ side: 'none' });
    };

    return (
        <div
            style={{ ...dragBarStyle, ...directionStyle }}
            ref={dragBarDivRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}>
            <b className='noselect'>&nbsp;</b>
        </div>
    );
};
