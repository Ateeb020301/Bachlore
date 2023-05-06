import { gql } from '@apollo/client';
import { Customer } from '../logic/interfaces';

export interface ActionPayload {
    actions: { items: Action[] }
}

export interface AddActionPayload {
    addAction: { action: { id: number } };
}

export interface DeleteActionPayload {
    deleteAction: { action: { id: number } };
}

export interface EditActionPayload {
    editAction: { action: { id: number } };
}

export interface Action {
    id: number,
    comment:string, 
    customer: Customer;
    date: any;
}
export interface GetActionItemsContractsPayload {
    actions: { items: Action[] }
}



export const GET_ACTION = gql`
    query {
        actions {
            items {
                id
                comment
                date
                customer {
                    id
                    firstName
                    lastName
                    email
                    tlf
                }
            }
        }
    }
`;

export const ADD_ACTION = gql `
mutation($input: AddActionInput) {
    addAction(input: $input) {
        action {
            id
            comment
            date
            customer {
                id
                firstName
                lastName
                email
                tlf
            }
        }
    }
}
`;

export const DELETE_ACTION = gql `
mutation($input: DeleteActionInput) {
    deleteAction(input: $input) {
        action {
            id
        }
    }
}
`;

export const EDIT_CUSTOMER = gql`
    mutation EditAction($input: EditActionInput) {
        editAction(input: $input) {
            action {
                id
            }
        }
    }
`;
