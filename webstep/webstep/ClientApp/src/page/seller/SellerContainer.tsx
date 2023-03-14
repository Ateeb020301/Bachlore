import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_SELLERS } from '../../api/sellers';
import { PageInfo } from '../../logic/interfaces';
import { Loading } from '../Utils/Loading';
import { SellerDisplay } from './SellerDisplay';
import './Seller.css'
import { SellerForm } from './SellerForm';


interface GetSellersPayload {
    sellers: Sellers;
}

interface Sellers {
    items: SellerInterface[];
    pageInfo: PageInfo;
}

export interface SellerInterface {
    prospects: Prospects[];
    id: number;
    fullName: string;
    email: string;
    employmentDate: string;
    resignationDate?: any;
}

export interface Prospects {
    id: number;
    customerName: string;
    projectName: string;
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const SellerContainer: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<GetSellersPayload>(GET_SELLERS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    });

    let containerContent;
    // let sellerContent= data?.sellers.items.map((item,i)=>(
    //     <Seller key={'Seller_Fragment_' + item.id} seller={item} refetch={refetch} prospects={item.prospects}/>
    // ));
        
    if (data) {
        containerContent = data.sellers.items.map((item, i) => (
            <React.Fragment key={'Seller_Fragment_' + item.id}>
                <SellerDisplay key={'Seller_' + item.id} seller={item} prospects={item.prospects} />
            </React.Fragment>
        ));
    } else if (error) {
        console.log(error);
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen selgere hentet. </p>
            </div>
        );
    } else if (loading) {
        containerContent = <Loading />;
    } else {
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen selgere hentet. </p>
            </div>
        );
    }

    return <div>{containerContent}</div>;
};