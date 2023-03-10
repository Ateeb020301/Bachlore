import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteConsultantPayload, DELETE_CONSULTANT } from '../../api/consultants';
import { ConsultantWithContracts } from '../../logic/interfaces';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProjects } from './DisplayContracts';

interface ConsultantFields {
    consultant: ConsultantWithContracts;
    refetch: () => {};
}

interface ConsultantId {
    id: number;
}

export const ConsultantDisplay: React.FC<ConsultantFields> = ({ consultant, refetch }) => {
    const [deleteConsultant] = useMutation<DeleteConsultantPayload, { input: ConsultantId }>(DELETE_CONSULTANT);
    //used for toggling consultant info on/off
    const [isHidden, setIsHidden] = useState(true);

    const toggleOpen = () => setIsHidden(!isHidden);

    const sendDeleteRequest = () => {
        toast.configure();
        deleteConsultant({ variables: { input: { id: consultant.id } } })
            .then((res) => {
                refetch();
                toast.success('Konsulenten ble slettet.', defaultMessagePlacement);
            })
            .catch((err) => {
                toast.error('Noe gikk galt med slettingen av konsulenten.', defaultMessagePlacement);
            });
    };

    let display = isHidden ? 'none' : 'block';

    return (
        <div key={'Consultant_' + consultant.id} className='AccordionHolder'>
            <p onClick={toggleOpen} className='AccordionHead noselect'>
                {consultant.firstName + ' ' + consultant.lastName}
            </p>
            <div className='AccordionContent' style={{ display: display }}>
                <button onClick={sendDeleteRequest} className='delete-button'>
                    X
                </button>
                <p>Navn: {consultant.firstName + ' ' + consultant.lastName}</p>
                <p>Startdato: {consultant.employmentDate}</p>
                <p>Prosjekter:</p>
                {/* <DisplayProjects project={consultant.project} /> */}
            </div>
        </div>
    );
};