import { gql } from '@apollo/client';
import { Customer } from '../logic/interfaces';

export interface CustomerQuery {
    data: {
        customers: Customer[];
    };
}

export interface AddCustomerPayload {
    addCustomer: { customer: { id: number } };
}

export interface DeleteCustomerPayload {
    deleteCustomer: { customer: { id: number } };
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
            }
        }
    }
`;

export const ADD_CUSTOMER = gql `
mutation($input: AddCustomerInput){
    addCustomer(input: $input){
      customer{
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
mutation($input: DeleteCustomerInput){
    deleteCustomer(input: $input){
        customer{
            id
        }
    }
}
`;
