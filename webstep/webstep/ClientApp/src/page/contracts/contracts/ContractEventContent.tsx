import React from 'react';
import { Contract } from '../../../logic/interfaces';
import { EditableCapacityField } from '../../Utils/EditableCapacityField';

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
interface ContractEventContentProps {
    contract: Contract;
    editCallBack: (c: Contract) => void;
}
export const ContractEventContent: React.FC<ContractEventContentProps> = ({ contract, editCallBack }) => {
    return (
        <div className='noselect' style={placementGridStyle}>
            <div style={{ ...contentStyle, justifyContent: 'flex-end' }}>
                <span>Belegg: </span>
            </div>
            <div style={{ ...contentStyle, justifyContent: 'flex-start' }}>
                <EditableCapacityField
                    objectToEdit={contract}
                    days={contract.daysOfWeek}
                    fieldName={'daysOfWeek'}
                    editCallBack={editCallBack}
                    width={50}
                />
            </div>
        </div>
    );
};
