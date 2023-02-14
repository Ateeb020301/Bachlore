import React from 'react';
import './contracts.css';
import { FullPageContent } from '../Utils/FullPageContent';
import { ContractCalendarContainer } from './contracts/ContractCalendarContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contracts: React.FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '87vw', height: '100%'}}>
            <div style={{width: '100%'}}>
                <h2>Belegg</h2>
            </div>
            <ContractCalendarContainer/>
            <ToastContainer />
            
        </div>
    );
};