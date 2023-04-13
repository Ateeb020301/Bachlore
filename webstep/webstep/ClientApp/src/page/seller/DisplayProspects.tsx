import React from 'react';
import { Prospect } from '../../logic/interfaces';
import './Seller.css';

interface ProspectDisplay {
    prospects: Prospect[];
}

const getProspectElements = (prospects: Prospect[]): JSX.Element => {
    console.log(prospects);
    return (
        <>
            {prospects.map((prospect) => (
                <div key={'Prospect_Container_' + prospect.id} className='container-sub-element'>
                    <p key={'Prospect_Name_' + prospect.id}>Prosjekt navn: {prospect.projectName}</p>
                    <p key={'Prospect_Customer_' + prospect.id}>Kunde: {prospect.customer.firstName}</p>
                </div>
            ))}
        </>
    );
};

export const DisplayProspects: React.FC<ProspectDisplay> = ({ prospects }) => {
    let noProspectsMessage = <p className='container-sub-element'>Selger har ingen prospekter.</p>;
    return (
        <div className='displayProspects'>
            {prospects.length > 0 ? getProspectElements(prospects) : noProspectsMessage}
        </div>
    );
};