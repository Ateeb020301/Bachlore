import React, { useRef, useState } from 'react';
import Editable from './Editable';
import './Normalize.css';

interface EditableNumberFieldProps {
    objectToEdit: any;
    fieldToEdit: string;
    fieldName: string;
    width?: number;
    displayText: string; // numbers are rarely shown as raw value
    editCallBack: (objectToEdit: any) => void;
}
//from:https://github.com/learnwithparam/logrocket-inline-edit-ui/blob/master/src/App.js
export const EditableNumberField: React.FC<EditableNumberFieldProps> = ({
    objectToEdit,
    fieldToEdit,
    fieldName,
    displayText,
    width,
    editCallBack,
}) => {
    const [fieldValue, setFieldValue] = useState(fieldToEdit);
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
            objectToEdit = { ...objectToEdit, [fieldName]: Number(fieldValue) };
            editCallBack(objectToEdit);
            setHasBeenChanged(false);
        }
    };

    // dynamic styling
    let inputWidth = width === undefined ? '40px' : width + 'px';
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
