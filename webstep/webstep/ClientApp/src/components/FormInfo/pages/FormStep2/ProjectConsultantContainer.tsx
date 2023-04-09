import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { DELETE_PROJECTCONSULTANT, GET_PROJECTCONSULTANTS } from '../../../../api/contract/queries';
import { GetProjectConsultantPayload2 } from '../../../../api/contract/payloads';

import { Loading } from '../../../../page/Utils/Loading';
import { useForm } from '../../context/FormContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';
import { ProjectConsultantDisplay } from './ProjectConsultantDisplay';

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;
//sette projectconsultant id == id til nåcærende prosjekt
export const ProjectConsultantContainer: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<GetProjectConsultantPayload2>(GET_PROJECTCONSULTANTS)
    
    const {state, dispatch} = useForm()
    let containerContent;
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
    if (data) {
        containerContent = 
            data.projectConsultant.map((aPC)=>{
            if(aPC.project.id==state.projectId){
                aPC.consultant.map((aConsultant)=>{
                <React.Fragment key={'Consultant_Fragment_' + aConsultant.id}>
                    <ProjectConsultantDisplay key={'Consultant' + aConsultant.id} consultant={aConsultant} />
                </React.Fragment>
                }
            )}
        })

    } else if (error) {
        console.log(error);
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen konsulenter hentet. </p>
            </div>
        );
    } else if (loading) {
        containerContent = <Loading />;
    } else {
        containerContent = (
            <div>
                <p>Noe gikk galt, ingen konsulenter hentet. </p>
            </div>
        );
    }

    return <div>
        {containerContent}
        </div>
}