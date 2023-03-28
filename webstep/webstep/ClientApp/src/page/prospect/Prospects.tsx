import React from 'react';
import { useQuery } from '@apollo/client';
import { ProspectsCalendarContainer } from './Prospects/ProspectsCalendarContainer';
import { FullPageContent } from '../Utils/FullPageContent';
import { ToastContainer, toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
import { GET_SELLERS } from '../../api/sellers';
import { GetSellersPayload } from '../seller/SellerContainer';

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const Prospects = () => {
    const { loading, error, data, refetch } = useQuery<GetSellersPayload>(GET_SELLERS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });
    return (
        <div style={{justifyContent: 'center', width: '84vw', height: '100%', position: 'relative'}}>
            <div style={{ width: '100%', border: 'solid'}}>
                <h2>Prospekter</h2> 
                <div>                     
                    <select id="dds" name="sellerId" defaultValue=''>
                        <option  value='' disabled>Choose a Seller</option>
                            {data?.sellers.items.map((aSeller) => (
                        <option key={aSeller.id} value={aSeller.id}>{aSeller.fullName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{height: '500px', overflow: 'auto', border: 'solid'}}>
                <ProspectsCalendarContainer/>
            </div>
            <ToastContainer />
            
        </div>
    );
};
