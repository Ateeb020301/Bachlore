import { gql } from '@apollo/client';
import { Project } from '../../logic/interfaces';

export interface GetProjectItemsPayload {
    projects: { items: Project[] }
}
export const GET_CONSULTANT_CAPACITY = gql`
    query GetConsultantCapacity($startYear: Int!, $endYear: Int!, $id: Int!) {
        consultantsCapacity(startYear: $startYear, endYear: $endYear, consultantId: $id) {
            items {
                consultant {
                    id
                    firstName
                    lastName
                    employmentDate
                    resignationDate
                    workdays
                }
                capacity {
                    week
                    days
                }
            }
        }
    }
`;

export const GET_CONSULTANT_VACANCY = gql`
    query GetConsultantVacancy($id: Int!) {
        consultant(id: $id) {
            vacancies {
                id
                daysOfWeek
                planned
                startYear
                startWeek
                endYear
                endWeek
            }
        }
    }
`;

export const GET_CONSULTANT_IDS = gql`
    query {
        consultants {
            items {
                id
            }
        }
    }
`;

export const GET_CONSULTANTS_INFO = gql`
    query {
        consultants {
            items {
                id
                firstName
                lastName
                employmentDate
                resignationDate
                workdays
                projectConsultants {
                    id
                }
                contracts {
                    id
                    startYear
                    startWeek
                    endYear
                    endWeek
                    hourlyRate
                    daysOfWeek
                }
            }
        }
    }
`;

export const GET_CONSULTANT = gql`
    query GetConsultant($id: Int!) {
        consultant(id: $id) {
            id
            firstName
            lastName
            employmentDate
            resignationDate
            workdays
            projectConsultants {
                id
            }
            contracts {
                id
                startYear
                startWeek
                endYear
                endWeek
                hourlyRate
                daysOfWeek
            }
        }
    }
`;

export const GET_PROJECTCONSULTANT_IDS = gql`
    query {
        consInTeams {
            id   
            contracts {
                project {
                    id
                }
            }
        }
    }
`;

export const GET_TEAMCONS_CONTRACTS = gql`
    query GetTeamConsContracts($id: Int!) {
      projectConsultants(id: $id) {
          id
          customerName
          projectName
          contracts(id: $id) {
            consultant {
              id
            }
            project {
              id
            }
            id
            startYear
            startWeek
            endYear
            endWeek
            daysOfWeek
            hourlyRate
          }
        }
    }
`;
export const GET_PROJECTS = gql`
    query GetProjects($skipAmount: Int! $takeAmount: Int!) {
        projects(skip: $skipAmount take: $takeAmount) {
            items {
                id
                projectName
                customerName
            }
        }
    }
`;

export const GET_PROJECTCONSULTANT = gql`
    query {
        projectConsultant(id:$id){
            id
            project{
              id
              projectName
              customerName
            }
            consultant{
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
export const GET_PROJECTCONSULTANTS = gql`
query {
    projectConsultants{
            id
            project{
              id
              customerName
              projectName
            }
            consultant{
              id
              firstName
              lastName
              resignationDate
              employmentDate
              workdays
            }
        }
    }
`;




export const GET_CONSULTANT_CONTRACT = gql`
    query GetConsultantContracts($id: Int!) {
          consultantContracts(id: $id) {
            items {
              id
              startYear
              startWeek
              endYear
              endWeek
              daysOfWeek
              hourlyRate
              project {
                  id
              }
            }
          }
    }
`;


export const EDIT_CONTRACT = gql`
    mutation EditContract($input: EditContractInput) {
        editContract(input: $input) {
            contract {
                id
            }
        }
    }
`;

export const DELETE_CONTRACT = gql`
    mutation DeleteContract($input: DeleteContractInput) {
        deleteContract(input: $input) {
            contract {
                id
            }
        }
    }
`;

export const ADD_PROJECT = gql`
    mutation AddProject($input: AddProjectInput) {
        addProject(input: $input) {
            project {
                id
            }
        }
    }
`;

export const ADD_PROJECTCONSULTANT = gql`
    mutation AddProjectConsultant($input: AddProjectConsultantInput) {
        addProjectConsultant(input: $input) {
            projectconsultant {
                id
            }
        }
    }
`;

export const EDIT_PROJECT = gql`
    mutation EditProject($input: EditProjectInput) {
        editProject(input: $input) {
            project {
                id
            }
        }
    }
`;

export const ADD_CONTRACT = gql`
    mutation AddContract($input: AddContractInput) {
        addContract(input: $input) {
            contract {
                id
            }
        }
    }
`;

export const EDIT_VACANCY = gql`
    mutation EditVacancy($input: EditVacancyInput) {
        editVacancy(input: $input) {
            vacancy {
                id
            }
        }
    }
`;

export const DELETE_VACANCY = gql`
    mutation DeleteVacancy($input: DeleteVacancyInput) {
        deleteVacancy(input: $input) {
            vacancy {
                id
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation DeleteProject($input: DeleteProjectInput) {
        deleteProject(input: $input) {
            project {
                id
            }
        }
    }
`;
export const DELETE_PROJECTCONSULTANT = gql`
    mutation DeleteProjectConsultant($input: DeleteProjectInput) {
        deleteProjectConsultant(input: $input) {
            projectConsultant {
                id
            }
        }
    }
`;

export const ADD_VACANCY = gql`
    mutation AddVacancy($input: AddVacancyInput) {
        addVacancy(input: $input) {
            vacancy {
                id
            }
        }
    }
`;
