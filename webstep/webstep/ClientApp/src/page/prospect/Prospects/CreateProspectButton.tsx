import { useMutation } from '@apollo/client';
import React from 'react';
import { ADD_PROSPECT, ADD_SUBPROSPECT, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { getCurrentWeek } from '../../../logic/dateFunctions';
import PlusIcon from '../../../components/images/plus-square.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProspectPayload, AddSubProspectPayload } from '../../../api/prospects/payloads';
import { AddProspectInput, AddSubProspectInput } from '../../../api/prospects/inputs';
import { defaultMessagePlacement } from '../../../logic/toast';
import { Button } from 'reactstrap';

interface CreateProspectButtonProps {
    sellerId: number;
}
const addButtonStyle = {
    width: '25px',
    height: '25px',
    backgroundImage: 'url(' + PlusIcon + ')',
    backgroundSize: 'cover',
};
export const CreateProspectButton: React.FC<CreateProspectButtonProps> = ({ sellerId }) => {
    const [addProspect] = useMutation<AddProspectPayload, { input: AddProspectInput }>(ADD_PROSPECT);
    const [addSubProspect] = useMutation<AddSubProspectPayload, { input: AddSubProspectInput }>(ADD_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: sellerId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const handleClick = () => {
        let defaultProspect = getDefaultProspect(sellerId);
        addProspect({ variables: { input: defaultProspect } })
            .then((res) => {
                let newProspectId = res.data?.addProspect.prospect.id;

                if (newProspectId !== undefined) {
                    let defaultSubProspect = getDefaultSubProspect(newProspectId);
                    addSubProspect({ variables: { input: defaultSubProspect } })
                        .then((res) => {
                            toast.success('Prospekt opprettet', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        })
                        .catch((e) => {
                            toast.error('Noe gikk galt ved oppretting av sub-prospektet', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        });
                }
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved oppretting av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };
    return (
        <Button onClick={handleClick} size='sm' color='primary'>
            + prospekt
        </Button>
    );
};

const getDefaultProspect = (sellerId: number) => {
    let projectName = 'Prosjektnavn';
    let customerName = 'Kunde';
    let defaultProspect: AddProspectInput = {
        sellerId: sellerId,
        projectName: projectName,
        customerName: customerName,
    };
    return defaultProspect;
};

const getDefaultSubProspect = (prospectId: number) => {
    let currentWeek = getCurrentWeek();
    let currentYear = new Date().getFullYear();
    let prospectDurationInWeeks = 4;

    let probability = 30;
    let workdays = 5;

    let defaultSubProspect: AddSubProspectInput = {
        prospectId: prospectId,
        probability: probability,
        numOfConsultants: workdays,
        start: { year: currentYear, week: currentWeek },
        end: { year: currentYear, week: currentWeek + prospectDurationInWeeks },
    };

    return defaultSubProspect;
};
