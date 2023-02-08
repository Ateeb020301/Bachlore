import React from 'react';
import './DeleteCornerButton.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface DeleteCornerButtonProps {
    deleteFunc: () => void; // function to delete parent object
}

export const DeleteCornerButton: React.FC<DeleteCornerButtonProps> = ({ deleteFunc }) => {
    const wrapperFunc = async () => {
        deleteFunc();
    };
    let submit = () => {
        confirmAlert({
            message: 'Vil du utføre denne slettingen?',
            buttons: [
                {
                    label: 'Ja',
                    onClick: wrapperFunc,
                },
                {
                    label: 'Nei',
                    onClick: () => '',
                },
            ],
        });
    };
    return (
        <button className='delete-corner-button' onClick={submit} name='delete-button'>
            X
        </button>
    );
};
