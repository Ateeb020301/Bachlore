import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import { Consultant, ProjectConsultant } from '../../../../logic/interfaces';
import { DELETE_PROJECTCONSULTANT, GET_PROJECTCONSULTANTS } from '../../../../api/contract/queries';
import { GetProjectConsultantPayload2 } from '../../../../api/contract/payloads';
import { useForm } from '../../context/FormContext';

interface ProjectConsultantProps {
    consultant: Consultant;
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const ProjectConsultantDisplay: React.FC<ProjectConsultantProps> = ({ consultant }) => {
    const [isModalEditOpen, setState] = React.useState(false);
    const navigate = useNavigate();
    const {state, dispatch} = useForm()
    const toggleEdit = () => setState(!isModalEditOpen);
    const { loading, error, data, refetch } = useQuery<GetProjectConsultantPayload2>(GET_PROJECTCONSULTANTS)

    const [deletePC] = useMutation<number, { input: { id: number } }>(DELETE_PROJECTCONSULTANT,{
        refetchQueries: [
            {
                query: GET_PROJECTCONSULTANTS,
            },
        ],
        awaitRefetchQueries: true,
    });

    const sendDeleteRequest = (id:number)=>{
        console.log(id);
        let deleteId=0;
        data?.projectConsultant.map((aPC)=>{
            aPC.consultant.map((aConsultant)=>{
                if(aConsultant.id==id && state.projectId==aPC.project.id){
                    deleteId=aPC.id;

                }
            })
        })
        
        deletePC({ variables: { input: {id: deleteId} } })
        .then((res) => {
            toast.success('Consultant fra Project slettet', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((e) => {
            toast.error('Noe gikk galt ved sletting av Consultant fra Projects', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(e);
        });
    }
    return (
        <div>
        <table className="tableContent">
                    <tbody>
                        <tr className='AccordionHead noselect'>
                            <td>{consultant.id}</td>
                                <div>
                                    <td>{consultant.firstName} {consultant.lastName}</td>
                                    <td>
                                        <DeleteForeverIcon onClick={() => sendDeleteRequest(consultant.id) } id='btnR' />
                                    </td>
                                </div>        
                        </tr>
                    </tbody>
                </table>
    </div>
    );
};