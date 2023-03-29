import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, UncontrolledDropdown } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Breadcrumbs, FormControl, InputAdornment, InputLabel, Link, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Form, useNavigate } from 'react-router-dom';
import { AddProspectPayload, AddSubProspectPayload } from '../../../api/prospects/payloads';
import { ADD_PROSPECT, ADD_SUBPROSPECT, GET_PROSPECTS, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { Prospects } from '../Prospects';
import { Customer, GetCustomerItemsContractsPayload, GET_CUSTOMERS } from '../../../api/customer';
import { SubProspect } from '../../../logic/interfaces';
import { AddProspectCustomerInput, AddProspectInput, AddSubProspectInput } from '../../../api/prospects/inputs';
import { getCurrentWeek } from '../../../logic/dateFunctions';
import { GET_SELLERS } from '../../../api/sellers';

interface ProspectNoId {
    projectName: string;
    customerId: string;
    sellerId:number;

}



interface ModalNewProspectProps {
    onClose: () => void;
    sellerId:number
    customerId: number;
}


//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const AddProspectForm: React.FC<ModalNewProspectProps> = ({onClose, sellerId, customerId}) => {
    const { loading, error, data, refetch } = useQuery<GetCustomerItemsContractsPayload>(GET_CUSTOMERS, {
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount }
    });


    let defaultProspect: ProspectNoId={
        projectName: '',
        customerId: '',
        sellerId:0,
    }

    const [currentProspect, setCurrentProspect] = useState<ProspectNoId>(defaultProspect);
    //const [displayValidation, setDisplayValidation] = useState<string>(' ');
    const [addProspect] = useMutation<AddProspectPayload, { input: ProspectNoId }>(
        ADD_PROSPECT, {
            refetchQueries: [
                {
                    query: GET_PROSPECTS,
                },
                {
                    query: GET_SELLERS,
                    variables: {skipAmount: skipAmount, takeAmount: takeAmount  },
                },
            ],
            awaitRefetchQueries: true,
        }
    );
    const [addSubProspect] = useMutation<AddSubProspectPayload, { input: AddSubProspectInput }>(ADD_SUBPROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: sellerId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const handleClick = () => {
        addProspect({ variables: { input: defaultProspect } })
            .then((res) => {
                let newProspectId = res.data?.addProspect.prospect.id;

                if (newProspectId !== undefined) {
                    let defaultSubProspect = getDefaultSubProspect(newProspectId);
                    addSubProspect({ variables: { input: defaultSubProspect } })
                        .then((res) => {
                            toast.success('Prospekt opprettet', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        })
                        .catch((e) => {
                            toast.error('Noe gikk galt ved oppretting av sub-prospektet', {
                                position: toast.POSITION.BOTTOM_RIGHT
                            })
                        });
                }
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved oppretting av prospektet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };

    const handleSelect=(e: SelectChangeEvent) =>{
        const { name, value } = e.target;    
        setCurrentProspect((prevProspect) => ({
            ...prevProspect,
            [name]: value,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCurrentProspect((prevProspect) => ({
            ...prevProspect,
            [name]: value,
        }));

        console.log(value)
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        defaultProspect.projectName=currentProspect.projectName;
        defaultProspect.customerId = currentProspect.customerId;
        defaultProspect.sellerId=sellerId;
        console.log(defaultProspect);

        addProspect({ variables: { input: defaultProspect } })
        .then((res) => {
            let newProspectId = res.data?.addProspect.prospect.id;

            if (newProspectId !== undefined) {
                let defaultSubProspect = getDefaultSubProspect(newProspectId);
                addSubProspect({ variables: { input: defaultSubProspect } })
                    .then((res) => {
                        toast.success('Prospekt opprettet', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                        currentProspect.projectName = "";
                    })
                    .catch((e) => {
                        toast.error('Noe gikk galt ved oppretting av sub-prospektet', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    });
            }
        })
        .catch((e) => {
            toast.error('Noe gikk galt ved oppretting av prospektet', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
    };
    const isValidText = (s: string) => {
        return s !== '';
    };
    

    return (
        <div id='form'>
            <form>
                <FormGroup>
                    <Label for='projectName'>Project Name</Label><br />
                    <Input
                        type='text'
                        id='projectName'
                        valid={isValidText(currentProspect.projectName)}
                        invalid={!isValidText(currentProspect.projectName)}
                        value={currentProspect.projectName}
                        onChange={handleChange}
                        name='projectName'
                    />
                </FormGroup>

                
                <FormGroup>
                    <Select id="ddc" name="customerId" defaultValue='' value={currentProspect.customerId} onChange={handleSelect} >
                        <MenuItem value="" disabled>Choose a customer</MenuItem>
                        {data?.customers.items.map((aCustomer) => (
                            <MenuItem key={aCustomer.id} value={aCustomer.id}>{aCustomer.firstName}</MenuItem>
                        ))}
                    </Select>
                </FormGroup>

                <Button color='primary' onClick={handleSubmit}>
                    Legg til
                </Button>
            </form>
        </div>
    );

}

const getDefaultSubProspect = (prospectId: number) => {
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);

    let currentWeek = getCurrentWeek();
    let currentYear = new Date().getFullYear();
    let prospectDurationInWeeks = 3;

    let probability = 30;
    let workdays = 5;

    let defaultSubProspect: AddSubProspectInput = {
        prospectId: prospectId,
        probability: probability,
        numOfConsultants: workdays,
        start: { year: currentYear, week: weekNumber },
        end: { year: currentYear, week: weekNumber + prospectDurationInWeeks },
    };

    return defaultSubProspect;
};