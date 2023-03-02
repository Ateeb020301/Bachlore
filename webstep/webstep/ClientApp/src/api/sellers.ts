import { gql } from '@apollo/client';
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
                    customerName
                    projectName
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
