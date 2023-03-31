import * as C from './styles'
import {useNavigate} from 'react-router-dom'
import { useForm, FormActions } from '../../context/FormContext'
import { Theme } from '../../components/Theme/intex'
import { ChangeEvent, useEffect, useState } from 'react'
import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { FormStep2 } from '../FormStep2'
import { useMutation, useQuery } from '@apollo/client'
import { AddProjectPayload } from '../../../../api/contract/payloads'
import { ADD_PROJECT } from '../../../../api/contract/queries'
import { GET_PROSPECTS } from '../../../../api/prospects/queries'
import { toast } from 'react-toastify'
import { SelectChangeEvent } from '@mui/material'

interface ProjectNoId {
    projectName: string;
    customerName: string;
}
//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;
export const FormStep1 = () => {
    

    const navigate = useNavigate()
    const { state, dispatch} = useForm()

    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        if(state.name !== '') {
            handleSubmit(e);
            navigate('./step2')
        } else{
            alert('Feil')
        }

    }

    useEffect(()=>{
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        })

    },[])


    let defaultProject: ProjectNoId={
        projectName: '',
        customerName: '',
    }

    const [currenProject, setCurrentProject] = useState<ProjectNoId>(defaultProject);
    //const [displayValidation, setDisplayValidation] = useState<string>(' ');
    const [addProject] = useMutation<AddProjectPayload, { input: ProjectNoId }>(ADD_PROJECT, {
            refetchQueries: [
                {
                    query: GET_PROSPECTS,
                },
            ],
            awaitRefetchQueries: true,
        }
    );

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

        console.log(value)
    };
    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch({
            type: FormActions.setProjectName,
            payload: e.target.value 

        })
        setCurrentProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));

        console.log(value)
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        defaultProject.projectName=currenProject.projectName;
        defaultProject.customerName = currenProject.customerName;
        

        addProject({ variables: { input: defaultProject } })
        .then((res) => {
            let newProspectId = res.data?.addProject.project.id;
            toast.success('Project er opprettet', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            currenProject.projectName = "";
        })
        .catch((e) => {
            toast.error('Noe gikk galt ved oppretting av Project', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
    };
    const isValidText = (s: string) => {
        return s !== '';
    };


    return(
        <Theme>
            <C.Container>
                <p className='passo'>Passo 1/3</p>
                    <Label for='projectName'>Project Name</Label><br />
                    <Input
                        type='text'
                        id='projectName'
                        valid={isValidText(currenProject.projectName)}
                        invalid={!isValidText(currenProject.projectName)}
                        value={currenProject.projectName}
                        onChange={handleChange2}
                        name='projectName'
                    />
                
                    <Label for='customerName'>Customer Name</Label><br />
                    <Input
                        type='text'
                        id='customerName'
                        valid={isValidText(currenProject.customerName)}
                        invalid={!isValidText(currenProject.customerName)}
                        value={currenProject.customerName}
                        onChange={handleChange}
                        name='customerName'
                    />
        
                {/* <Input 
                    type="text" 
                    autoFocus
                    onChange={handleNameChange}
                    
                    /> */}
                    
                <button onClick={handleNextStep}>Fortsett</button>
            </C.Container>
        </Theme>
    )
}