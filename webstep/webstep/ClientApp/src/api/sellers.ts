import { gql } from '@apollo/client';
import { date } from 'yup';
import { Seller } from '../logic/interfaces';

export interface SellerQuery {
    data: {
        sellers: Seller[];
    };
}

export interface AddSellerPayload {
    addSeller: { seller: { id: number } };
}

export interface DeleteSellerPayload {
    deleteSeller: { seller: { id: number } };
}

export interface EditSellerPayload {
    editSeller: { seller: { id: number } };

}

export interface EditSellerInput {
    id: number;
    fullName: string;
    email: string;
    employmentDate: any;
    resignationDate: any;
}

export const GET_SELLER = gql`
    query {
        sellers {
        items {
            id
            fullName
            email
            employmentDate
            resignationDate
        }
        }
    }
`;

export const GET_SELLERS = gql`
    query GetSellers($skipAmount: Int! $takeAmount: Int!) {
        sellers(skip: $skipAmount take: $takeAmount) {
            items {
                prospects {
                    id
                    customer {
                      id
                      firstName
                      lastName
                      email
                      adresse
                      tlf
                    }
                    projectName
                    subProspects {
                        id
                    }
                }
                id
                fullName
                email
                employmentDate
                resignationDate
            }
        }
    }
`;

export const ADD_SELLER = gql `
mutation($input: AddSellerInput){
    addSeller(input: $input){
      seller{
        fullName
        email
        employmentDate
        resignationDate
        }
    }
}
`;

export const DELETE_SELLER = gql `
mutation($input: DeleteSellerInput){
    deleteSeller(input: $input){
        seller{
            id
        }
    }
}
`;

export const EDIT_SELLER = gql `
mutation($input: EditSellerInput){
    EditSeller(input: $input){
        seller{
            id
            fullName
            email
            employmentDate
            resignationDate
        }
    }
}
`;