import { gql } from '@apollo/client';

export interface AddConsultantPayload {
    addConsultant: { consultant: { id: number } };
}

export interface EditConsultantPayload {
    editConsultant: { consultant: { id: number } };
}

export interface DeleteConsultantPayload {
    deleteConsultant: { consultant: { id: number } };
}

export const ADD_CONSULTANT = gql`
    mutation($input: AddConsultantInput) {
        addConsultant(input: $input) {
            consultant {
                firstName
                lastName
                employmentDate
                resignationDate
                workdays
            }
        }
    }
`;

export const GET_CONSULTANT = gql`
    query {
        consultants {
            items {
                id
                firstName
                lastName
                employmentDate
                resignationDate
                workdays
            }
        }
    }
`;

export const GET_CONSULTANTS = gql`
query GetConsultant($skipAmount: Int!, $takeAmount: Int!) {
    consultants(skip: $skipAmount, take: $takeAmount) {
      items {
        projects {
          id
          customerName
          projectName
          contracts {
            id
            endYear
            endWeek
            daysOfWeek
          }
        }
        id
        firstName
        lastName
        employmentDate
        resignationDate
      }
    }
  }  
`;
export const GET_SINGLECONSULTANTS = gql`
query GetSingleConsultant($id: Int!) {
    consultant(id: $id) {
		projectConsultants {
            project {
                id
                customerName
                projectName
                contracts(id: $id) {
                    consultant {
                      id
                    }
                    id
                }
            }
        }
    }
  }  
`;

export const DELETE_CONSULTANT = gql`
    mutation($input: DeleteConsultantInput) {
        deleteConsultant(input: $input) {
            consultant {
                id
            }
        }
    }
`;
export const DELETE_PROJECTCONSULTANT = gql`
    mutation($input: DeleteProjectConsultantInput) {
        deleteProjectConsultant(input: $input) {
            projectconsultant {
                id
            }
        }
    }
`;


export const EDIT_CONSULTANT = gql`
    mutation EditConsultant($input: EditConsultantInput) {
        editConsultant(input: $input) {
            consultant {
                id
            }
        }
    }
`;
