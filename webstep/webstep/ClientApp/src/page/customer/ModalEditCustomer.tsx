import React from 'react';
import { FormProvider } from '../../components/FormInfo/context/FormContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './AddModal.css';
import { EditForm } from './editForm';
import CloseIcon from '@mui/icons-material/Close';

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    adresse: string;
    email: string;
    tlf: string;
}

interface ModalEditCustomerProps {
    title: string;
    isOpen: boolean;
    customer: Customer;
    onClose: () => void;
}

export const ModalEditCustomer: React.FC<ModalEditCustomerProps> = ({ title, customer, isOpen, onClose }) => {
    const outsideRef = React.useRef(null);
    const navigate = useNavigate();


    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
            navigate('/customer')
        }
    }

    function closeIcon() {
        onClose();
        navigate('/customer')
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
                            <span className={'headerText'}>Edit {customer.firstName} {customer.lastName}</span>
                        </div>
                        <div className={'headerButton'}>
                            <CloseIcon onClick={closeIcon} className={'modal__closeIcon'} />
                        </div>
                    </div>

                    <div className={'modalBody'}>
                        <EditForm onClose={onClose} customer={customer} />
                    </div>
                </div>


            </div>


        </div>
    ) : null;
};