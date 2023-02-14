import { useQuery } from '@apollo/client';
import { Calendar } from '../../CalendarSystem/Calendar';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GetConsultantIDsPayload } from '../../../api/contract/payloads';
import { GET_CONSULTANT_IDS } from '../../../api/contract/queries';
import { ConsultantSection } from './ConsultantSection';

export const ContractCalendarContainer = () => {
    const { loading, error, data } = useQuery<GetConsultantIDsPayload>(GET_CONSULTANT_IDS);

    return (
        <Calendar
            title={'Konsulenter'}
            render={(b: boolean) =>
                data?.consultants.items.map((consultant) => {
                    return <ConsultantSection consultantId={consultant.id} showContracts={b} key={uuidv4()} />;
                })
            }></Calendar>
    );
};