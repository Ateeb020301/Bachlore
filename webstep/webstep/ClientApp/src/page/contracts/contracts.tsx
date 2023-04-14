import React from 'react';
import './contracts.css';
import { ContractCalendarContainer } from './contracts/ContractCalendarContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contracts: React.FC = () => {
    return (
        <div style={{maxWidth: '80vw', height: '100%', overflow: 'hidden'}}>
            <div style={{width: '100%'}}>
                <h2>Belegg</h2>
            </div>
            <ContractCalendarContainer/>
            <ToastContainer />
            
        </div>
    );
};