import React from 'react';
import { CalendarTimelineBackground } from '../../CalendarSystem/CalendarTimelineBackground';
import { CalendarTimelineGrid } from '../../CalendarSystem/CalendarTimelineGrid';
import { SubProspect } from '../../../logic/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { SubProspectEventContainer } from './SubProspectEventContainer';
import { ADD_SUBPROSPECT, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { AddSubProspectInput } from '../../../api/prospects/inputs';
import { useMutation } from '@apollo/client';
import { AddSubProspectPayload } from '../../../api/prospects/payloads';
import { getAddSubProspectInput, getDefaultNewSubProspect } from '../../../api/prospects/logic';
import { defaultMessagePlacement } from '../../../logic/toast';
import { toast } from 'react-toastify';

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
        ],
        awaitRefetchQueries: true,
    });
    const addSubProspectWrapper = () => {
        let defaultSubProspect = getDefaultNewSubProspect(prospectId);
        let input = getAddSubProspectInput(defaultSubProspect);

        addSubProspect({ variables: { input: input } })
            .then((res) => {
                toast.configure();
                toast.success('Prospektet ble lagt til.', defaultMessagePlacement);
            })
            .catch((e) => {
                toast.configure();
                toast.error('Noe gikk galt med opprettingen av prospektet.', defaultMessagePlacement);
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
