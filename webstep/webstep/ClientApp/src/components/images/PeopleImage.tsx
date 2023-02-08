import React from 'react';
import PeopleIcon from './people-alt.svg';

interface PeopleImageProps {
    widthAndHeightPx: number;
}

export const PeopleImage: React.FC<PeopleImageProps> = ({ widthAndHeightPx }) => {
    const containerStyle = {
        width: widthAndHeightPx + 'px',
        height: widthAndHeightPx + 'px',
        backgroundImage: 'url(' + PeopleIcon + ')',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
    };

    return <div style={containerStyle}></div>;
};
