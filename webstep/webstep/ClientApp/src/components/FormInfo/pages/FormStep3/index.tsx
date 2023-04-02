import * as C from './styles'
import { Theme } from '../../components/Theme/intex'
import {Link, useNavigate} from 'react-router-dom'
import {useForm, FormActions} from '../../context/FormContext'
import {ChangeEvent, useEffect, useState} from 'react'
import React from 'react'
import { Input, Label } from 'reactstrap'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { ADD_CONTRACT, GET_CONSULTANT_CONTRACT } from '../../../../api/contract/queries'
import { AddContractPayload } from '../../../../api/contract/payloads'
import { color } from '@mui/system'
interface ContractNoId {
    startYear: any;
    startWeek:number;
    endYear:any;
    endWeek:number;
    daysOfWeek:number;
    hourlyRate:number;
    projectId: number;
}
export const FormStep3 = () => {
    const {state, dispatch} = useForm()
    const navigate = useNavigate()

    const handleNextStep = () =>{
        navigate('../step4')

    }



    useEffect(()=>{
        if(state.name === '') {
            navigate('/')
        } else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 3
            })
        }
        

    },[])
            //Date shenanigans
            let d = new Date();
            //Get todays date
            let today =
                d.getFullYear() +
                '-' +
                (d.getMonth() + 1).toString().padStart(2, '0') +
                '-' +
                d.getDate().toString().padStart(2, '0');
        
            // you dont put id yourself
            let defaultContract: ContractNoId = {
                startYear: today,
                startWeek:0,
                endYear:0,
                endWeek:0,
                daysOfWeek:0,
                hourlyRate:0,
                projectId:0
            };
        
            const [currentContract, setCurrentContract] = useState<ContractNoId>(defaultContract);
            const [displayValidation, setDisplayValidation] = useState<string>('');
            const [addContract] = useMutation<AddContractPayload, { input: ContractNoId }>(ADD_CONTRACT,{
                refetchQueries: [
                    {
                        query: GET_CONSULTANT_CONTRACT,
                        variables: { skipAmount: 0, takeAmount: 50 },
                    },
                ],
                awaitRefetchQueries: true,
            
        }
    );
    
            //Adds or removes validation field on resignationDate depending on if its empty or not
            useEffect(() => {
                resignationDateValidationToggle();
            });
        
            const resignationDateValidationToggle = () => {
                let isValidatedStr = '';
        
                //returns true if its a valid end date, false if its not
                let isValidResignationDate = isValidEndDate(currentContract.endYear ? currentContract.endYear : '');
        
                //Checks if date is not empty and is a valid endDate
                if (currentContract.endYear && currentContract.endYear !== '' && isValidResignationDate) {
                    isValidatedStr = 'is-valid';
                } else if (currentContract.endYear && currentContract.endYear !== '' && !isValidResignationDate) {
                    isValidatedStr = 'is-invalid';
                }
        
                setDisplayValidation(isValidatedStr);
            };
        
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
        
                setCurrentContract((prevContract) => ({
                    ...prevContract,
                    [name]: value,
                }));
            };
        
            const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
        
                if (isValidSeller()) {
                    // console.log(currentSeller);
                    defaultContract.daysOfWeek=currentContract.daysOfWeek;
                    defaultContract.startYear=currentContract.startYear;
                    defaultContract.endYear=currentContract.endYear;
                    defaultContract.startWeek=currentContract.startWeek;
                    defaultContract.endWeek=currentContract.endWeek;
                    defaultContract.hourlyRate=currentContract.hourlyRate;
                    defaultContract.projectId=state.projectId;

                    addContract({ variables: { input: defaultContract } })
                        .then((res) => {
                            toast.success('Contract opprettet', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                            currentContract.endYear = "";
                            currentContract.startWeek = 0;
                            currentContract.endWeek=0;
                            currentContract.hourlyRate = 0;
                            currentContract.daysOfWeek=0;
                            
                        })
                        .catch((err) => {
                            toast.error('Noe gikk galt med oppretting av en Contract.', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })                    
                        });
                }
            };
        
            const isValidText = (s: string) => {
                return s !== '';
            };
        
            //checks only if the start date is empty
            const isValidStartDate = (s: string) => {
                if (s === '') {
                    return false;
                }
                return true;
            };
        
            const isValidEndDate = (s: string) => {
                if (s === '') {
                    return true;
                }
        
                // If the startdate doesnt exist, any valid date is a valid start date
                if (currentContract.startYear === '') {
                    //change to date when its ready
                    return isValidText(s);
                } else {
                    // assumes startdate is formatted correctly
                    let tempSD = new Date(currentContract.startYear);
                    // assumes enddate is formatted correctly
                    let tempED = new Date(s);
                    return tempED > tempSD;
                }
            };
        
            const isValidSeller = (): boolean => {
                let hasTruthyValues =
                currentContract.daysOfWeek && currentContract.hourlyRate && isValidStartDate(currentContract.startYear);
        
                let resignDate = currentContract.endYear?.toString();
                if (hasTruthyValues) {
                    if (resignDate !== '') {
                        return (
                            isValidText(currentContract.startYear) &&
                            isValidEndDate(currentContract.endYear ? currentContract.endYear : '')
                        );
                    } else {
                        return isValidText(currentContract.startYear);
                    }
                }
                return false;
            };
    return(
        <Theme>
            <div>
                <p className='passo' >Passo 3/3</p>
                <h4>Hei {state.name}, Kontract Planning</h4>

                    <Label for='startYear'>Start Date</Label><br />
                    <Input
                        type='date'
                        id='startYear'
                        valid={isValidStartDate(currentContract.startYear)}
                        invalid={!isValidStartDate(currentContract.startYear)}
                        value={currentContract.startYear}
                        onChange={handleChange}
                        name='startYear'
                    />
                    
                    <Label for='hourlyRate'>HourlyRate</Label><br />
                    <Input
                        type='number'
                        id='hourlyRate'
                        max={2000}
                        min={0}
                        value={currentContract.hourlyRate}
                        onChange={handleChange}
                        name='hourlyRate'
                        placeholder='1500 kr'
                    />
                                        
                    <Label for='startWeek'>Start Week</Label><br />
                    <Input
                        type='number'
                        id='startWeek'
                        min={0}
                        max={52}
                        value={currentContract.startWeek}
                        onChange={handleChange}
                        name='startWeek'
                        placeholder='2'
                    />
                    

                    <Label for='endYear'>End date</Label><br />
                    <Input
                        type='date'
                        id='endYear'
                        valid={isValidStartDate(currentContract.endYear)}
                        invalid={!isValidStartDate(currentContract.endYear)}
                        value={currentContract.endYear ? currentContract.endYear : ''}
                        onChange={handleChange}
                        name='endYear'
                    />
                    
                    <Label for='endWeek'>End Year</Label><br />
                    <Input
                        type='number'
                        id='endWeek'
                        min={0}
                        max={52}
                        value={currentContract.endWeek}
                        onChange={handleChange}
                        name='endWeek'
                        placeholder='2002'
                    />
                    
                    <Label for='email'>End Week</Label><br />
                    <Input
                        type='text'
                        id='daysOfWeek'
                        min={0}
                        max={5}
                        value={currentContract.daysOfWeek}
                        onChange={handleChange}
                        name='daysOfWeek'
                        placeholder='0'
                    />

                <div>
                    {/* <Link to='/step2'>Voltar</Link> */}
                    <button onClick={handleNextStep}>Next</button>
                </div>
            </div>
        </Theme>
    )
}