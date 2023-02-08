import React, { useRef, useState } from 'react';
import { capacityToDays, daysToCapacity } from '../../logic/dateFunctions';
import Editable from './Editable';
import './Normalize.css';

interface EditableCapacityFieldProps {
    objectToEdit: any;
    days: number;
    fieldName: string;
    width?: number;
    capped?: boolean; // if you want to cap it at 100%
    editCallBack: (objectToEdit: any) => void;
}
// Capacity = any time you need to edit number of days as a percentage of a 5 day workweek
export const EditableCapacityField: React.FC<EditableCapacityFieldProps> = ({
    objectToEdit,
    days,
    fieldName,
    width,
    capped,
    editCallBack,
}) => {
    const [fieldValue, setFieldValue] = useState(daysToCapacity(days).toString());
    const [hasBeenChanged, setHasBeenChanged] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(e.target.value);
        if (!hasBeenChanged) {
            setHasBeenChanged(true);
        }
    };

    const handleSubmit = () => {
        if (hasBeenChanged) {
            if (fieldName in objectToEdit) {
                // When changing the actual object, the % value should be converted back to days per week
                let isnum = /^\d+$/.test(fieldValue);
                if (isnum) {
                    let newDays = capacityToDays(Number(fieldValue), capped);
                    objectToEdit = { ...objectToEdit, [fieldName]: newDays };
                    resetFieldValue(newDays);
                } else {
                    objectToEdit = { ...objectToEdit, [fieldName]: days };
                    resetFieldValue(days);
                }

                editCallBack(objectToEdit);
            }
            setHasBeenChanged(false);
        }
    };

    // Used to ensure the UI reflects the changes in the API before refreshing
    const resetFieldValue = (days: number) => {
        let capacity = daysToCapacity(days, capped);
        setFieldValue(capacity.toString());
    };
    // default width if not specified
    let inputWidth = width === undefined ? '40px' : width + 'px';

    let displayText = fieldValue + '%';

    return (
        <Editable text={displayText} placeholder='' childRef={inputRef} type='input'>
            <input
                className='normalized'
                style={{ width: inputWidth, borderBottom: '1px grey solid' }}
                ref={inputRef}
                type='number'
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleSubmit}
            />
        </Editable>
    );
};
