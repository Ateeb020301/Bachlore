import React from 'react';

export const PageContent = ({ children }: {children: any}) => {
    return <div className='content-wrapper__main' style={{display: 'flex'}}>{children}</div>;
};
