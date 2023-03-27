import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteSellerPayload, DELETE_SELLER, EditSellerPayload, EditSellerInput, EDIT_SELLER, GET_SELLERS, GET_SELLER } from '../../api/sellers';
import { defaultMessagePlacement } from '../../logic/toast';
import { DisplayProspects } from './DisplayProspects';
import { SellerInterface } from './SellerContainer';
import './Seller.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { isTokenKind, TypeOfExpression } from 'typescript';
import { Seller, SellerProspects } from '../../logic/interfaces';
import { DELETE_PROSPECT, DELETE_SUBPROSPECT } from '../../api/prospects/queries';
import { Customer, PageInfo, Prospect, SubProspect } from '../../logic/interfaces';
import { ModalEdit } from './EditModal';
import { Box, Modal, Typography } from '@mui/material';
import { style } from '@mui/system';

interface SellerFields {
    seller: SellerInterface;
    // prospect: Prospects;
    prospects: Prospect[];

}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const SellerDisplay: React.FC<SellerFields> = ({ seller, prospects }) => {
    const [isModalEditOpen, setState] = React.useState(false);

    const toggleEdit = () => setState(!isModalEditOpen);


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

    

    //used for toggling consultant info on/off
    const [isHidden, setIsHidden] = useState(true);

    const toggleOpen = () => setIsHidden(!isHidden);

    const sendDeleteRequest = (sellers: SellerInterface)=>{
        console.log(sellers);
        // sellers.prospects.forEach((prospect) => {
        //     prospect.subProspects.forEach((subprospect) => {
        //         if(subprospect.)
        //     }) 
        // })
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
    let sellerEdit: Seller = {
        id: 0,
        fullName: '',
        email: '',
        employmentDate: '',
        resignationDate: null,
    };

    const handleOpen = (seller: Seller) => {
        sellerEdit = seller;
        toggleEdit();
    }

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
                                    <ModeEditIcon onClick={toggleEdit } id='btnE'/> 
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <div className='AccordionContent' style={{ display: display }}>
                <p>Prospects:</p>
                <DisplayProspects prospects={prospects} />
            </div>
            <ModalEdit
            title={'Edit Seller'}
                isOpen={isModalEditOpen}
                onClose={toggleEdit}
                seller={seller}
            />
        </div>
    );
};