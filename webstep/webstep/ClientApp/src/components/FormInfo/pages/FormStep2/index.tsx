import * as C from './styles'
import {useNavigate, Link} from 'react-router-dom'
import { Theme } from '../../components/Theme/intex'
import { SelectOption } from '../../components/SelectOption'
import {useForm, FormActions} from '../../context/FormContext'
import {ChangeEvent, useEffect, useState} from 'react'
import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECTCONSULTANT, GetProjectItemsPayload, GET_CONSULTANTS_INFO, GET_PROJECTS } from '../../../../api/contract/queries'
import { AddProjectConsultantPayload, GetConsultantItemsContractsPayload } from '../../../../api/contract/payloads'
import { GET_PROSPECTS } from '../../../../api/prospects/queries'
import { FormGroup, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { toast } from 'react-toastify'
import { GET_CONSULTANTS } from '../../../../api/financials/queries'
//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 20;
interface ProjectConsultantsNoId {
    projectId: number;
    consultantId: string;

}
export const FormStep2 = () => {
    const { loading, error, data, refetch } = useQuery<GetProjectItemsPayload>(GET_PROJECTS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });
    const { loading: loadingC, error: errorC, data: dataC } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);
       let projectN=0;
    
    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleSubmit(e);
        navigate('../step3')
    }

    const {state, dispatch} = useForm()
    const navigate = useNavigate()


    useEffect(()=>{
        if(state.name === '') {
            navigate('/')
        } else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2
            })
        }
        

    },[])
    let defaultProjectConsultants: ProjectConsultantsNoId={
        consultantId:'',
        projectId:0,
    }
    const [currenProject, setCurrentProject] = useState<ProjectConsultantsNoId>(defaultProjectConsultants);
    //const [displayValidation, setDisplayValidation] = useState<string>(' ');
    const [addProjectConsultants] = useMutation<AddProjectConsultantPayload, { input: ProjectConsultantsNoId }>(ADD_PROJECTCONSULTANT, {
            refetchQueries: [
                {
                    query: GET_PROSPECTS,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: FormActions.setName,
            payload: e.target.value 

        })
        setCurrentProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));

        // console.log(value)
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(state.name)
        console.log(state.projectName)
        data?.projects.items.map((aProject) => {
            console.log(aProject.customerName)
            if(aProject.projectName==state.projectName && aProject.customerName==state.name){
                defaultProjectConsultants.projectId=aProject.id;
                console.log('hei');
                console.log(aProject.id);
                dispatch({
                    type: FormActions.setProjectId,
                    payload: aProject.id
                })
            }
        })
        defaultProjectConsultants.consultantId=currenProject.consultantId;
        addProjectConsultants({ variables: { input: defaultProjectConsultants } })
        .then((res) => {
            // let newProspectId = res.data?.addProjectConsultants;
            toast.success(' Project og consultant lagt til', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((e) => {
            toast.error('Noe gikk galt ved legging av Prospect og Consultant', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
    };
    const isValidText = (s: string) => {
        return s !== '';
    };
    const handleSelect2=(e: SelectChangeEvent) =>{
        const { name, value } = e.target;    

    }



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
                <div className='utskrift'>
                        
                </div>
                <div>
                    {/* <Link to='/step2'>Voltar</Link> */}
                    <button onClick={handleNextStep}>Next</button>
                </div>

            </C.Container>
        </Theme>
    )
}