import React from 'react';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';

export const Prospects = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '87vw', height: '100%', overflow: 'hidden'}}>
            <div style={{width: '100%'}}>
                <h2>Prospekter</h2>
            </div>
            <ProspectsCalendarContainer/>
            
        </div>
    );
};
