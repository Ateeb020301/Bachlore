import React from 'react';
import { Vacancy } from '../../../api/contract/types';
import { EditableCapacityField } from '../../Utils/EditableCapacityField';

interface VacancyEventContentProps {
    vacancy: Vacancy;
    editCallback: (v: Vacancy) => void;
}
const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'hidden' as 'hidden',
    width: '100%',
};

const placementGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '5px',
    gridTemplateRows: '20px',
    placeItems: 'center',
};
export const VacancyEventContent: React.FC<VacancyEventContentProps> = ({ vacancy, editCallback }) => {
    return (
        <div className='noselect' style={placementGridStyle}>
            <div style={{ ...contentStyle, justifyContent: 'flex-end' }}>
                <EditableCapacityField
                    objectToEdit={vacancy}
                    days={vacancy.daysOfWeek}
                    fieldName={'daysOfWeek'}
                    editCallBack={editCallback}
                    capped={true}
                    width={50}
                />
            </div>
            <div style={{ ...contentStyle, justifyContent: 'flex-start' }}>{vacancy.planned ? 'Fri' : 'Syk'}</div>
        </div>
    );
};
