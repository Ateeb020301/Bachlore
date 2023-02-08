import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { EditProspectInput } from '../../../api/prospects/inputs';
import { EditProspectPayload } from '../../../api/prospects/payloads';
import { EDIT_PROSPECT, GET_SELLER_PROSPECTS } from '../../../api/prospects/queries';
import { Prospect } from '../../../logic/interfaces';
import { defaultMessagePlacement } from '../../../logic/toast';
import { EditableField } from '../../Utils/EditableField';

interface ProspectDescriptionProps {
    prospect: Prospect;
    sellerId: number;
}

const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 150px) minmax(100px, 150px)', //modified
    gridTemplateRows: '15px 1fr',
    paddingLeft: '40px',
    paddingTop: '5px',
    fontSize: 12,
    height: '100%',
    width: '100%',
    backgroundImage: 'linear-gradient(to left, white , #F1F1F1)',
    borderBottom: '1px solid grey',
    borderRight: '1px solid grey',
    overflow: 'hidden',
};
const centeredSpan = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
};

export const ProspectDescription: React.FC<ProspectDescriptionProps> = ({ prospect, sellerId }) => {
    const [editProspect] = useMutation<EditProspectPayload, { input: EditProspectInput }>(EDIT_PROSPECT, {
        refetchQueries: [
            {
                query: GET_SELLER_PROSPECTS,
                variables: { id: sellerId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const editFunctionWrapper = (p: Prospect) => {
        let input: EditProspectInput = { id: p.id, customerName: p.customerName, projectName: p.projectName };
        editProspect({ variables: { input: input } })
            .then((res) => {
                toast.configure();
                toast.success('Prospektet ble redigert.', defaultMessagePlacement);
            })
            .catch((e) => {
                toast.configure();
                toast.error('Noe gikk galt med redigering av prospektet.', defaultMessagePlacement);
            });
    };
    return (
        <div style={contentStyle}>
            <span style={centeredSpan}>Kunde:</span>
            <span style={centeredSpan}>Prosjekt:</span>
            <span style={centeredSpan}>
                <EditableField
                    objectToEdit={prospect}
                    fieldName={'customerName'}
                    fieldToEdit={prospect.customerName}
                    editCallBack={editFunctionWrapper}
                    width={70}
                />
            </span>
            <span style={centeredSpan}>
                {' '}
                <EditableField
                    objectToEdit={prospect}
                    fieldName={'projectName'}
                    fieldToEdit={prospect.projectName}
                    editCallBack={editFunctionWrapper}
                    width={70}
                />
            </span>
        </div>
    );
};
