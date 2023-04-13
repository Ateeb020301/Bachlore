import { Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

export const HeaderBar = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', p: 1, background: '#fefeff', flex: 1}}>

            <Box sx={{display: 'flex'}}>
                <h3>Create New</h3>
            </Box>
            <Box sx={{display: 'flex', flexBasis: '25%', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flex: 1, justifyContent: 'space-evenly'}}>
                    <Box>
                        <TextField
                        label="Søk her"
                        id="filled-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        }}
                        variant="filled"
                        />
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <IconButton type="button">
                            <SettingsIcon></SettingsIcon>
                        </IconButton>
                        <IconButton type="button">
                            <AccountCircleIcon></AccountCircleIcon>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}