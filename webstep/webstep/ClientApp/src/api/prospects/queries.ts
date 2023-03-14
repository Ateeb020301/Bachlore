import { gql } from '@apollo/client';

export const GET_SELLER_IDS = gql`
    query GetSellerIDs {
        sellers {
            items {
                id
            }
        }
    }
`;

export const GET_SELLER_NAMES = gql`
    query GetSellersWithNames {
        sellers {
            items {
                id
                fullName
            }
        }
    }
`;

export const GET_SELLER_PROSPECTS = gql`
    query GetSellerProspects($id: Int!) {
        seller(id: $id) {
            id
            prospects {
                id
                customerName
                projectName
                subProspects {
                    id
                    probability
                    numOfConsultants
                    startYear
                    startWeek
                    endYear
                    endWeek
                }
            }
        }
    }
`;
export const GET_PROSPECTS = gql`
    query {
        prospects {
            items {
                id
                customerName
                projectName
                subProspects {
                    id
                    probability
                    numOfConsultants
                    startYear
                    startWeek
                    endYear
                    endWeek
                }
            }
        }
    }
`;

export const GET_ALL_SELLER_PROSPECTS = gql`
    query {
        sellers {
            items {
                id
                fullName
                prospects {
                    id
                    customerName
                    projectName
                    subProspects {
                        id
                        probability
                        numOfConsultants
                        startYear
                        startWeek
                        endYear
                        endWeek
                    }
                }
            }
        }
    }
`;

export const EDIT_PROSPECT = gql`
    mutation EditProspect($input: EditProspectInput) {
        editProspect(input: $input) {
            prospect {
                id
            }
        }
    }
`;

export const EDIT_SUBPROSPECT = gql`
    mutation EditSubProspect($input: EditSubProspectInput) {
        editSubProspect(input: $input) {
            subProspect {
                id
            }
        }
    }
`;
export const ADD_PROSPECT = gql`
    mutation AddProspect($input: AddProspectInput) {
        addProspect(input: $input) {
            prospect {
                id
            }
        }
    }
`;

export const ADD_SUBPROSPECT = gql`
    mutation AddSubProspect($input: AddSubProspectInput) {
        addSubProspect(input: $input) {
            subProspect {
                id
            }
        }
    }
`;

export const DELETE_SUBPROSPECT = gql`
    mutation DeleteSubProspect($input: DeleteSubProspectInput) {
        deleteSubProspect(input: $input) {
            subProspect {
                id
            }
        }
    }
`;
export const DELETE_PROSPECT = gql`
    mutation DeleteProspect($input: DeleteProspectInput) {
        deleteProspect(input: $input) {
            prospect {
                id
            }
        }
    }
`;
export const ON_PROSPECT_ADDED = gql`
    subscription OnProspectAdded {
        onProspectAdded {
            id
        }
    }
`;
