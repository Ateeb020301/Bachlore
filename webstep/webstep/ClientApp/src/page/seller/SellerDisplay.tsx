import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteSellerPayload, DELETE_SELLER } from '../../api/sellers';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProspects } from './DisplayProspects';
import { Prospects, SellerInterface } from './SellerContainer';
import './Seller.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface SellerFields {
    seller: SellerInterface;
    refetch: () => {};
    prospects: Prospects[];
}

interface SellerId {
    id: number;
}

export const SellerDisplay: React.FC<SellerFields> = ({ seller, refetch, prospects }) => {
    const [deleteSeller] = useMutation<DeleteSellerPayload, { input: SellerId }>(DELETE_SELLER);
    const [endreSeller] = useMutation<DeleteSellerPayload, { input: SellerId }>(DELETE_SELLER);

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
            <table className="tableContent">
                    <tbody>
                        <tr onClick={toggleOpen} className='AccordionHead noselect'>
                            <td>{seller.id}</td>
                            <td>{seller.fullName}</td>
                            <td>{seller.email}</td>
                            <td>{seller.employmentDate}</td>
                            <td>{seller.resignationDate}</td>
                            <td>
                                <div className="btnContainer">
                                    <button onClick={sendDeleteRequest} className='btnDelete'>
                                        <DeleteForeverIcon id='btnR' />
                                    </button>   
                                    <button className='btnDelete'>
                                        <ModeEditIcon id='btnE'/>
                                    </button>   
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <div className='AccordionContent' style={{ display: display }}>
                <p>Prospects:</p>
                <DisplayProspects prospects={prospects} />
            </div>
        </div>
    );
};