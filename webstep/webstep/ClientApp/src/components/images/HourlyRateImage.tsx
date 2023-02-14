import React from 'react';
import RateIcon from './hourly_rate.png';

interface HourlyRateImageProps {
    widthAndHeightPx: number;
}

export const HourlyRateImage: React.FC<HourlyRateImageProps> = ({ widthAndHeightPx }) => {
    const containerStyle = {
        width: widthAndHeightPx + 'px',
        height: widthAndHeightPx + 'px',
        backgroundImage: 'url(' + RateIcon + ')',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
    };

    return <div style={containerStyle}></div>;
};
