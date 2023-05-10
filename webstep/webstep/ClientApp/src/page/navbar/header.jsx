import { Box, IconButton } from '@mui/material'
import { useContext } from 'react'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import InputAdornment from '@mui/material/InputAdornment'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

export const HeaderBar = () => {
    return (
        <Box sx={{display: 'flex', p: 3, background: '#fefeff', flex: 1, maxWidth: '100%'}}>
            <Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
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
    )
}