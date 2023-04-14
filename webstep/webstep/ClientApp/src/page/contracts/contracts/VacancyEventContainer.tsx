import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditVacancyInput } from '../../../api/contract/inputs';
import { getEditVacancyInput } from '../../../api/contract/logic';
import { EditVacancyPayload } from '../../../api/contract/payloads';
import { DELETE_VACANCY, EDIT_VACANCY, GET_CONSULTANT_VACANCY } from '../../../api/contract/queries';
import { Vacancy } from '../../../api/contract/types';
import { defaultMessagePlacement } from '../../../logic/toast';
import { VacancyEventContent } from './VacancyEventContent';
import { Eventable, CalendarEvent } from '../../CalendarSystem/CalendarEvent';

interface VacancyEventContainerProps {
    vacancy: Vacancy;
    consultantId: number;
}

export const VacancyEventContainer: React.FC<VacancyEventContainerProps> = ({ vacancy, consultantId }) => {
    const [editVacancy] = useMutation<EditVacancyPayload, { input: EditVacancyInput }>(EDIT_VACANCY, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_VACANCY,
                variables: { id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const [deleteVacancy] = useMutation<number, { input: { id: number } }>(DELETE_VACANCY, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_VACANCY,
                variables: { id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });
    const editVacancyWrapper = (v: Vacancy) => {
        let input = getEditVacancyInput(v);
        editVacancy({ variables: { input: input } })
            .then((res) => {
                toast.success('Fravær ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved regidering av kontrakten', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };
    const editPlacement = (input: Eventable) => {
        let newVacancy: EditVacancyInput = {
            id: vacancy.id,
            daysOfWeek: vacancy.daysOfWeek,
            start: { week: input.startWeek, year: input.startYear },
            end: { week: input.endWeek, year: input.endYear },
            planned: vacancy.planned,
        };
        editVacancy({ variables: { input: newVacancy } })
            .then((res) => {
                toast.success('Fraværet ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.success('Noe gikk galt ved redigering av kontrakten', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            });
    };

    const deleteVacancyWrapper = () => {
        deleteVacancy({ variables: { input: { id: vacancy.id } } })
            .then((res) => {
                toast.success('Fraværet ble slettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <CalendarEvent
            eventObj={vacancy}
            color={'lightgrey'}
            render={<VacancyEventContent vacancy={vacancy} editCallback={editVacancyWrapper} />}
            editPlacement={editPlacement}
            deleteSelf={deleteVacancyWrapper}
        />
    );
};
