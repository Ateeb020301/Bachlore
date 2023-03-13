import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'reactstrap';
import { AddContractInput, AddProjectInput, AddTeamConsultantInput } from '../../../api/contract/inputs';
import { getDefaultNewContract } from '../../../api/contract/logic';
import { AddContractPayload, AddProjectPayload, AddTeamConsultantPayload } from '../../../api/contract/payloads';
import {
    ADD_CONTRACT,
    ADD_PROJECT,
    GET_CONSULTANT_CAPACITY,
    GET_CONSULTANT_CONTRACTS,
    ADD_TEAMCONSULTANT,
    GET_TEAMCONS_CONTRACTS,
    GET_CONSULTANTS_INFO,
} from '../../../api/contract/queries';
import { defaultMessagePlacement } from '../../../logic/toast';

interface CreateContractButtonProps {
    consultantId: number;
}

const currentYear = new Date().getFullYear();
// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({ consultantId }) => {
    const [addTeamcons] = useMutation<AddTeamConsultantPayload, { input: AddTeamConsultantInput }>(ADD_TEAMCONSULTANT);
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
        let rnd = Math.floor(Math.random() * 3) + 1;
        console.log(rnd)
        addTeamcons({ variables: { input: { teamId: rnd , consultantId: consultantId } } }).then((res) => {
            if (!res.data) throw Error;
            addProject({ variables: { input: { customerName: 'Kunde', projectName: 'Prosjekt', teamId: 1 }, } }).then((res) => {
                if (!res.data) throw Error;
                let projectId = res.data.addProject.project.id;
                let defaultContract = getDefaultNewContract(projectId, consultantId);
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
                    console.log(e)
                    toast.error('Noe gikk galt med oppretting av prosjekt til den nye kontrakten.', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                });
        }).catch((e) => {
            console.log(e)
            toast.error('Noe gikk galt med oppretting av Teamconsulent til det nye prosjektet.', {
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
