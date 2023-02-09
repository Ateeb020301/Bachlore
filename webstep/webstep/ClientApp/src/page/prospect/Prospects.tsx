import React from 'react';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';

export const Prospects: React.FC = () => {
    return (
        <div style={{ border: 'solid', height: '100%', width: '90%'}}>
            <FullPageContent>
                <ProspectsCalendarContainer />
            </FullPageContent>
        </div>
    );
};
