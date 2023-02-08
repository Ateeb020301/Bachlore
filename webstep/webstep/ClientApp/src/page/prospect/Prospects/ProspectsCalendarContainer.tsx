import { useQuery } from '@apollo/client';
import { Calendar } from '../../CalendarSystem/Calendar';
import { GET_SELLER_NAMES } from '../../../api/prospects/queries';
import { GetSellerNamesPayload } from '../../../api/prospects/payloads';
import React from 'react';
import { SellerSection } from './SellerSection';
import { v4 as uuidv4 } from 'uuid'

export const ProspectsCalendarContainer = () => {
    const { loading, error, data } = useQuery<GetSellerNamesPayload>(GET_SELLER_NAMES);

    return (
        <Calendar
            title={'Selgere'}
            render={(b: boolean) =>
                data?.sellers.items.map((seller) => {
                    return <SellerSection id={seller.id} name={seller.fullName} showProspects={b} key={uuidv4()} />;
                })
            }></Calendar>
    );
};
