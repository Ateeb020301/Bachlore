import { useMutation } from '@apollo/client';
import { color } from '@mui/system';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteSellerPayload, DELETE_SELLER } from '../../api/sellers';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProspects } from './DisplayProspects';
import { Prospects, Seller } from './SellerContainer';
import './seller.css';

interface SellerFields {
    seller: Seller;
    refetch: () => {};
    prospects: Prospects[];
}

interface SellerId {
    id: number;
}

export const SellerDisplay: React.FC<SellerFields> = ({ seller, refetch, prospects }) => {
    const [deleteSeller] = useMutation<DeleteSellerPayload, { input: SellerId }>(DELETE_SELLER);

    //used for toggling consultant info on/off
    const [isHidden, setIsHidden] = useState(true);

    const toggleOpen = () => setIsHidden(!isHidden);

    const sendDeleteRequest = () => {
        toast.configure();
        deleteSeller({
            variables: { input: { id: seller.id } },
        })
            .then((res) => {
                refetch();
                toast.success('Selger ble slettet.', defaultMessagePlacement);
            })
            .catch((err) => {
                toast.error('Noe gikk galt med sletting av selgeren.', defaultMessagePlacement);
                console.error('Noe gikk galt ved sletting. Error: ' + err);
            });
    };

    let display = isHidden ? 'none' : 'block';

    return (
        <div key={'Seller_' + seller.id} className='AccordionHolder'>
            <p onClick={toggleOpen} className='AccordionHead noselect'>
                {seller.fullName}
            </p>
            <div className='AccordionContent' style={{ display: display }}>
                <button onClick={sendDeleteRequest} className='delete-button'>
                    X
                </button>
                <p>Navn: {seller.fullName}</p>
                <p>Start dato: {seller.employmentDate}</p>
                <p>Prospects:</p>
                <DisplayProspects prospects={prospects} />
            </div>
        </div>
    );
};