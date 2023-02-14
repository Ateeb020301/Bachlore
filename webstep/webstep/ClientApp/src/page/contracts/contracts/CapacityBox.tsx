import React from 'react';
import { getCurrentWeek } from '../../../logic/dateFunctions';
import { v4 as uuidv4 } from 'uuid';
import { Capacity } from '../../../api/contract/types';
import '../../Utils/Normalize.css';
interface CapacityBoxProps {
    startGridline: number;
    capacity: number;
    duration: number;
}
export const CapacityBox: React.FC<CapacityBoxProps> = ({ startGridline, capacity, duration }) => {
    const containerStyle = {
        gridColumn: startGridline + ' / span ' + duration,
        gridRowStart: 1,
        width: '100%',
        height: '100%',
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey',
    };

    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: getColorFromCapacity(capacity),
    };
    let capacityAsString = Math.round((capacity / 5) * 100).toString() + '%';
    return (
        <div style={containerStyle} className='noselect'>
            <div style={contentStyle}>{capacityAsString}</div>
        </div>
    );
};

// LOGIC RELATED TO THIS COMPONENT
export const generateBoxesThatMatchCapacity = (capacityArray: Capacity[]): JSX.Element[] => {
    const currentWeek = getCurrentWeek();
    let capacityBoxes: JSX.Element[] = [];

    let prevAvailableDays = -99;
    let duration = 1;
    let startGridline = 1;
    // should be cleaned up
    for (let i = currentWeek - 1; i < 104 + currentWeek; i++) {
        let capacity = capacityArray[i];
        if (prevAvailableDays === -99) {
            prevAvailableDays = capacity.days;
            continue;
        }
        if (prevAvailableDays === capacity.days) {
            duration++;
            if (i === 103 + currentWeek) {
                capacityBoxes.push(
                    <CapacityBox
                        startGridline={startGridline}
                        capacity={prevAvailableDays}
                        duration={duration}
                        key={uuidv4()}
                    />
                );
            }
            continue;
        }

        if (prevAvailableDays !== capacity.days) {
            capacityBoxes.push(
                <CapacityBox
                    startGridline={startGridline}
                    capacity={prevAvailableDays}
                    duration={duration}
                    key={uuidv4()}
                />
            );
            startGridline += duration;
            duration = 1;
            prevAvailableDays = capacity.days;
        }
    }

    return capacityBoxes;
};

const getColorFromCapacity = (c: number) => {
    if (c < 1) return '#fa807a';
    if (c < 2) return '#ffa95e';
    if (c < 3) return '#fff25e';
    if (c < 4) return '#e5fa7a';
    if (c < 5) return '#9afa7a';
    return '#4dfc3d';
};
