import React from 'react';
import iconX from '../Utils/x.png';
import { FormProvider } from '../../components/FormInfo/context/FormContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import '../consultant/AddModal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Contract } from '../../logic/interfaces';
import { EditSellerForm } from './EditSellerForm';

interface Seller {
    id: number;
    fullName: string;
    email: string;
    employmentDate: string;
    resignationDate?: any;
}

interface ModalEditProps {
    title: string;
    isOpen: boolean;
    seller: Seller;
    onClose: () => void;
}

export const ModalEdit: React.FC<ModalEditProps> = ({ title, seller, isOpen, onClose }) => {
    const outsideRef = React.useRef(null);
    const navigate = useNavigate();


    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
            navigate('/seller')
        }
    }

    function closeIcon() {
        onClose();
        navigate('/seller')
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
                            <span className={'headerText'}>Edit {seller.fullName}</span>
                        </div>
                        <div className={'headerButton'}>
                            <CloseIcon onClick={closeIcon} className={'modal__closeIcon'} />
                        </div>
                    </div>

                    <div className={'modalBody'}>
                        <EditSellerForm onClose={onClose} seller ={seller} />
                    </div>
                </div>


            </div>


        </div>
    ) : null;
};