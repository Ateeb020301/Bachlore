import { WeekYear } from './types';

export interface AddProspectInput {
    sellerId: number;
    customerName: string;
    projectName: string;
}
export interface AddSubProspectInput {
    prospectId: number;
    probability: number;
    numOfConsultants: number;
    start: WeekYear;
    end: WeekYear;
}

export interface EditProspectInput {
    id: number;
    customerName: string;
    projectName: string;
}

export interface EditSubProspectInput {
    id: number;
    probability: number;
    numOfConsultants: number;
    start: WeekYear;
    end: WeekYear;
}

