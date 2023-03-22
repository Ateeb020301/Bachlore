import { useMutation } from '@apollo/client';
import React from 'react';
import { ADD_PROSPECT, ADD_SUBPROSPECT, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { getCurrentWeek } from '../../../logic/dateFunctions';
import PlusIcon from '../../../components/images/plus-square.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProspectPayload, AddSubProspectPayload } from '../../../api/prospects/payloads';
import { AddProspectInput, AddSubProspectInput } from '../../../api/prospects/inputs';
import { Button } from 'reactstrap';
import { ModalAddProspect } from './ModalAddProspect';
import { Prospect } from '../../../logic/interfaces';

interface CreateProspectButtonProps {
    customerId: number;
    sellerId: number;
}
const addButtonStyle = {
    width: '25px',
    height: '25px',
    backgroundImage: 'url(' + PlusIcon + ')',
    backgroundSize: 'cover',
};
export const CreateProspectButton: React.FC<CreateProspectButtonProps> = ({ sellerId, customerId}) => {
    const [isModalProspectOpen, setState] = React.useState(false);

    const toggleAddprospect = () => setState(!isModalProspectOpen);

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
        let defaultProspect = getDefaultProspect(sellerId, customerId);
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
        <>
              <Button onClick={toggleAddprospect} size='sm' color='primary'>
                + prospekt
            </Button>
            
            <ModalAddProspect
                title={'Edit Seller'}
                isOpen={isModalProspectOpen}
                onClose={toggleAddprospect}
                sellerId={sellerId}
                customerId={customerId}
            />
        </>
          
    );
};

const getDefaultProspect = (sellerId: number, customerId:number) => {
    let projectName = 'Prosjektnavn';
    customerId = 0;
    let defaultProspect: AddProspectInput = {
        projectName: projectName,
        customerId: customerId,
        sellerId:sellerId,
        id: 0
    };
    return defaultProspect;
};

const getDefaultSubProspect = (prospectId: number) => {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);

    let currentWeek = getCurrentWeek();
    let currentYear = new Date().getFullYear();
    let prospectDurationInWeeks = 3;

    let probability = 30;
    let workdays = 5;

    let defaultSubProspect: AddSubProspectInput = {
        prospectId: prospectId,
        probability: probability,
        numOfConsultants: workdays,
        start: { year: currentYear, week: weekNumber },
        end: { year: currentYear, week: weekNumber + prospectDurationInWeeks },
    };

    return defaultSubProspect;
};
