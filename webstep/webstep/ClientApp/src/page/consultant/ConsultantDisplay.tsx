import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Consultant.css'
import { Box, Button, ButtonBase, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DELETE_CONTRACT, GET_CONSULTANTS_INFO, GET_TEAMCONS_CONTRACTS } from '../../api/contract/queries';
import { GetConsultantContractsPayload, GetConsultantItemsContractsPayload } from '../../api/contract/payloads';
import { Loading } from '../Utils/Loading';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE_CONSULTANT, DELETE_PROJECTCONSULTANT } from '../../api/consultants';
import { Consultant, ConsultantWithContracts } from '../../logic/interfaces';
import { DisplayConsultant } from './DisplayConsultants';
import { ModalEditConsultant } from './ModalEditConsultant';

const pStyleHead = {
    color: '#495057',
    fontWeight: 600,
    fontSize: '16px',
    letterSpacing: '.05rem',
    margin: 0,
    marginBottom: '3px',
    padding: 0

}

const pStyleUnder = {
    color: '#b5abaf',
    fontWeight: 400,
    fontSize: '13px',
    letterSpacing: '.05rem',
    margin: 0,
    padding: 0
}

let consultantEdit: Consultant = {
    id: 0,
    firstName: '',
    lastName: '',
    employmentDate: '',
    resignationDate: null,
    workdays: 0,
};

interface ConsultantDisplayContainerProps {
    consultant: Consultant;
}

export const ConsultantDisplay: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => setModalState(!isModalOpen);

    const { loading, error, data } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);

    const openModal = (consultant: Consultant) => {
        consultantEdit = consultant;
        toggleModal();
    }

    console.log(data);

    return (
        <>
            {!loading && !error && data ? (
                data?.consultants.items.map(
                    (consultant: any) =>
                        consultant != null && (
                            <DisplayConsultant consultant={consultant} key={`consultant_${consultant.id}`} />
                        )
                )
            ) : (
                <Loading />
            )}
        </>
    );
};