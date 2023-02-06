import { getCurrentWeek } from '../../logic/dateFunctions';
import { NewSubProspect, SubProspect } from '../../logic/interfaces';
import { AddSubProspectInput, EditSubProspectInput } from './inputs';

export const getEditSubProspectInput = (p: SubProspect): EditSubProspectInput => {
    let editInput: EditSubProspectInput = {
        id: p.id,
        probability: p.probability,
        numOfConsultants: p.numOfConsultants,
        start: { year: p.startYear, week: p.startWeek },
        end: { year: p.endYear, week: p.endWeek },
    };

    return editInput;
};

export const getAddSubProspectInput = (p: NewSubProspect): AddSubProspectInput => {
    let addInput: AddSubProspectInput = {
        prospectId: p.prospectId,
        probability: p.probability,
        numOfConsultants: p.numOfConsultants,
        start: { year: p.startYear, week: p.startWeek },
        end: { year: p.endYear, week: p.endWeek },
    };

    return addInput;
};

export const getDefaultNewSubProspect = (prospectId: number): NewSubProspect => {
    let defaultSubProspect: NewSubProspect = {
        prospectId: prospectId,
        probability: 10,
        startYear: new Date().getFullYear(),
        startWeek: getCurrentWeek(),
        endYear: new Date().getFullYear(),
        endWeek: getCurrentWeek() + 4,
        numOfConsultants: 5,
    };

    return defaultSubProspect;
};
