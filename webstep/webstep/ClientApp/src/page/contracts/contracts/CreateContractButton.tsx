import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddContractInput, AddProjectConsultantInput, AddProjectInput } from '../../../api/contract/inputs';
import { getDefaultNewContract } from '../../../api/contract/logic';
import { AddContractPayload, AddProjectConsultantPayload, AddProjectPayload } from '../../../api/contract/payloads';
import {
    ADD_CONTRACT,
    ADD_PROJECT,
    GET_CONSULTANT_CAPACITY,
    GET_TEAMCONS_CONTRACTS,
    GET_CONSULTANTS_INFO,
    ADD_PROJECTCONSULTANT,
} from '../../../api/contract/queries';
import { Modal } from '../../Utils/ModalComponent';

interface CreateContractButtonProps {
    consultantId: number;
}

const currentYear = new Date().getFullYear();
// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({ consultantId }) => {
    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => setModalState(!isModalOpen);
     
    const [addProjectConsultant] = useMutation<AddProjectConsultantPayload, { input: AddProjectConsultantInput }>(ADD_PROJECTCONSULTANT);
    const [addProject] = useMutation<AddProjectPayload, { input: AddProjectInput }>(ADD_PROJECT);
    const [addContract] = useMutation<AddContractPayload, { input: AddContractInput }>(ADD_CONTRACT, {
        refetchQueries: [
            {
                query: GET_TEAMCONS_CONTRACTS,
                variables: { id: consultantId },
            },
            {
                query: GET_CONSULTANT_CAPACITY,
                variables: { startYear: currentYear, endYear: currentYear + 2, id: consultantId },
            },
            {
                query: GET_CONSULTANTS_INFO,
            },
        ],
        awaitRefetchQueries: true,
    });
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
