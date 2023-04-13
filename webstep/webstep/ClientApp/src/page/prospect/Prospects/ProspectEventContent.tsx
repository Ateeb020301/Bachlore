import React from 'react';
import { SubProspect } from '../../../logic/interfaces';
import { PeopleImage } from '../../../components/images/PeopleImage';
import { ProbabilityImage } from '../../../components/images/ProbabilityImage';
import { EditableNumberField } from '../../Utils/EditableNumberField';
import { EditableSelectField } from '../../Utils/EditableSelectField';
import { ImageAndContent } from '../../Utils/ImageAndContent';

const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowX: 'hidden' as 'hidden',
};

interface ProspectEventContentProps {
    subProspect: SubProspect;
    eventColor: string;
    editSubProspect: (p: SubProspect) => void;
}

export const ProspectEventContent: React.FC<ProspectEventContentProps> = ({
    subProspect,
    eventColor,
    editSubProspect,
}) => {
    return (
        <div className='noselect' style={contentStyle}>
            <ImageAndContent image={<ProbabilityImage widthAndHeightPx={20} />} extraSpaceBetween={true}>
                <EditableSelectField
                    fieldName='probability'
                    isPercentage
                    isNumber
                    fieldToEdit={subProspect.probability.toString()}
                    objectToEdit={subProspect}
                    validValues={['10', '30', '70', '100']}
                    editCallBack={editSubProspect}
                    color={eventColor}
                />
            </ImageAndContent>
            <span style={{ width: '20px' }}></span>
            <ImageAndContent image={<PeopleImage widthAndHeightPx={25} />}>
                <EditableNumberField
                    displayText={subProspect.numOfConsultants.toFixed(2)}
                    objectToEdit={subProspect}
                    fieldToEdit={subProspect.numOfConsultants.toString()}
                    fieldName={'numOfConsultants'}
                    editCallBack={editSubProspect}
                    width={50}
                />
            </ImageAndContent>
        </div>
    );
};

