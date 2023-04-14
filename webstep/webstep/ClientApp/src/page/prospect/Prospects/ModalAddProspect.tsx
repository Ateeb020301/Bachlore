import React from 'react';
import iconX from '../Utils/x.png';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import '../../consultant/AddModal.css'
import CloseIcon from '@mui/icons-material/Close';
import { AddProspectForm } from './AddProspectForm';
import { number, string } from 'yup';
import { Prospect } from '../../../logic/interfaces';

interface ModalCProspectProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    sellerId: number;
    customerId: number;
}


export const ModalAddProspect: React.FC<ModalCProspectProps> = ({ title, isOpen, onClose, sellerId, customerId }) => {
    const outsideRef = React.useRef(null);
    const navigate = useNavigate();


    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
            navigate('/prospect')
        }
    }

    function closeIcon() {
        onClose();
        navigate('/prospect')
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
                            <span className={'headerText'}>Add New Prospect</span>
                        </div>
                        <div className={'headerButton'}>
                            <CloseIcon onClick={closeIcon} className={'modal__closeIcon'} />
                        </div>
                    </div>

                    <div className={'modalBody'}>
                        <AddProspectForm onClose={onClose} sellerId={sellerId} customerId={customerId}/>
                    </div>
                </div>


            </div>


        </div>
    ) : null;
};