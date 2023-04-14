import React from 'react';
import { useNavigate } from 'react-router-dom'
import './AddModal.css';
import { EditForm } from './editForm';
import CloseIcon from '@mui/icons-material/Close';

interface Consultants {
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
}

interface ModalEditConsultantProps {
    title: string;
    isOpen: boolean;
    consultant: Consultants;
    onClose: () => void;
}

export const ModalEditConsultant: React.FC<ModalEditConsultantProps> = ({ title,consultant, isOpen, onClose }) => {
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
                            <span className={'headerText'}>Edit {consultant.firstName} {consultant.lastName}</span>
                        </div>
                        <div className={'headerButton'}>
                            <CloseIcon onClick={closeIcon} className={'modal__closeIcon'} />
                        </div>
                    </div>

                    <div className={'modalBody'}>
                        <EditForm onClose={onClose} consultant={consultant} />
                    </div>
                </div>


            </div>


        </div>
    ) : null;
};