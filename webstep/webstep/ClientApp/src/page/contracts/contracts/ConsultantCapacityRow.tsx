import React from 'react';
import { CalendarTimelineGrid } from '../../CalendarSystem/CalendarTimelineGrid';
import { VacancyEventContainer } from './VacancyEventContainer';
import { generateBoxesThatMatchCapacity } from './CapacityBox';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@apollo/client';
import { GET_CONSULTANT_CAPACITY, GET_CONSULTANT_VACANCY } from '../../../api/contract/queries';
import { GetConsultantCapacityPayload, GetConsultantVacancyPayload } from '../../../api/contract/payloads';
import { GetConsultantVacancyInput } from '../../../api/contract/inputs';
import { constants } from '../../../logic/constants';
import { Loading } from '../../Utils/Loading';
import { CalendarSidebarHeader } from '../../CalendarSystem/CalendarSidebarHeader';
import { CalendarRow } from '../../CalendarSystem/CalendarRow';
import { ButtonGroup } from 'reactstrap';
import { AddVacancyButton } from './AddVacancyButton';
import { CreateContractButton } from './CreateContractButton';
interface ConsultantCapacityRowProps {
    consultantId: number;
}
const overlappingGridStyle = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
};
export const ConsultantCapacityRow: React.FC<ConsultantCapacityRowProps> = React.memo(({ consultantId }) => {
    const { data: cData } = useQuery<GetConsultantCapacityPayload>(GET_CONSULTANT_CAPACITY, {
        variables: { startYear: constants.currentYear, endYear: constants.currentYear + 2, id: consultantId },
        pollInterval: 3000,
    });

    const { data: vData } = useQuery<GetConsultantVacancyPayload, GetConsultantVacancyInput>(GET_CONSULTANT_VACANCY, {
        variables: { id: consultantId },
        pollInterval: 3000,
    });

    const consultant = cData?.consultantsCapacity.items[0].consultant;

    return (
        <CalendarRow
            sidebarContent={
                <CalendarSidebarHeader header={consultant?.firstName + ' ' + consultant?.lastName || '- -'}>
                    <div>
                        <ButtonGroup>
                            <AddVacancyButton consultantId={consultantId} planned={false} />
                            <AddVacancyButton consultantId={consultantId} planned />
                            <CreateContractButton consultantId={consultantId} />
                        </ButtonGroup>
                    </div>
                </CalendarSidebarHeader>
            }
            timelineContent={
                <div style={overlappingGridStyle}>
                    <span style={{ gridColumn: 1, gridRow: 1, width: '100%', height: '100%', zIndex: 10 }}>
                        {cData && (
                            <CalendarTimelineGrid>
                                {generateBoxesThatMatchCapacity(cData.consultantsCapacity.items[0].capacity)}
                            </CalendarTimelineGrid>
                        )}
                    </span>
                    <span style={{ gridColumn: 1, gridRow: 1, width: '100%', height: '100%', zIndex: 20 }}>
                        <CalendarTimelineGrid>
                            {vData && vData.consultant.length > 0 ? (
                                vData.consultant[0].vacancies.map((vacancy) => (
                                    <VacancyEventContainer
                                        vacancy={vacancy}
                                        key={uuidv4()}
                                        consultantId={consultantId}
                                    />
                                ))
                            ) : (
                                <Loading />
                            )}
                        </CalendarTimelineGrid>
                    </span>
                </div>
            }
        />
    );
});
