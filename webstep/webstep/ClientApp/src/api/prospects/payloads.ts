import { SellerJustProspects } from '../../logic/interfaces';
import { Prospect, SellerProspects } from '../../logic/interfaces';

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

export interface GetSellerNamesPayload {
    sellers: { items: [{ id: number; fullName: string }] };
}

export interface GetSellerProspectsPayload {
    seller: SellerJustProspects[];
}

