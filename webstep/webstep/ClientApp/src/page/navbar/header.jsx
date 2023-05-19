import { Box, IconButton } from '@mui/material'
import React, { useEffect } from "react";
import { AuthContainer } from '../auth/AuthContainer';
import { LoginButton } from '../auth/LoginButton';
import { gapi } from 'gapi-script';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import isAuthenticated from '../../utils/auth_check';

const clientId =
  "79575982650-ke51dobd50k5nkf3n1gf91njdltp6ocl.apps.googleusercontent.com";

export const HeaderBar = () => {


    return (
        <Box sx={{display: 'flex', p: 3, background: '#fefeff', flex: 1, maxWidth: '100%', position: 'sticky', top: 0, zIndex: 99}}>
            <Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                <Box sx={{display: 'flex'}}>
                    <AuthContainer />
                </Box>
            </Box>
        </Box>
    )
}