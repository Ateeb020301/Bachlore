import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteSellerPayload, DELETE_SELLER, EditSellerPayload, EditSellerInput, EDIT_SELLER, GET_SELLER } from '../../api/sellers';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProspects } from './DisplayProspects';
import { Prospects, SellerInterface } from './SellerContainer';
import './Seller.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TypeOfExpression } from 'typescript';
import { Seller } from '../../logic/interfaces';

interface SellerFields {
    seller: SellerInterface;
    prospects: Prospects[];
}

interface SellerId {
    id: number;
}

export const SellerDisplay: React.FC<SellerFields> = ({ seller, prospects }) => {
    const [deleteSeller] = useMutation<DeleteSellerPayload, { input: SellerId }>(DELETE_SELLER, {
        refetchQueries: [
            {
                query:  GET_SELLER,
                variables: { id: seller.id},
            },
        ],
        awaitRefetchQueries: true,
    });
    const [editSeller] = useMutation<EditSellerPayload, { input: EditSellerInput }>(EDIT_SELLER, {
        refetchQueries: [
            {
                query:  GET_SELLER,
                variables: { id: seller.id},
            },
        ],
        awaitRefetchQueries: true,
    });

    const sendEditRequest = ()=>{
        let newSeller: EditSellerInput = {
            id: seller.id,
            fullName: seller.fullName,
            email: seller.email ,
            employmentDate: seller.employmentDate,
            resignationDate: seller.resignationDate,
        };
        console.log(newSeller);
        editSeller({ variables: { input: newSeller  } })
            .then((res) => {
                toast.success('Seller ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av Seller', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    }

    //used for toggling consultant info on/off
    const [isHidden, setIsHidden] = useState(true);

    const toggleOpen = () => setIsHidden(!isHidden);

    const sendDeleteRequest = () => {
        deleteSeller({
            variables: { input: { id: seller.id } },
        })
            .then((res) => {
                toast.success('Seller ble slettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((err) => {
                toast.error('Noe gikk galt ved sletting av seller', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
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
                                    <button onClick={sendEditRequest} className='btnDelete'>
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