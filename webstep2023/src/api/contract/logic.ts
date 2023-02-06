import { getCurrentWeek } from '../../logic/dateFunctions';
import { Contract } from '../../logic/interfaces';
import { AddContractInput, AddVacancyInput, EditContractInput, EditVacancyInput } from './inputs';
import { Vacancy } from './types';

export const getEditContractInput = (c: Contract) => {
    let input: EditContractInput = {
        id: c.id,
        start: { week: c.startWeek, year: c.startYear },
        end: { week: c.endWeek, year: c.endYear },
        daysOfWeek: c.daysOfWeek,
    };

    return input;
};

export const getDefaultNewContract = (projectId: number) => {
    let currentWeek = getCurrentWeek();
    let currentYear = new Date().getFullYear();

    let defaultContract: AddContractInput = {
        projectId: projectId,
        daysOfWeek: 3,
        start: { week: currentWeek, year: currentYear },
        end: { week: currentWeek + 4, year: currentYear }, //TODO: Handle case where +4 moves to new year
    };

    return defaultContract;
};

export const getEditVacancyInput = (vacancy: Vacancy): EditVacancyInput => {
    let input: EditVacancyInput = {
        id: vacancy.id,
        daysOfWeek: vacancy.daysOfWeek,
        planned: vacancy.planned,
        start: { week: vacancy.startWeek, year: vacancy.startYear },
        end: { week: vacancy.endWeek, year: vacancy.endYear },
    };

    return input;
};

export const getDefaultAddVacancyInput = (planned: boolean, consultantId: number): AddVacancyInput => {
    let currentYear = new Date().getFullYear();
    let startWeek = getCurrentWeek() + 1;
    let daysOfWeek = 5;
    let endWeek = startWeek > 48 ? Math.abs(startWeek - 52) : startWeek + 4; // should be tested
    let endYear = endWeek === startWeek + 4 ? currentYear : currentYear + 1;
    let input: AddVacancyInput = {
        consultantId: consultantId,
        daysOfWeek: daysOfWeek,
        planned: planned,
        start: { week: startWeek, year: currentYear },
        end: { week: endWeek, year: endYear },
    };
    return input;
};
