import React from 'react';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';

export const Prospects: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <FullPageContent>
                <ProspectsCalendarContainer />
            </FullPageContent>
        </div>
    );
};
