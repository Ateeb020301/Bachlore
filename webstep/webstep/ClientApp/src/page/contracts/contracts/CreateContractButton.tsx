import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../../Utils/ModalComponent';

interface CreateContractButtonProps {
    consultantId: number;
}

// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({ consultantId }) => {
    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => setModalState(!isModalOpen);
     
    return (
        <div className='modalContainer'>
        <button
                className={'app__btn'}
                onClick={toggleModal}
            >
                Kontrakt 
            </button>
            <Modal
                title={'Kontrakt form'}
                isOpen={isModalOpen}
                onClose={toggleModal}
            />
        </div>
    );
};
