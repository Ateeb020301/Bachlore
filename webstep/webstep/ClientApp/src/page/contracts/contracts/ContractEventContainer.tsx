import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditContractInput } from '../../../api/contract/inputs';
import { getEditContractInput } from '../../../api/contract/logic';
import { EditContractPayload } from '../../../api/contract/payloads';
import {
    DELETE_CONTRACT,
    EDIT_CONTRACT,
    GET_CONSULTANT_CAPACITY,
    GET_CONSULTANT_CONTRACTS,
} from '../../../api/contract/queries';
import { constants } from '../../../logic/constants';
import { Contract } from '../../../logic/interfaces';
import { defaultMessagePlacement } from '../../../logic/toast';
import { ContractEventContent } from './ContractEventContent';
import { Eventable, CalendarEvent } from '../../CalendarSystem/CalendarEvent';

interface ContractEventContainerProps {
    contract: Contract;
    consultantId: number;
}

export const ContractEventContainer: React.FC<ContractEventContainerProps> = ({ contract, consultantId }) => {
    // The order of queries matter here: capacity before contracts cause a flickering on re-rendering
    const [editContract] = useMutation<EditContractPayload, { input: EditContractInput }>(EDIT_CONTRACT, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_CONTRACTS,
                variables: { id: consultantId },
            },
            {
                query: GET_CONSULTANT_CAPACITY,
                variables: { startYear: constants.currentYear, endYear: constants.currentYear + 2, id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const [deleteContract] = useMutation<number, { input: { id: number } }>(DELETE_CONTRACT, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_CONTRACTS,
                variables: { id: consultantId },
            },
            {
                query: GET_CONSULTANT_CAPACITY,
                variables: { startYear: constants.currentYear, endYear: constants.currentYear + 2, id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const editPlacement = (input: Eventable) => {
        let newContract: EditContractInput = {
            id: contract.id,
            start: { week: input.startWeek, year: input.startYear },
            end: { week: input.endWeek, year: input.endYear },
            daysOfWeek: contract.daysOfWeek,
        };
        editContract({ variables: { input: newContract } })
            .then((res) => {
                toast.success('Kontrakten ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av kontrakt', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };

    const editContractWrapper = (c: Contract) => {
        let newContract: EditContractInput = getEditContractInput(c);

        editContract({ variables: { input: newContract } })
            .then((res) => {
                toast.success('Kontrakten ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av kontrakt', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };

    const deleteContractWrapper = async () => {
        deleteContract({ variables: { input: { id: contract.id } } })
            .then((res) => {
                toast.success('Kontrakten ble slettet', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <CalendarEvent
            eventObj={contract}
            color={constants.eventColor}
            render={<ContractEventContent contract={contract} editCallBack={editContractWrapper} />}
            editPlacement={editPlacement}
            deleteSelf={deleteContractWrapper}
        />
    );
};
