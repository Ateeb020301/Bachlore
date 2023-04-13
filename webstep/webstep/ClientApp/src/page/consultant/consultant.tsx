import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from 'react-toastify';
import { Box, Breadcrumbs, Link } from '@mui/material';
import './Consultant.css';
import { ConsultantContainer } from './ConsultantContainer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ConsultantDisplay } from './ConsultantDisplay';


export const Consultant = () => {

    const breadcrumbs = [
        <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Link
            underline="none"
            fontSize="12px"
            key="2"
            color="inherit">
            Form
        </Link>,
        <Link
            underline="none"
            fontSize="12px"
            key="3"
            color="inherit">
            Add Consultant
        </Link>,
    ];

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',flex: 1, mx: 1, mt:1, color: 'black', fontWeight: '950', letterSpacing: '.5px', fontSize: '14px' }}>
                <Box>
                    CONSULTANT
                </Box>
                <Box>
                    <Breadcrumbs separator={<KeyboardArrowRightIcon fontSize="inherit" />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Box>
            </Box>

            <Box sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', display: 'flex', my: 1, mx: 1, flexBasis: '100%', flexWrap:'wrap', background: "#ffffff", borderRadius: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
                <ConsultantContainer />
            </Box>
            <Box sx={{ display: 'flex', my: 1, mx: 1, flexBasis: '100%', flexWrap: 'wrap'}}>
                <ConsultantDisplay />
            </Box>
            <ToastContainer />
        </Box>
    )

}