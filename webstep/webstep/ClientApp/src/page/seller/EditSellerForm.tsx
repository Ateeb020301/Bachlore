import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Breadcrumbs, InputAdornment, Link, OutlinedInput } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { EditSellerInput, EditSellerPayload, EDIT_SELLER, GET_SELLER } from '../../api/sellers';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


interface ModalEditProps {
    onClose: () => void;
    seller: EditSellerInput;
}

export const EditSellerForm: React.FC<ModalEditProps> = ({onClose, seller}) => {


    const outsideRef = React.useRef(null);
    const navigate = useNavigate();

    const [currentSeller, setCurrentSeller] = useState<EditSellerInput>(seller);
    const [displayValidation, setDisplayValidation] = useState<string>('');
    const [editSeller] = useMutation<EditSellerPayload, { input: EditSellerInput }>(EDIT_SELLER, {
        refetchQueries: [
            {
                query: GET_SELLER  
            },
        ],
        awaitRefetchQueries: true,
    });

    //Adds or removes validation field on resignationDate depending on if its empty or not
    useEffect(() => {
        resignationDateValidationToggle();
    });

    const sendEditRequest = ()=>{
        let newSeller: EditSellerInput = {
            id: seller.id,
            fullName: seller.fullName,
            email: seller.email ,
            employmentDate: seller.employmentDate,
            resignationDate: seller.resignationDate,
        };
        console.log(newSeller);
        editSeller({ variables: { input: newSeller  } })
            .then((res) => {
                toast.success('Seller ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av Seller', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    }

    const resignationDateValidationToggle = () => {
        let isValidatedStr = '';

        //returns true if its a valid end date, false if its not
        let isValidResignationDate = isValidEndDate(
            currentSeller.resignationDate ? currentSeller.resignationDate : ''
        );

        //Checks if date is not empty and is a valid endDate
        if (currentSeller.resignationDate && currentSeller.resignationDate !== '' && isValidResignationDate) {
            isValidatedStr = 'is-valid';
        } else if (
            currentSeller.resignationDate &&
            currentSeller.resignationDate !== '' &&
            !isValidResignationDate
        ) {
            isValidatedStr = 'is-invalid';
        }

        setDisplayValidation(isValidatedStr);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCurrentSeller((prevSeller) => ({
            ...prevSeller,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(currentSeller);
        if (isValidSeller()) {
                let newSeller: EditSellerInput = {
                    id: currentSeller.id,
                    fullName: currentSeller.fullName,
                    email: currentSeller.email ,
                    employmentDate: currentSeller.employmentDate,
                    resignationDate: currentSeller.resignationDate,
                };
                console.log(newSeller);
                editSeller({ variables: { input: newSeller  } })
                    .then((res) => {
                        toast.success('Seller ble redigert', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    })
                    .catch((e) => {
                        toast.error('Noe gikk galt ved redigering av Seller', {
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
        if (currentSeller.employmentDate === '') {
            //change to date when its ready
            return isValidText(s);
        } else {
            // assumes startdate is formatted correctly
            let tempSD = new Date(currentSeller.employmentDate);
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

    const isValidSeller = (): boolean => {
        let hasTruthyValues =
        currentSeller.fullName &&
        currentSeller.email &&
            isValidStartDate(currentSeller.employmentDate);

        let resignDate = currentSeller.resignationDate?.toString();
        if (hasTruthyValues) {
            if (resignDate !== '') {
                return (
                    isValidText(currentSeller.employmentDate) &&
                    isValidEndDate(currentSeller.resignationDate ? currentSeller.resignationDate : '')
                );
            } else {
                return isValidText(currentSeller.employmentDate);
            }
        }
        return false;
    };

    return (
        <Box>
            <Box>
                <form>
                    <FormGroup>
                        <Label for='fullName'>Seller</Label><br />
                        <Input
                            type='text'
                            id='firstName'
                            valid={isValidText(currentSeller.fullName)}
                            invalid={!isValidText(currentSeller.fullName)}
                            value={currentSeller.fullName}
                            onChange={handleChange}
                            name='firstName'
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label for='lastName'>Etternavn</Label><br />
                        <Input
                            type='text'
                            id='lastName'
                            valid={isValidText(currentSeller.email)}
                            invalid={!isValidText(currentSeller.email)}
                            value={currentSeller.email}
                            onChange={handleChange}
                            name='lastName'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='employmentDate'>Start dato:</Label>
                        <Input
                            type='date'
                            id='inpEmploymentDate'
                            valid={isValidStartDate(currentSeller.employmentDate)}
                            invalid={!isValidStartDate(currentSeller.employmentDate)}
                            value={currentSeller.employmentDate}
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
                            value={currentSeller.resignationDate ? currentSeller.resignationDate : ''}
                            onChange={handleChange}
                            name='resignationDate'
                        />
                    </FormGroup>

                    <Button color='primary' onClick={ handleSubmit } disabled={!isValidSeller()}>
                        Legg til
                    </Button>
                </form>


            </Box>
        </Box>
    );

}