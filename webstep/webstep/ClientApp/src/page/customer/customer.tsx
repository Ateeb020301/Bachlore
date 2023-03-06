import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { AddCustomerPayload, ADD_CUSTOMER } from '../../api/customer';
import { useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

interface CustomerNoId {
    
    firstName: string;
    lastName: string;
    email: string;
    adresse: string;
    tlf: string;
}

export const Customer = () => {

    // you dont put id yourself
    let defaultCustomer: CustomerNoId = {

        firstName: '',
        lastName: '',
        email: '',
        adresse: '',
        tlf: '',

    };

    const [currentCustomer, setCurrentCustomer] = useState<CustomerNoId>(defaultCustomer);
    const [displayValidation, setDisplayValidation] = useState<string>('');
    const [addCustomer] = useMutation<AddCustomerPayload, { input: CustomerNoId }>(ADD_CUSTOMER);

    //Adds or removes validation field on resignationDate depending on if its empty or not

    //checks only if the start date is empty
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCurrentCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

  
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

            // console.log(currentSeller);
            addCustomer({ variables: { input: currentCustomer } })
                .then((res) => {
                    toast.success('Customer opprettet', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                })
                .catch((err) => {
                    toast.error('Noe gikk galt med oppretting av en customer.', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })                    
                });
    };

    return (
        <div style={{width: '100%', border: 'solid'}}>
            <form>
                <FormGroup>
                    <Label for='firstName'>Selgers Fornavn:</Label>
                    <Input
                        type='text'
                        id='firstName'
                        value={currentCustomer.firstName}
                        onChange={handleChange}
                        name='firstName'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='lastName'>Selgers Etternavn:</Label>
                    <Input
                        type='text'
                        id='lastName'
                        value={currentCustomer.lastName}
                        onChange={handleChange}
                        name='lastName'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>Selgers email:</Label>
                    <Input
                        type='text'
                        id='email'
                        value={currentCustomer.email}
                        onChange={handleChange}
                        name='email'
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='adresse'>Start dato:</Label>
                    <Input
                        type='date'
                        id='adresse'
                        value={currentCustomer.adresse}
                        onChange={handleChange}
                        name='adresse'
                    />
                </FormGroup>

                <FormGroup>
                    <Label for='tlf'>Slutt dato:</Label>
                    <Input
                        type='date'
                        id='tlf'
                        value={currentCustomer.tlf}
                        onChange={handleChange}
                        name='tlf'
                    />
                </FormGroup>

                <Button color='primary' onClick={handleSubmit}>
                    Legg til
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
}