import { Prospects } from "../page/prospect/Prospects/ProspectDescription";

export interface SellerProspects {
    id: number;
    fullName: string;
    prospects: Prospect[];
}

export interface Prospect {
    id: number;
    projectName: string;
    seller: Seller;
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

export interface ProjectConsultant {
    id: number;
    project: Project;
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
    projectConsultants: ProjectConsultant[];
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

