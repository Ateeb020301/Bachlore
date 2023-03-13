import React from 'react';
import iconX from '../Utils/x.png';
import { FormProvider } from '../../components/FormInfo/context/FormContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './AddModal.css';
import { Consultant } from './consultant';
import { AddForm } from './addForm';
import CloseIcon from '@mui/icons-material/Close';

interface ModalConsultantProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalConsultant: React.FC<ModalConsultantProps> = ({ title, isOpen, onClose }) => {
    const outsideRef = React.useRef(null);
    const navigate = useNavigate();


    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
            navigate('/consultant')
        }
    }

    function closeIcon() {
        onClose();
        navigate('/consultant')
    }

    return isOpen ? (
        <div className={'modal'}>
            <div
                ref={outsideRef}
                className={'modal__overlay'}
                onClick={handleCloseOnOverlay}
            />
            <div className={'modal__box'}>
                <div className={'modalWrapper'}>
                    <div className={'header'}>
                        <div className={'headerTextCont'}>
                            <span className={'headerText'}>Add New Consultant</span>
                        </div>
                        <div className={'headerButton'}>
                            <CloseIcon onClick={closeIcon} className={'modal__closeIcon'} />
                        </div>
                    </div>

                    <div className={'modalBody'}>
                        <AddForm onClose={onClose} />
                    </div>
                </div>


            </div>


        </div>
    ) : null;
};