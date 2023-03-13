import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Consultant.css'
import { Box, Button, ButtonBase } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GET_CONSULTANTS_INFO } from '../../api/contract/queries';
import { GetConsultantContractsPayload, GetConsultantItemsContractsPayload } from '../../api/contract/payloads';
import { Loading } from '../Utils/Loading';

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

export const ConsultantDisplay: React.FC = () => {
    const { loading, error, data } = useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);
    console.log(data?.consultants.items)

    return (
        <>
            {!loading && !error && data ? (
                data?.consultants.items.map(
                    (consultant: any) =>
                        consultant != null && (
                            <Box sx={{ display: 'flex', flexBasis: '100%', alignItems: 'center', height: '5vh', justifyContent: 'space-between', background: "#ffffff", boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', py: 2, px: 2, my: 1 }}>

                                <Box sx={{ display: 'flex', padding: '2px', flexBasis: '40%' }}>
                                    {/* Image / First Letter of Name */}
                                    <Box id="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{ border: 'solid', borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', textAlign: 'center' }}>
                                            <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '14px', letterSpacing: '1px' }}>{`${consultant.firstName.substring(0, 1)}${consultant.lastName.substring(0, 1)}` }</p>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                        <p style={pStyleHead}>{`${consultant.firstName} ${consultant.lastName}`}</p>
                                        <p style={pStyleUnder}>{consultant.resignationDate != null ? (`${consultant.employmentDate} to ${consultant.resignationDate}`) : (`${consultant.employmentDate}`)}</p>
                                    </Box>

                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexBasis: '30%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: 'dotted', borderColor: '#f4f7f6', borderWidth: 'thin', flex: 1 }}>
                                        <p style={pStyleHead}>{ consultant.workdays } / 7</p>
                                        <p style={pStyleUnder}>Workdays</p>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <p style={pStyleHead}>{ consultant.contracts.length }</p>
                                        <p style={pStyleUnder}>Total Contracts</p>
                                    </Box>
                                </Box>

                                <Box>
                                    <Button sx={{ color: 'black', background: '#f2f6f8', ":hover": { background: '#cfd1d4' }, textTransform: 'none', fontWeight: '400', fontSize: '14px', display: 'flex', px: 2, py: 1, alignItems: 'center'}} size="small" disableRipple disableFocusRipple>
                                        View Profile
                                    </Button>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ButtonBase sx={{ color: '#8093e6' }} disableRipple disableTouchRipple><MoreHorizIcon fontSize='small' /></ButtonBase>
                                </Box>

                            </Box>
                        )
                )
            ) : (
                <Loading />
            )}
        </>
    );
};