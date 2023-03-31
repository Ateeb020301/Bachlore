import * as C from './styles'
import {useNavigate, Link} from 'react-router-dom'
import { Theme } from '../../components/Theme/intex'
import { SelectOption } from '../../components/SelectOption'
import {useForm, FormActions} from '../../context/FormContext'
import {ChangeEvent, useEffect, useState} from 'react'
import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECTCONSULTANT, GetProjectItemsPayload, GET_CONSULTANTS_INFO, GET_PROJECTCONSULTANTS, GET_PROJECTS } from '../../../../api/contract/queries'
import { AddProjectConsultantPayload, GetConsultantItemsContractsPayload, GetProjectConsultantIDS, GetProjectConsultantPayload } from '../../../../api/contract/payloads'
import { GET_PROSPECTS } from '../../../../api/prospects/queries'
import { FormGroup, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { toast } from 'react-toastify'
import { GET_CONSULTANTS } from '../../../../api/financials/queries'
import { DELETE_PROJECTCONSULTANT } from '../../../../api/consultants'

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 20;
export interface ProjectConsultants {
    id: number;
    projectId: number;
    consultantId: string;

}
interface ProjectConsultantsNoId {
    projectId: number;
    consultantId: string;

}
interface ChosenProps{
    consultant: string;
}
export const ConsultantChosen: React.FC<ChosenProps> = ({ consultant }) =>{
    const { loading, error, data, refetch } = useQuery<GetProjectConsultantPayload>(GET_PROJECTCONSULTANTS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });
    const { loading: loadingC, error: errorC, data: dataC } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);
    let newConsultant = [];

    newConsultant.push(consultant);
    const {state, dispatch} = useForm();
    const navigate = useNavigate();
    const [addProjectConsultants] = useMutation<AddProjectConsultantPayload, { input: ProjectConsultantsNoId }>(ADD_PROJECTCONSULTANT, {
            refetchQueries: [
                {
                    query: GET_PROSPECTS,
                },
            ],
            awaitRefetchQueries: true,
        }
    );
    const [deletePC] = useMutation<number, { input: { id: number } }>(DELETE_PROJECTCONSULTANT)
   
    const sendDeleteRequest = (id:number)=>{
        let deleteId=0;
        data?.projectConsultant.items.map((aPC)=>{
            aPC.consultant.map((aConsultant)=>{
                if(aPC.project.id==state.projectId && aConsultant.id==id){
                    deleteId=aPC.id
                }
            })
        })
        console.log(deleteId);
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
        });
    }

    return(
        <Theme>
                <C.Container>
                {dataC?.consultants.items.map((aConsultant) => (
                    <div key={'Consultant_Container_' + aConsultant.id} className='container-sub-element'>
                        <p key={'Consultant_Name_' + aConsultant.id}>Consulent navn: {aConsultant.firstName} {aConsultant.lastName}</p>
                        <button key={aConsultant.id} onClick={() => sendDeleteRequest(aConsultant.id) }>Delete</button>
                    </div>
                ))}

            </C.Container>
        </Theme>
    )
}