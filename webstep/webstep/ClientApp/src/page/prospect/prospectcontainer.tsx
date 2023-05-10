import { useQuery } from '@apollo/client';
import { Box, Button, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { GET_CONSULTANTS } from '../../api/consultants';
import { PageInfo, Project } from '../../logic/interfaces';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ProspectContainer: React.FC = () => {
    const [isModalOpen, setModalState] = React.useState(false);

    const toggleModal = () => setModalState(!isModalOpen);

    return (
        <>
            <Box sx={{ p: 1, width: '30%' }}>
                <h3>Prospects</h3>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{ mx: 1 }}>
                    <Box sx={{ display: 'flex', background: "#ecf8fc", width: '30px', height: '30px', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', ':hover': { background: '#50c3e6', cursor: 'pointer'} }}>
                        <MoreVertIcon sx={{ color: '#51c2e7', fontSize: '16px', ':hover': { color: 'white' }, witdh: '100%', height: '100%' }} color="error" />
                    </Box>
                </Box>
                <Box sx={{ mx: 1, my: 1 }}>
                    <Button startIcon={<AddIcon />} variant="contained" sx={{ background: '#13c56b', ":hover": { background: '#10a75b' }, textTransform: 'none', fontWeight: '600', fontSize: '11px', p: 1, display: 'flex', alignItems: 'center' }} size="small" onClick={toggleModal} disableRipple disableFocusRipple>
                        Deal
                    </Button>
                </Box>
            </Box>
        </>
    );
};