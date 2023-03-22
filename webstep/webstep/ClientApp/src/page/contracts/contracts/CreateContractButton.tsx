import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'reactstrap';
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
import { defaultMessagePlacement } from '../../../logic/toast';

interface CreateContractButtonProps {
    consultantId: number;
}

const currentYear = new Date().getFullYear();
// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({ consultantId }) => {
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

    const handleClick = () => {
        addProject({ variables: { input: { customerName: 'Kunde', projectName: 'Prosjekt' }, } }).then((res) => {
            if (!res.data) throw Error;
            let projectId = res.data.addProject.project.id;
            console.log(projectId);
            let defaultContract = getDefaultNewContract(projectId, consultantId);
            addProjectConsultant({ variables: { input: { consultantId: consultantId, projectId: projectId } } }).then((res) => {
                if (!res.data) throw Error;
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
            }).catch((e) => {
                console.log(e)
                toast.error('Noe gikk galt ved inlegging av konsulent til prosjekt', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
        })
            .catch((e) => {
                console.log(e)
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
