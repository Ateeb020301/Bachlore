import { WeekYear } from '../prospects/types';

export interface GetConsultantCapacityInput {
    year: number;
}

export interface GetConsultantContractsInput {
    id: number;
}

export interface GetConsultantVacancyInput {
    id: number;
}
export interface EditContractInput {
    id: number;
    start: WeekYear;
    end: WeekYear;
    daysOfWeek: number;
}

export interface AddProjectInput {
    consultantId: number;
    projectName: string;
    hourlyRate: number;
    customerName: string;
}

export interface EditProjectInput {
    id: number;
    customerName: string;
    projectName: string;
    hourlyRate: number;
}

export interface AddContractInput {
    projectId: number;
    start: WeekYear;
    end: WeekYear;
    daysOfWeek: number;
}

export interface EditVacancyInput {
    id: number;
    planned: boolean;
    daysOfWeek: number;
    start: WeekYear;
    end: WeekYear;
}

export interface AddVacancyInput {
    consultantId: number;
    daysOfWeek: number;
    planned: boolean;
    start: WeekYear;
    end: WeekYear;
}
