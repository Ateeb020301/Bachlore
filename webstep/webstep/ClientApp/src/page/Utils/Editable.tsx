import React, { useEffect, useState } from 'react';

interface EditableProps {
    text: string;
    placeholder: string;
    childRef: React.RefObject<HTMLSelectElement> | React.RefObject<HTMLInputElement>;
    type: string;
    children: any;
}
// from: https://github.com/learnwithparam/logrocket-inline-edit-ui/blob/master/src/Editable.js
export const Editable: React.FC<EditableProps> = ({ text, type, placeholder, children, childRef }) => {
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, type: string) => {
        const { key } = event;
        const keys = ['Escape', 'Tab'];
        const enterKey = 'Enter';
        const allKeys = [...keys, enterKey];
        if ((type === 'textarea' && keys.indexOf(key) > -1) || (type !== 'textarea' && allKeys.indexOf(key) > -1)) {
            setEditing(false);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setEditing(true);
    };
    return (
        <>
            {isEditing ? (
                <div onBlur={() => setEditing(false)} onKeyDown={(e) => handleKeyDown(e, type)}>
                    {children}
                </div>
            ) : (
                <div onClick={handleClick}>
                    <span>{text || placeholder || 'Editable content'}</span>
                </div>
            )}
        </>
    );
};

export default Editable;
