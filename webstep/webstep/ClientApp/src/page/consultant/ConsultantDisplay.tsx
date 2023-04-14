import { useQuery } from '@apollo/client';
import React from 'react';
import './Consultant.css'
import { GET_CONSULTANTS_INFO } from '../../api/contract/queries';
import { GetConsultantContractsPayload, GetConsultantItemsContractsPayload } from '../../api/contract/payloads';
import { Loading } from '../Utils/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { Consultant, ConsultantWithContracts } from '../../logic/interfaces';
import { DisplayConsultant } from './DisplayConsultants';


export const ConsultantDisplay: React.FC = () => {
    const [isModalOpen, setModalState] = React.useState(false);


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