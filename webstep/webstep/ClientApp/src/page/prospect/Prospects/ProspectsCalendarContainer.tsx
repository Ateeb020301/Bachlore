import { useQuery } from '@apollo/client';
import { Calendar } from '../../CalendarSystem/Calendar';
import { GET_SELLER_NAMES } from '../../../api/prospects/queries';
import { GetSellerNamesPayload } from '../../../api/prospects/payloads';
import React from 'react';
import { SellerSection } from './SellerSection';
import { v4 as uuidv4 } from 'uuid'


//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;
export const ProspectsCalendarContainer = () => {
    const { data } = useQuery<GetSellerNamesPayload>(GET_SELLER_NAMES,{
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    });
    console.log(data)
    return (
        <Calendar
            title={'Selgere'}
            render={(b: boolean) =>
                data?.sellers.items.map((seller) => {
                    console.log(seller.fullName)
                    return <SellerSection id={seller.id} name={seller.fullName} showProspects={b} key={uuidv4()}/>;
                })
            }></Calendar>
    );
};
