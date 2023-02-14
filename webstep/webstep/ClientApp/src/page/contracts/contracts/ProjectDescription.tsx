import { useMutation } from '@apollo/client';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditProjectInput } from '../../../api/contract/inputs';
import { EditProjectPayload } from '../../../api/contract/payloads';
import { EDIT_PROJECT, GET_CONSULTANT_CONTRACTS } from '../../../api/contract/queries';
import { Project } from '../../../logic/interfaces';
import { defaultMessagePlacement } from '../../../logic/toast';
import { HourlyRateImage } from '../../../components/images/HourlyRateImage';
import { EditableField } from '../../Utils/EditableField';
import { EditableNumberField } from '../../Utils/EditableNumberField';
import { ImageAndContent } from '../../Utils/ImageAndContent';

interface ProjectDescriptionProps {
    project: Project;
    consultantId: number;
}

const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(80px, 120px) minmax(100px, 150px) minmax(50px, 70px)',
    gridTemplateRows: '15px 1fr',
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
export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ project, consultantId }) => {
    const [editProject] = useMutation<EditProjectPayload, { input: EditProjectInput }>(EDIT_PROJECT, {
        refetchQueries: [
            {
                query: GET_CONSULTANT_CONTRACTS,
                variables: { id: consultantId },
            },
        ],
        awaitRefetchQueries: true,
    });

    const editProjectWrapper = (p: Project) => {
        const { contracts, ...newP } = p; // exclude contracts field
        editProject({ variables: { input: newP } })
            .then((res) => {
                toast.success('Kontrakten ble redigert', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .catch((e) => {
                toast.error('Noe gikk galt ved redigering av kontrakten', {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                console.log(e);
            });
    };

    return (
        <div style={contentStyle}>
            <span style={centeredSpan}>Kunde:</span>
            <span style={centeredSpan}>Prosjekt:</span>
            <span style={centeredSpan}>Timepris:</span>
            <span style={centeredSpan}>
                <EditableField
                    editCallBack={editProjectWrapper}
                    fieldToEdit={project.customerName}
                    fieldName={'customerName'}
                    objectToEdit={project}
                    width={170}
                />
            </span>
            <span style={centeredSpan}>
                <EditableField
                    editCallBack={editProjectWrapper}
                    fieldToEdit={project.projectName}
                    fieldName={'projectName'}
                    objectToEdit={project}
                    width={170}
                />
            </span>

            <span style={centeredSpan}>
                <ImageAndContent image={<HourlyRateImage widthAndHeightPx={20} />} extraSpaceBetween={true}>
                    <EditableNumberField
                        displayText={project.hourlyRate.toString() + 'kr/t'}
                        objectToEdit={project}
                        fieldToEdit={project.hourlyRate.toString()}
                        fieldName={'hourlyRate'}
                        editCallBack={editProjectWrapper}
                        width={65}
                    />
                </ImageAndContent>
            </span>
        </div>
    );
};