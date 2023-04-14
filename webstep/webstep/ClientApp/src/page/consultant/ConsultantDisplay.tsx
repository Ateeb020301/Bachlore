import {  useQuery } from '@apollo/client';
import React from 'react';
import './Consultant.css'
import {  GET_CONSULTANTS_INFO } from '../../api/contract/queries';
import {  GetConsultantItemsContractsPayload } from '../../api/contract/payloads';
import { Loading } from '../Utils/Loading';
import { DisplayConsultant } from './DisplayConsultants';

// const pStyleHead = {
//     color: '#495057',
//     fontWeight: 600,
//     fontSize: '16px',
//     letterSpacing: '.05rem',
//     margin: 0,
//     marginBottom: '3px',
//     padding: 0

// }

// const pStyleUnder = {
//     color: '#b5abaf',
//     fontWeight: 400,
//     fontSize: '13px',
//     letterSpacing: '.05rem',
//     margin: 0,
//     padding: 0
// }


export const ConsultantDisplay: React.FC = () => {
    const { loading, error, data } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);

    console.log(data);

    return (
        <>
            {!loading && !error && data ? (
                data?.consultants.items.map(
                    (consultant: any) =>
                        consultant != null && (
                            <DisplayConsultant consultant={consultant} key={`consultant_${consultant.id}`} />
                        )
                )
            ) : (
                <Loading />
            )}
        </>
    );
};