import React from 'react';
import { Prospects } from './SellerContainer'
import './Seller.css'

interface ProspectDisplay {
    prospects: Prospects[];
}

const getProspectElements = (prospects: Prospects[]): JSX.Element => {
    return (
        <>
            {prospects.map((prospect) => (
                <div key={'Prospect_Container_' + prospect.id} className='projectContainer'>
                    <p key={'Prospect_Name_' + prospect.id}>Prosjekt navn: {prospect.projectName}</p>
                    <p key={'Prospect_Customer_' + prospect.id}>Kunde: {prospect.customerName}</p>
                </div>
            ))}
        </>
    );
};

export const DisplayProspects: React.FC<ProspectDisplay> = ({ prospects }) => {
    let noProspectsMessage = <p className='container-sub-element'>Selger har ingen prospekter.</p>;
    return (
        <div className='display-prospects'>
            {prospects.length > 0 ? getProspectElements(prospects) : noProspectsMessage}
        </div>
    );
};