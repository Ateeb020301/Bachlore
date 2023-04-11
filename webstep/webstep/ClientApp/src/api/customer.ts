import { gql } from '@apollo/client';
import { Prospect } from '../logic/interfaces';

export interface CustomerPayload {
    customers: { items: Customer[] }
}

export interface AddCustomerPayload {
    addCustomer: { customer: { id: number } };
}

export interface DeleteCustomerPayload {
    deleteCustomer: { customer: { id: number } };
}
export interface Customer {
    id: number,
    firstName:string, 
    lastName:string,
    adresse:string,
    email:string,
    tlf:string,
    prospects: Prospect[];
}
export interface GetCustomerItemsContractsPayload {
    customers: { items: Customer[] }
}



export const GET_CUSTOMER = gql`
    query {
        customers {
            items {
                id
                firstName   
                lastName
                adresse
                email
                tlf
                prospects {
                    projectName
                    subProspects {
                        id
                    }
                }
            }
        }
    }
`;

export const GET_CUSTOMERS = gql`
    query GetCustomers($skipAmount: Int! $takeAmount: Int!) {
        customers(skip: $skipAmount take: $takeAmount) {
            items {
                id
                firstName
                lastName
                email
                adresse
                tlf
                prospects {
                    projectName
                    subProspects {
                        id
                    }
                }
            }
        }
    }
`;

export const ADD_CUSTOMER = gql `
mutation($input: AddCustomerInput) {
    addCustomer(input: $input) {
        customer {
            firstName
            lastName
            email
            adresse
            tlf
        }
    }
}
`;

export const DELETE_CUSTOMER = gql `
mutation($input: DeleteCustomerInput) {
    deleteCustomer(input: $input) {
        customer {
            id
        }
    }
}
`;
