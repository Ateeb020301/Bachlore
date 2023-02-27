import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'reactstrap';
import { AddContractInput, AddProjectInput } from '../../../api/contract/inputs';
import { getDefaultNewContract } from '../../../api/contract/logic';
import { AddContractPayload, AddProjectPayload } from '../../../api/contract/payloads';
import {
    ADD_CONTRACT,
    ADD_PROJECT,
    GET_CONSULTANT_CAPACITY,
    GET_CONSULTANT_CONTRACTS,
} from '../../../api/contract/queries';
import { defaultMessagePlacement } from '../../../logic/toast';

interface CreateContractButtonProps {
    consultantId: number;
}

const currentYear = new Date().getFullYear();
// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({ consultantId }) => {
    const [addProject] = useMutation<AddProjectPayload, { input: AddProjectInput }>(ADD_PROJECT);
    const [addContract] = useMutation<AddContractPayload, { input: AddContractInput }>(ADD_CONTRACT, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_CONTRACTS,
                variables: { id: consultantId },
            },
            {
                query: GET_CONSULTANT_CAPACITY,
                variables: { startYear: currentYear, endYear: currentYear + 2, id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const handleClick = () => {
        addProject({
            variables: {
                input: { consultantId: consultantId, customerName: 'Kunde', projectName: 'Prosjekt'},
            },
        })
            .then((res) => {
                if (!res.data) throw Error;

                let projectId = res.data.addProject.project.id;
                let defaultContract = getDefaultNewContract(projectId);
                addContract({ variables: { input: defaultContract } })
                    .then((res) => {
                        toast.success('Kontrakten ble opprettet', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    })
                    .catch((e) => {
                        console.log(e);
                        toast.error('Noe gikk galt ved oppretting av kontrakten', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    });
            })
            .catch((e) => {
                toast.error('Noe gikk galt med oppretting av prosjekt til den nye kontrakten.', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };

    return (
        <Button onClick={handleClick} size='sm' color='primary'>
            + kontrakt
        </Button>
    );
};
