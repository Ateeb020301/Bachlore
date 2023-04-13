import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'reactstrap';
import { ModalAddProspect } from './ModalAddProspect';

interface CreateProspectButtonProps {
    customerId: number;
    sellerId: number;
}

export const CreateProspectButton: React.FC<CreateProspectButtonProps> = ({ sellerId, customerId}) => {
    const [isModalProspectOpen, setState] = React.useState(false);

    const toggleAddprospect = () => setState(!isModalProspectOpen);
    return (
        <>
              <Button onClick={toggleAddprospect} size='sm' color='primary'>
                + prospekt
            </Button>
            
            <ModalAddProspect
                title={'Edit Seller'}
                isOpen={isModalProspectOpen}
                onClose={toggleAddprospect}
                sellerId={sellerId}
                customerId={customerId}
            />
        </>
          
    );
};

// const getDefaultProspect = (sellerId: number, customerId:number) => {
//     let projectName = 'Prosjektnavn';
//     customerId = 0;
//     let defaultProspect: AddProspectInput = {
//         projectName: projectName,
//         customerId: customerId,
//         sellerId:sellerId,
//         id: 0
//     };
//     return defaultProspect;
// };

// const getDefaultSubProspect = (prospectId: number) => {
//     let currentDate: any = new Date();
//     let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
//     var days = Math.floor((currentDate - startDate) /
//         (24 * 60 * 60 * 1000));
         
//     var weekNumber = Math.ceil(days / 7);

//     let currentWeek = getCurrentWeek();
//     let currentYear = new Date().getFullYear();
//     let prospectDurationInWeeks = 3;

//     let probability = 30;
//     let workdays = 5;

//     let defaultSubProspect: AddSubProspectInput = {
//         prospectId: prospectId,
//         probability: probability,
//         numOfConsultants: workdays,
//         start: { year: currentYear, week: weekNumber },
//         end: { year: currentYear, week: weekNumber + prospectDurationInWeeks },
//     };

//     return defaultSubProspect;
// };
