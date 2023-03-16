import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { AddConsultantPayload, ADD_CONSULTANT, EditConsultantPayload, EDIT_CONSULTANT } from '../../api/consultants';
import { Box } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { GET_CONSULTANTS_INFO, GET_CONSULTANT_CAPACITY, GET_TEAMCONS_CONTRACTS } from '../../api/contract/queries';
import { constants } from '../../logic/constants';

interface ConsultantNoId {
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


interface ModalEditConsultantProps {
    onClose: () => void;
    consultant: ConsultantNoId;
}

export const EditForm: React.FC<ModalEditConsultantProps> = ({onClose, consultant}) => {

    //Date shenanigans
    let d = new Date();
    //Get todays date
    let today =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        d.getDate().toString().padStart(2, '0');

    let newConsultant: ConsultantNoId = {
        id: 0,
        firstName: '',
        lastName: '',
        employmentDate: today,
        resignationDate: null,
        workdays: 0,
    };

    const outsideRef = React.useRef(null);
    const navigate = useNavigate();

    const [currentConsultant, setCurrentConsultant] = useState<ConsultantNoId>(consultant);
    const [displayValidation, setDisplayValidation] = useState<string>('');
    const [editConsultant] = useMutation<EditConsultantPayload, { input: ConsultantNoId }>(EDIT_CONSULTANT, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_CAPACITY,
                variables: { startYear: constants.currentYear, endYear: constants.currentYear + 2, id: consultant.id },
            },
            {
                query: GET_CONSULTANTS_INFO,
            },
        ],
        awaitRefetchQueries: true,
    });

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
        console.log(currentConsultant);
        if (isValidConsultant()) {
            newConsultant.id = currentConsultant.id;
            newConsultant.firstName = currentConsultant.firstName;
            newConsultant.lastName = currentConsultant.lastName;
            newConsultant.employmentDate = currentConsultant.employmentDate;
            newConsultant.resignationDate = currentConsultant.resignationDate;
            newConsultant.workdays = parseInt(currentConsultant.workdays.toString());

            editConsultant({ variables: { input: newConsultant } })
                .then((res) => {
                    toast.success('Konsulenten ble redigert', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    onClose();
                })
                .catch((e) => {
                    toast.error('Noe gikk galt ved redigering av Konsulenten', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    console.log(e);
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

    const isValidWorkdays = (days: number) => {
        if (days <= 5 || days >= 0) {
            return true;
        }
        return false;
    }

    const isValidConsultant = (): boolean => {
        let hasTruthyValues =
            currentConsultant.firstName &&
            currentConsultant.workdays &&
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
        <Box>
            <Box>
                <form>
                    <FormGroup>
                        <Label for='firstName'>Konsulent</Label><br />
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
                    <Label for='lastName'>Etternavn</Label><br />
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
                        <Label for='workdays'>Workdays</Label><br />
                        <Input
                            type='number'
                            id='workdays'
                            min={0}
                            max={5}
                            valid={isValidWorkdays(currentConsultant.workdays)}
                            invalid={!isValidWorkdays(currentConsultant.workdays)}
                            value={currentConsultant.workdays}
                            onChange={handleChange}
                            name='workdays'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='employmentDate'>Start dato:</Label>
                        <Input
                            type='date'
                            id='inpEmploymentDate'
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
                            id='inpResignationDate'
                            className={displayValidation}
                            value={currentConsultant.resignationDate ? currentConsultant.resignationDate : ''}
                            onChange={handleChange}
                            name='resignationDate'
                        />
                    </FormGroup>

                    <Button color='primary' onClick={ handleSubmit } disabled={!isValidConsultant()}>
                        Legg til
                    </Button>
                </form>


            </Box>
        </Box>
    );

}