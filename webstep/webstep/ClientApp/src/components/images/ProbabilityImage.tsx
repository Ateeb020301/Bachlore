import React from 'react';
import StatisticIcon from './dice-5-fill.svg';

interface ProbabilityImageProps {
    widthAndHeightPx: number;
}

export const ProbabilityImage: React.FC<ProbabilityImageProps> = ({ widthAndHeightPx }) => {
    const containerStyle = {
        width: widthAndHeightPx + 'px',
        height: widthAndHeightPx + 'px',
        backgroundImage: 'url(' + StatisticIcon + ')',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
    };

    return <div style={containerStyle}></div>;
};
