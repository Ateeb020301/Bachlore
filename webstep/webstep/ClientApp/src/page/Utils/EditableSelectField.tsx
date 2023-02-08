import React, { useRef, useState } from 'react';
import Editable from './Editable';
import './Normalize.css';
import { v4 as uuidv4 } from 'uuid';

interface EditableSelectFieldProps {
    objectToEdit: any;
    fieldToEdit: string;
    fieldName: string;
    isPercentage?: boolean;
    validValues: string[];
    isNumber?: boolean;
    color?: string;
    editCallBack: (objectToEdit: any) => void;
}

export const EditableSelectField: React.FC<EditableSelectFieldProps> = ({
    objectToEdit,
    fieldToEdit,
    fieldName,
    validValues,
    isPercentage,
    isNumber,
    color,
    editCallBack,
}) => {
    const [fieldValue, setFieldValue] = useState(fieldToEdit);
    const [hasBeenChanged, setHasBeenChanged] = useState(false);
    const inputRef = useRef<HTMLSelectElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(e.target.value);
        if (!hasBeenChanged) {
            setHasBeenChanged(true);
        }
    };

    const handleSubmit = () => {
        if (hasBeenChanged) {
            if (fieldName in objectToEdit) {
                let valueToChangeTo = isNumber ? parseInt(fieldValue) : fieldValue;
                objectToEdit = { ...objectToEdit, [fieldName]: valueToChangeTo };

                editCallBack(objectToEdit);
            }
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const displayText = isPercentage ? fieldValue + '%' : fieldValue.toString();

    const options = validValues.map((v) => {
        return (
            <option value={v} key={uuidv4()}>
                {isPercentage ? v + '%' : v}
            </option>
        );
    });
    return (
        <Editable text={displayText} placeholder='' childRef={inputRef} type='input'>
            <select
                value={fieldValue}
                ref={inputRef}
                onChange={handleChange}
                onBlur={handleSubmit}
                onMouseDown={handleClick}
                style={{ backgroundColor: color, outline: '0px', borderStyle: 'none', borderBottom: '1px grey solid' }}>
                {options}
            </select>
        </Editable>
    );
};
