import { Consultant } from '../../logic/interfaces';

export interface Capacity {
    week: number;
    days: number;
}
export interface ConsultantCapacity {
    consultant: Consultant;
    capacity: Capacity[];
}

export interface Vacancy {
    id: number;
    planned: boolean;
    daysOfWeek: number;
    startYear: number;
    startWeek: number;
    endYear: number;
    endWeek: number;
}
