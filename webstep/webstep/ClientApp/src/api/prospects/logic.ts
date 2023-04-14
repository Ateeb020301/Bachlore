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
    let currentDate: any = new Date();
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    var weekNumber = Math.ceil(days / 7);
    let defaultSubProspect: NewSubProspect = {
        prospectId: prospectId,
        probability: 10,
        startYear: new Date().getFullYear(),
        startWeek: weekNumber,
        endYear: new Date().getFullYear(),
        endWeek: weekNumber + 4,
        numOfConsultants: 5,
    };

    return defaultSubProspect;
};
