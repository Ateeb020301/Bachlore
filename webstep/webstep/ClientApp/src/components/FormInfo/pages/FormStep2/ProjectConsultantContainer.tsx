import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PROJECTCONSULTANTS } from '../../../../api/contract/queries';
import { GetProjectConsultantPayload2 } from '../../../../api/contract/payloads';
import { Loading } from '../../../../page/Utils/Loading';
import { useForm } from '../../context/FormContext';
import { ProjectConsultantDisplay } from './ProjectConsultantDisplay';

//sette projectconsultant id == id til nåcærende prosjekt
export const ProjectConsultantContainer: React.FC = () => {
    const { loading, error, data } = useQuery<GetProjectConsultantPayload2>(GET_PROJECTCONSULTANTS)
    
    const {state} = useForm()
    let containerContent;

    if (data) {
        containerContent = 
            data.projectConsultant.map((aPC)=>{
            if(aPC.project.id===state.projectId){
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

    return <div>{containerContent}</div>
}