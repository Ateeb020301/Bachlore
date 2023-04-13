import React, { useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { useMutation } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { ADD_CUSTOMER, AddCustomerPayload, GET_CUSTOMER } from '../../api/customer';

interface DefaultCustomer {
    firstName: string;
    lastName: string;
    adresse: string;
    email: string;
    tlf: string;
}


interface ModalConsultantProps {
    onClose: () => void;
}

export const AddForm: React.FC<ModalConsultantProps> = ({onClose}) => {
    let defaultCustomer: DefaultCustomer = {
        firstName: '',
        lastName: '',
        adresse: '',
        email: '',
        tlf: '',
    };

    const [currentCustomer, setCurrentCustomer] = useState<DefaultCustomer>(defaultCustomer);
    const [addCustomer] = useMutation<AddCustomerPayload, { input: DefaultCustomer }>(
        ADD_CUSTOMER, {
            refetchQueries: [
                {
                    query: GET_CUSTOMER,
                },
            ],
            awaitRefetchQueries: true,
        }
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } : any = e.target;

        setCurrentCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(currentCustomer);

        addCustomer({ variables: { input: currentCustomer } })
        .then((res) => {
            toast.success('Customer opprettet', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            onClose();
        })
        .catch((err) => {
            toast.error('Noe gikk galt med oppretting av en customer.', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(err)
        });
    };

    const isValidText = (s: string) => {
        return s !== '';
    };

    const isValidConsultant = (): boolean => {
        let hasTruthyValues =
            currentCustomer.firstName &&
            currentCustomer.adresse &&
            currentCustomer.lastName &&
            currentCustomer.email &&
            currentCustomer.tlf

        if (hasTruthyValues) {
            return true
        }
        return false;
    };

    return (
        <Box>
            <Box>
                <form>
                    <FormGroup>
                        <Label for='firstName'>First Name</Label><br />
                        <Input
                            type='text'
                            id='firstName'
                            valid={isValidText(currentCustomer.firstName)}
                            invalid={!isValidText(currentCustomer.firstName)}
                            value={currentCustomer.firstName}
                            onChange={handleChange}
                            name='firstName'
                        />
                    </FormGroup>
                    <FormGroup>
                    <Label for='lastName'>Last Name</Label><br />
                        <Input
                            type='text'
                            id='lastName'
                            valid={isValidText(currentCustomer.lastName)}
                            invalid={!isValidText(currentCustomer.lastName)}
                            value={currentCustomer.lastName}
                            onChange={handleChange}
                            name='lastName'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='addresse'>Address</Label><br />
                        <Input
                            type='text'
                            id='addresse'
                            min={0}
                            max={5}
                            valid={isValidText(currentCustomer.adresse)}
                            invalid={!isValidText(currentCustomer.adresse)}
                            value={currentCustomer.adresse}
                            onChange={handleChange}
                            name='adresse'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='email'>Email</Label><br />
                        <Input
                            type='text'
                            id='inpEmail'
                            valid={isValidText(currentCustomer.email)}
                            invalid={!isValidText(currentCustomer.email)}
                            value={currentCustomer.email}
                            onChange={handleChange}
                            name='email'
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for='tlf'>Phone Number:</Label><br />
                        <Input
                            type='text'
                            id='inpTlf'
                            value={currentCustomer.tlf ? currentCustomer.tlf : ''}
                            onChange={handleChange}
                            name='tlf'
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