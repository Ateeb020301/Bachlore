import React from 'react';

interface ImageAndContentProps {
    image: JSX.Element;
    width?: number;
    extraSpaceBetween?: boolean;
    children: any;
}

export const ImageAndContent: React.FC<ImageAndContentProps> = ({ image, children, width, extraSpaceBetween }) => {
    let margin = extraSpaceBetween ? '4px' : '0px';

    const wrapperStyle = {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        width: width || 'auto',
    };
    const imageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const contentStyle = {
        marginLeft: margin,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (
        <div style={wrapperStyle}>
            <div style={imageStyle}>{image}</div>
            <div style={contentStyle}>{children}</div>
        </div>
    );
};
