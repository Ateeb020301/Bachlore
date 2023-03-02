export interface SellerProspects {
    id: number;
    fullName: string;
    prospects: Prospect[];
}

export interface Prospect {
    id: number;
    customerName: string;
    projectName: string;
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
    customerName: string;
}

export interface Team {
    id: number;
    teamName: string;
}

export interface Seller {
    id: number;
    fullName: string;
    email: string;
    employmentDate: string;
    resignationDate: any;
}

export interface SellerJustProspects {
    id: number;
    prospects: Prospect[];
}

export interface Contract {
    id: number;
    project: Project[];
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
    project: Project[];
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
