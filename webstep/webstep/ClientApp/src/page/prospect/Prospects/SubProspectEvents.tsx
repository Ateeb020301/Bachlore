import React from 'react';
import { CalendarTimelineBackground } from '../../CalendarSystem/CalendarTimelineBackground';
import { CalendarTimelineGrid } from '../../CalendarSystem/CalendarTimelineGrid';
import { SubProspect } from '../../../logic/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { SubProspectEventContainer } from './SubProspectEventContainer';
import { ADD_SUBPROSPECT, GET_PROSPECTS, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { AddSubProspectInput } from '../../../api/prospects/inputs';
import { useMutation } from '@apollo/client';
import { AddSubProspectPayload } from '../../../api/prospects/payloads';
import { getAddSubProspectInput, getDefaultNewSubProspect } from '../../../api/prospects/logic';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SubProspectEventsProps {
    subProspects: SubProspect[];
    prospectId: number;
    sellerId: number;
}

export const SubProspectEvents: React.FC<SubProspectEventsProps> = ({ subProspects, sellerId, prospectId }) => {
    // TODO:  Add mutation for adding subprospects on background click
    const [addSubProspect] = useMutation<AddSubProspectPayload, { input: AddSubProspectInput }>(ADD_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: sellerId },
            },
            {
                query: GET_PROSPECTS
            }
        ],
        awaitRefetchQueries: true,
    });
    const addSubProspectWrapper = () => {
        let defaultSubProspect = getDefaultNewSubProspect(prospectId);
        let input = getAddSubProspectInput(defaultSubProspect);

        addSubProspect({ variables: { input: input } })
            .then((res) => {
                toast.success('Prospekt opprettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved oppretting av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };

    return (
        <CalendarTimelineGrid key={uuidv4()}>
            {subProspects.map((subProspect) => {
                return <SubProspectEventContainer subProspect={subProspect} sellerId={sellerId} key={uuidv4()} />;
            })}
            <CalendarTimelineBackground column={1} key={uuidv4()} onClick={addSubProspectWrapper} />
        </CalendarTimelineGrid>
    );
};
