import React, { useRef, useState } from 'react';
import Editable from './Editable';
import './Normalize.css';

interface EditableFieldProps {
    objectToEdit: any;
    fieldToEdit: string; // used to give input initial value of property
    fieldName: string;
    width: number;
    editCallBack: (o: any) => void;
}
//from:https://github.com/learnwithparam/logrocket-inline-edit-ui/blob/master/src/App.js
export const EditableField: React.FC<EditableFieldProps> = ({
    objectToEdit,
    fieldToEdit,
    fieldName,
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
            if (fieldName in objectToEdit) {
                objectToEdit = { ...objectToEdit, [fieldName]: fieldValue };
                editCallBack(objectToEdit);
            }
        }
    };
    return (
        <Editable text={fieldValue} placeholder='' childRef={inputRef} type='input'>
            <input
                className='normalized'
                ref={inputRef}
                type='text'
                name='task'
                width={width}
                placeholder=''
                value={fieldValue}
                onChange={handleChange}
                onBlur={handleSubmit}
            />
        </Editable>
    );
};
