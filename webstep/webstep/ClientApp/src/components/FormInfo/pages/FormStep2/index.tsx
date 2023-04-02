import * as C from './styles'
import {useNavigate, Link} from 'react-router-dom'
import { Theme } from '../../components/Theme/intex'
import { SelectOption } from '../../components/SelectOption'
import {useForm, FormActions} from '../../context/FormContext'
import {ChangeEvent, useEffect, useState} from 'react'
import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECTCONSULTANT, GetProjectItemsPayload, GET_CONSULTANTS_INFO, GET_PROJECTS, GET_PROJECTCONSULTANTS } from '../../../../api/contract/queries'
import { AddProjectConsultantPayload, GetConsultantItemsContractsPayload, GetProjectConsultantPayload } from '../../../../api/contract/payloads'
import { GET_PROSPECTS } from '../../../../api/prospects/queries'
import { FormGroup, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { toast } from 'react-toastify'
import { GET_CONSULTANTS } from '../../../../api/financials/queries'
import { Consultant } from '../../../../logic/interfaces'
import { DELETE_PROJECTCONSULTANT } from '../../../../api/consultants'
import { number, string } from 'yup'
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
export const FormStep2 = () => {
    const navigate = useNavigate()
    const { loading, error, data, refetch } = useQuery<GetProjectItemsPayload>(GET_PROJECTS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });
    const { loading: loadingC, error: errorC, data: dataC } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);
    const { data: dataD  } = useQuery<GetProjectConsultantPayload>(GET_PROJECTCONSULTANTS,{
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });
    const [deletePC] = useMutation<number, { input: { id: number } }>(DELETE_PROJECTCONSULTANT)
    const handleNextStep = () => {
        navigate('../step3')
    }

    const {state, dispatch} = useForm()

    let defaultProjectConsultants: ProjectConsultantsNoId={
        consultantId:'',
        projectId:0,
    }
    const [currenProject, setCurrentProject] = useState<ProjectConsultantsNoId>(defaultProjectConsultants);
    //const [displayValidation, setDisplayValidation] = useState<string>(' ');
    const [addProjectConsultants] = useMutation<AddProjectConsultantPayload, { input: ProjectConsultantsNoId }>(ADD_PROJECTCONSULTANT, {
            refetchQueries: [
                {
                    query: GET_PROJECTCONSULTANTS,
                },
            ],
            awaitRefetchQueries: true,
        }
    );
    const handleSelect=(e: SelectChangeEvent) =>{
        const { name, value } = e.target;  
        setCurrentProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    }
    

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        e.preventDefault();
        console.log(state.name)
        console.log(state.projectName)
        data?.projects.items.map((aProject) => {
            if(aProject.projectName==state.projectName && aProject.customerName==state.name){
                defaultProjectConsultants.projectId=aProject.id;
                dispatch({
                    type: FormActions.setProjectId,
                    payload: aProject.id
                })
            }
        })
        let tempName='';
        dataC?.consultants.items.map((aConsultant)=>{
            if(aConsultant.id==parseInt(currenProject.consultantId)){
                
                tempName= aConsultant.firstName+aConsultant.lastName;
            }
        })
        setEmployees(current => [...current, {id: parseInt(currenProject.consultantId), name: tempName}]);
        defaultProjectConsultants.consultantId=currenProject.consultantId;
        console.log(currenProject.consultantId)
        addProjectConsultants({ variables: { input: defaultProjectConsultants } })
        .then((res) => {
            // let newProspectId = res.data?.addProjectConsultants;
            toast.success(' Project og consultant lagt til', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((e) => {
            toast.error('Noe gikk galt ved legging av Project og Consultant', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
    };
    const isValidText = (s: string) => {
        return s !== '';
    };

    // const getConsultantElements = (consultant: Consultant[]): JSX.Element => {
    //     return (
    //         <>
    //             {consultant.map((aConsultant) => (
    //                 <div key={'Consultant_Container_' + aConsultant.id} className='container-sub-element'>
    //                     <p key={'Consultant_Name_' + aConsultant.id}>Prosjekt navn: {aConsultant.firstName} {aConsultant.lastName}</p>
    //                     <button key={aConsultant.id}>Delete</button>
    //                 </div>
    //             ))}
    //         </>
    //     );
    // };


    // const droppDown = ()=>{
    //     newConsultant.map((newCon=>{
            
    //     }))
    // }


    const sendDeleteRequest = (id:number)=>{
        let deleteId=0;
        
        dataD &&dataD.projectConsultant.items.map((a)=>{
            console.log(a.project.id)
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
        });
    }
    const initialState = [
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Bob'},
      ];
      const [employees, setEmployees] = useState(initialState);
    return(
        <Theme>
                <C.Container>
                <p className='passo'>Passo 3/3</p>
                <h4>Hei {state.name}, </h4>
                <p>Velg teamet ditt:</p>

                <FormGroup>
                    <Select id="ddc" name="consultantId" defaultValue='' value={currenProject.consultantId} onChange={handleSelect} >
                        <MenuItem value="" disabled>Choose a Customer</MenuItem>
                        {dataC?.consultants.items.map((aConsultant) => (
                            <MenuItem key={aConsultant.id} value={aConsultant.id}>{aConsultant.firstName} {aConsultant.lastName}</MenuItem>
                        ))}
                    </Select>
                </FormGroup>
                
                    {employees.map((element, index) => {
                        return (
                        <div key={index}>
                            <h2>{element.name}</h2>
                            <button id='btnPC' onClick={() => sendDeleteRequest(element.id)}>Delete</button>
                        </div>
                        );
                    })}


                <div>
                    {/* <Link to='/step2'>Voltar</Link> */}
                    <button onClick={handleSubmit}>Add Consultant</button>
                    <button onClick={handleNextStep}>Next</button>
                </div>

            </C.Container>
        </Theme>
    )
}