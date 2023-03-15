import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteSellerPayload, DELETE_SELLER, EditSellerPayload, EditSellerInput, EDIT_SELLER, GET_SELLERS, GET_SELLER } from '../../api/sellers';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProspects } from './DisplayProspects';
import { Prospects, SellerInterface } from './SellerContainer';
import './Seller.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { isTokenKind, TypeOfExpression } from 'typescript';
import { SellerProspects } from '../../logic/interfaces';
import { DELETE_PROSPECT, DELETE_SUBPROSPECT } from '../../api/prospects/queries';
import { Seller } from './seller';
import { SchemaMetaFieldDef } from 'graphql/type';
import { Modal } from '../Utils/ModalComponent';

interface SellerFields {
    seller: SellerInterface;
    // prospect: Prospects;
    prospects: Prospects[];
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const SellerDisplay: React.FC<SellerFields> = ({ seller, prospects }) => {

    const [deleteProspect] = useMutation<number, { input: { id: number } }>(DELETE_PROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLERS,
                variables: { skipAmount: skipAmount, takeAmount: takeAmount },
            },
        ],
        awaitRefetchQueries: true,
    });
    const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(DELETE_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLERS,
                variables: { skipAmount: skipAmount, takeAmount: takeAmount },
            },
        ],
        awaitRefetchQueries: true,
    });
    const [deleteSeller] = useMutation<number, { input: { id: number } }>(DELETE_SELLER, {
        refetchQueries: [
            {
                query: GET_SELLERS,
                variables: { skipAmount: skipAmount, takeAmount: takeAmount },
            },
        ],
        awaitRefetchQueries: true,
    });

    const [editSeller] = useMutation<EditSellerPayload, { input: EditSellerInput }>(EDIT_SELLER, {
        refetchQueries: [
            {
                query: GET_SELLER  
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

    const sendDeleteRequest = (sellers: SellerInterface)=>{
        console.log(sellers);
        deleteSeller({ variables: { input: {id: sellers.id} } })
            .then((res) => {
                sellers.prospects.forEach((prospect) => {
                    deleteProspect({ variables: { input: {id: prospect.id} } })
                        .then((res) => {
                            prospect.subProspects.forEach((subprospect)  => {
                                deleteSubProspect({variables: {input :{id :subprospect.id}}})
                                .then((res) => {

                                 })
                                 .catch((e) => {
                                        toast.error('Noe gikk galt ved sletting av SubProspects til Selgeren', {
                                        position: toast.POSITION.BOTTOM_RIGHT
                                    })
                                    console.log(e);
                                });

                            })
                        })  
                        .catch((e) => {
                            toast.error('Noe gikk galt ved sletting av Prospektet til Selgeren', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                            console.log(e);
                        });
                })
                toast.success('Selger slettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                
                toast.error('Noe gikk galt ved sletting av Selger', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    }
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
                                    <DeleteForeverIcon onClick={() => sendDeleteRequest(seller) } id='btnR' />
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