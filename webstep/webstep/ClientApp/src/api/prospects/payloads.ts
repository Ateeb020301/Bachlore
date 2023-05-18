import { Seller, SellerJustProspects } from '../../logic/interfaces';
import { Prospect, SellerProspects } from '../../logic/interfaces';


export interface Sellers {
    items: SellerInterface[];
}

export interface SellerInterface {
    prospects: Prospect[];
    id: number;
    fullName: string;
    email: string;
    employmentDate: string;
    resignationDate?: any;
}

export interface AddProspectPayload {
    addProspect: { prospect: { id: number } };
}
export interface AddSubProspectPayload {
    addSubProspect: { subProspect: { id: number } };
}

export interface EditProspectPayload {
    editProspect: { prospect: { id: number } };
}

export interface EditSubProspectPayload {
    editSubProspect: { subProspect: { id: number } };
}

export interface GetAllSellerProspectsPayload {
    sellers: { items: SellerProspects[] };
}

export interface GetProspectsPayload {
    prospects: { items: Prospect[] };
}

export interface GetSellerIDsPayload {
    sellers: { items: [{ id: number }] };
}
export interface GetSellerPayload {
    sellers: SellerInterface[];
}

export interface GetSellerNamesPayload {
    sellers: { items: [{ id: string; fullName: string }] };
}

export interface GetSellersPayload {
    sellers: Sellers;
}

export interface GetSellerProspectsPayload {
    seller: SellerJustProspects[];
}

