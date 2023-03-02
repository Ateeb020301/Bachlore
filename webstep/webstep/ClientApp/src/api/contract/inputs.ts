import { Contract } from '../../logic/interfaces';
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
    hourlyRate: number;
}

export interface AddProjectInput {
    projectName: string;
    customerName: string;
    teamId: number;
}

export interface AddTeamConsultantInput {
    teamId: number;
    consultantId: number;
}

export interface EditProjectInput {
    id: number;
    customerName: string;
    projectName: string;
}

export interface AddContractInput {
    projectId: number;
    start: WeekYear;
    end: WeekYear;
    daysOfWeek: number;
    hourlyRate: number;
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
