import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_CONSULTANTS } from '../../api/consultants';
import { PageInfo, Project } from '../../logic/interfaces';
import { Loading } from '../Utils/Loading';
import { ConsultantDisplay } from './ConsultantDisplay';

interface Data {
    consultants: Consultants;
}

interface Consultants {
    items: Item[];
    pageInfo: PageInfo;
}

interface Item {
    project: Project[];
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
}
//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const ConsultantContainer: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<Data>(GET_CONSULTANTS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    });

    let containerContent;

    if (data) {
        containerContent = data.consultants.items.map((item, i) => (
            <React.Fragment key={'Consultant_Fragment_' + item.id}>
                <ConsultantDisplay key={'Consultant_' + item.id} consultant={item} refetch={refetch} />
            </React.Fragment>
        ));
    } else if (error) {
        console.log(error);
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen konsulenter hentet. </p>
            </div>
        );
    } else if (loading) {
        containerContent = <Loading />;
    } else {
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen konsulenter hentet. </p>
            </div>
        );
    }
    return <div>{containerContent}</div>;
};