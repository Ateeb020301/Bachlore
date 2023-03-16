import React from 'react';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';
import { ToastContainer, toast } from 'react-toastify';

export const Prospects = () => {
    return (
        <div style={{justifyContent: 'center', width: '84vw', height: '100%', position: 'relative'}}>
            <div style={{ width: '100%', border: 'solid'}}>
                <h2>Prospekter</h2>
            </div>
            <ProspectsCalendarContainer />
            <ToastContainer />
            
        </div>
    );
};
