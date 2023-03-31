import { Project, ProjectConsultant} from '../../logic/interfaces';
import { Vacancy, ConsultantCapacity } from './types';

// Custom base interfaces for contract/consultant api calls
export interface Consultant {
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
    projectConsultants: ProjectConsultant[];
    contracts: Contract[];
}

interface Contract {
    id: number;
    project: Project[];
    consultant: Consultant;
    startYear: number;
    startWeek: number;
    endYear: number;
    endWeek: number;
    daysOfWeek: number;
    hourlyRate: number;
}
export interface GetProjectConsultantPayload {
    projectConsultant: { items: ProjectConsultant[] };
}
export interface GetConsultantCapacityPayload {
    consultantsCapacity: { items: ConsultantCapacity[] };
}

export interface GetConsultantVacancyPayload {
    consultant: [
        {
            vacancies: Vacancy[];
        }
    ];
}

export interface GetConsultantContractsPayload {
    consultant: Consultant[];
}

export interface GetConsultantItemsContractsPayload {
    consultants: { items: Consultant[] }
}


export interface GetTeamContractPayload {
    projectConsultants: [{ projects: [Project]}]
;
}

export interface GetConsultantContractPayload {
    consultantContracts: { items: [{ contracts: Contract }] };
}

export interface EditContractPayload {
    contract: { id: number };
}

export interface GetConsultantIDsPayload {
    consultants: { items: [{ id: number }] };
}

export interface GetProjectConsultantIDS {
    consInTeams: [{ id: number }];
}

export interface AddProjectPayload {
    addProject: { project: { id: number } };
}

export interface AddProjectConsultantPayload {
    addProjectConsultant: { projectconsultant: { id: number } };
}

export interface EditProjectPayload {
    editProject: { project: { id: number } };
}

export interface AddContractPayload {
    contract: { id: number };
}

export interface EditVacancyPayload {
    vacancy: { id: number };
}

export interface AddVacancyPayload {
    vacancy: { id: number };
}
