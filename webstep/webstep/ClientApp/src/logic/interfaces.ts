import { Prospects } from "../page/prospect/Prospects/ProspectDescription";

export interface SellerProspects {
    id: number;
    fullName: string;
    prospects: Prospect[];
}

export interface Prospect {
    id: number;
    projectName: string;
    customer: Customer;
    subProspects: SubProspect[];
}
export interface SubProspect {
    id: number;
    probability: number;
    numOfConsultants: number;
    startYear: number;
    startWeek: number;
    endYear: number;
    endWeek: number;
}

export interface NewSubProspect {
    probability: number;
    numOfConsultants: number;
    prospectId: number;
    startYear: number;
    startWeek: number;
    endYear: number;
    endWeek: number;
}

export interface NewProspect {
    sellerId: number;
    projectName: string;
    customerId: number;
}

export interface Team {
    id: number;
    teamName: string;
}

export interface TeamConsultant {
    id: number;
    team: Team[];
    consultant: Consultant[];
}

export interface Seller {
    id: number;
    fullName: string;
    email: string;
    employmentDate: string;
    resignationDate?: any;
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    adresse: string;
    tlf: string;
}

export interface SellerJustProspects {
    id: number;
    prospects: Prospects[];
}

export interface Contract {
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

export interface ContractNoProject {
    id: number;
    description: string;
    startYear: number;
    startWeek: number;
    endYear: number;
    endWeek: number;
    hourlyRate: number;
    daysOfWeek: number;
}

export interface Project {
    contracts: Contract[];
    id: number;
    customerName: string;
    projectName: string;
    team: Team[];
    hourlyRate: number;
}

export interface Consultant {
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;  
}

export interface ConsultantWithContracts {
    contracts: Contract[];
    teamConsultants: TeamConsultant[];
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: string;
    resignationDate?: any;
    workdays: number;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

