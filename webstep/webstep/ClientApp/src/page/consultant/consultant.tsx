import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { AddConsultantPayload, ADD_CONSULTANT } from '../../api/consultants';
import { Box } from '@mui/material';

interface ConsultantNoId {
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
}

export const Consultant = () => {
    //Date shenanigans
    let d = new Date();
    //Get todays date
    let today =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        d.getDate().toString().padStart(2, '0');

    let defaultConsultant: ConsultantNoId = {
        firstName: '',
        lastName: '',
        employmentDate: today,
        resignationDate: null,
        workdays: 0,
    };

    const [currentConsultant, setCurrentConsultant] = useState<ConsultantNoId>(defaultConsultant);
    const [displayValidation, setDisplayValidation] = useState<string>('');
    const [addConsultant] = useMutation<AddConsultantPayload, { input: ConsultantNoId }>(ADD_CONSULTANT);

    //Adds or removes validation field on resignationDate depending on if its empty or not
    useEffect(() => {
        resignationDateValidationToggle();
    });

    const resignationDateValidationToggle = () => {
        let isValidatedStr = '';

        //returns true if its a valid end date, false if its not
        let isValidResignationDate = isValidEndDate(
            currentConsultant.resignationDate ? currentConsultant.resignationDate : ''
        );

        //Checks if date is not empty and is a valid endDate
        if (currentConsultant.resignationDate && currentConsultant.resignationDate !== '' && isValidResignationDate) {
            isValidatedStr = 'is-valid';
        } else if (
            currentConsultant.resignationDate &&
            currentConsultant.resignationDate !== '' &&
            !isValidResignationDate
        ) {
            isValidatedStr = 'is-invalid';
        }

        setDisplayValidation(isValidatedStr);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCurrentConsultant((prevConsultant) => ({
            ...prevConsultant,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (isValidConsultant()) {
            addConsultant({ variables: { input: currentConsultant } })
                .then((res) => {
                    toast.success('Konsulent opprettet', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                })
                .catch((err) => {
                    toast.error('Noe gikk galt med oppretting av en konsulent.', {
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
        if (currentConsultant.employmentDate === '') {
            //change to date when its ready
            return isValidText(s);
        } else {
            // assumes startdate is formatted correctly
            let tempSD = new Date(currentConsultant.employmentDate);
            // assumes enddate is formatted correctly
            let tempED = new Date(s);
            return tempED > tempSD;
        }
    };

    const isValidConsultant = (): boolean => {
        let hasTruthyValues =
            currentConsultant.firstName &&
            currentConsultant.lastName &&
            isValidStartDate(currentConsultant.employmentDate);

        let resignDate = currentConsultant.resignationDate?.toString();
        if (hasTruthyValues) {
            if (resignDate !== '') {
                return (
                    isValidText(currentConsultant.employmentDate) &&
                    isValidEndDate(currentConsultant.resignationDate ? currentConsultant.resignationDate : '')
                );
            } else {
                return isValidText(currentConsultant.employmentDate);
            }
        }
        return false;
    };

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', mt: 2}}>
            <Box sx={{flex: 1, border: 'solid', mx: 2, borderRadius: '10px', background: '#fefeff', borderColor: '#e7eaf3', borderWidth: '1px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);'}}>
                <form>
                    <FormGroup>
                        <Label for='firstName'>Konsulents navn:</Label>
                        <Input
                            type='text'
                            id='firstName'
                            valid={isValidText(currentConsultant.firstName)}
                            invalid={!isValidText(currentConsultant.firstName)}
                            value={currentConsultant.firstName}
                            onChange={handleChange}
                            name='firstName'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Konsulents etternavn:</Label>
                        <Input
                            type='text'
                            id='lastName'
                            valid={isValidText(currentConsultant.lastName)}
                            invalid={!isValidText(currentConsultant.lastName)}
                            value={currentConsultant.lastName}
                            onChange={handleChange}
                            name='lastName'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='employmentDate'>Start dato:</Label>
                        <Input
                            type='date'
                            id='employmentDate'
                            valid={isValidStartDate(currentConsultant.employmentDate)}
                            invalid={!isValidStartDate(currentConsultant.employmentDate)}
                            value={currentConsultant.employmentDate}
                            onChange={handleChange}
                            name='employmentDate'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='resignationDate'>Slutt dato:</Label>
                        <Input
                            type='date'
                            id='resignationDate'
                            className={displayValidation}
                            value={currentConsultant.resignationDate ? currentConsultant.resignationDate : ''}
                            onChange={handleChange}
                            name='resignationDate'
                        />
                    </FormGroup>

                    <Button color='primary' onClick={handleSubmit} disabled={!isValidConsultant()}>
                        Legg til
                    </Button>
                </form>
            </Box>
            <Box sx={{flex: 1, border: 'solid', mx: 2, background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', borderWidth: '1px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);'}}></Box>
            <ToastContainer />
        </Box>
    );
}