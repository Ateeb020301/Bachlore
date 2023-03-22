import React from 'react';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';
import { ToastContainer, toast } from 'react-toastify';

export const Prospects = () => {
    return (
        <div style={{justifyContent: 'center', width: '80vw', height: '100%', overflow: 'hidden'}}>
            <div style={{width: '100%'}}>
                <h2>Prospekter</h2>
            </div>
            <div style={{height: '500px', overflow: 'auto', border: 'solid'}}>
                <ProspectsCalendarContainer/>
            </div>
            <ToastContainer />
            
        </div>
    );
};
