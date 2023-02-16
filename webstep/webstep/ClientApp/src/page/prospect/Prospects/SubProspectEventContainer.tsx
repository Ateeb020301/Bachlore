import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditSubProspectInput } from '../../../api/prospects/inputs';
import { getEditSubProspectInput } from '../../../api/prospects/logic';
import { EditSubProspectPayload } from '../../../api/prospects/payloads';
import { DELETE_SUBPROSPECT, EDIT_SUBPROSPECT, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { constants } from '../../../logic/constants';
import { defaultMessagePlacement } from '../../../logic/toast';
import { CalendarEvent, Eventable } from '../../CalendarSystem/CalendarEvent';
import { ProspectEventContent } from './ProspectEventContent';
import { SubProspect } from '../../../logic/interfaces';
import { getColorFromSumConsultants } from '../../../logic/calendarDisplayFunctions';

interface SubProspectEventContainerProps {
    subProspect: SubProspect;
    sellerId: number;
}

export const SubProspectEventContainer: React.FC<SubProspectEventContainerProps> = ({ subProspect, sellerId }) => {
    const [editSubProspect] = useMutation<EditSubProspectPayload, { input: EditSubProspectInput }>(EDIT_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: sellerId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(DELETE_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: subProspect.id },
            },
            {
                query: GET_SELLER_PROSPECTS,
                variables: { start: { week: subProspect.startWeek, year: subProspect.startYear },  end: { week: subProspect.endWeek, year: subProspect.endYear }, probability: subProspect.probability, numOfConsultants: subProspect.numOfConsultants, id: subProspect.id },
            },
        ],
        awaitRefetchQueries: true,
    });

    const deleteWrapper = () => {
        deleteSubProspect({ variables: { input: { id: subProspect.id } } })
            .then((res) => {
                toast.success('Prospektet ble slettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved sletting av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };
    
    const editPlacement = (input: Eventable) => {
        let newSubProspect: EditSubProspectInput = {
            id: subProspect.id,
            start: { week: input.startWeek, year: input.startYear },
            end: { week: input.endWeek, year: input.endYear },
            probability: subProspect.probability,
            numOfConsultants: subProspect.numOfConsultants,
        };
        editSubProspect({ variables: { input: newSubProspect } })
            .then((res) => {
                toast.success('Prospektet ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };

    const editSubProspectWrapper = (p: SubProspect) => {
        let newSubProspect = getEditSubProspectInput(p);

        editSubProspect({ variables: { input: newSubProspect } })
            .then((res) => {
                toast.success('Prospekt opprettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };

    const c = getColorFromSumConsultants(subProspect.numOfConsultants);
    return (
        <CalendarEvent
            eventObj={subProspect}
            render={
                <ProspectEventContent
                    subProspect={subProspect}
                    eventColor={c}
                    editSubProspect={editSubProspectWrapper}
                />
            }
            editPlacement={editPlacement}
            color={c}
            deleteSelf={deleteWrapper}
        />
    );
};
