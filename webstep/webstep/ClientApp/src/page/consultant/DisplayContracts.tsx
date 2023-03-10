import React from 'react';
import { Project } from '../../logic/interfaces';

interface Projects {
    project: Project[];
}

const getContractElements = (projects: Project[]): JSX.Element => {
    return (
        <>
            {projects.map((project) => (
                <div key={'Project_Container_' + project.id} className='container-sub-element'>
                    <p key={'Project_Customer_' + project.id}>Kunde: {project.customerName}</p>
                    <p key={'Project_Name_' + project.id}>Prosjektnavn: {project.projectName}</p>
                </div>
            ))}
        </>
    );
};

export const DisplayProjects: React.FC<Projects> = ({ project }) => {
    let noContractMessage = <p className='container-sub-element'>Konsulenten er ikke på et prosjekt.</p>;

    return (
        <div className='display-projects'>
            {project.length > 0 ? getContractElements(project) : noContractMessage}
        </div>
    );
};