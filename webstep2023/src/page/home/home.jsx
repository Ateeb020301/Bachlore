import { useState } from "react";
import Box from "@mui/material/Box"
import Grid from '@mui/material/Unstable_Grid2';
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import KeyIcon from '@mui/icons-material/Key';
import AddIcon from '@mui/icons-material/Add';
import {options, data} from './charts/linechart'
import { Line } from 'react-chartjs-2';

  
const Item = styled(Paper)(({ }) => ({
    backgroundColor: '#fefffe',
    textAlign: 'center',
    color: '#00192d',
    boxShadow: 'none',
  }));

export const Home = () => {

    return (
        <Box sx={{py: 3, px:2, border: 'solid', display: 'flex', flexWrap: 'wrap', overflowY: 'scroll'}}>
            {/*Top Part*/}
            <Box sx={{display: 'flex', justifyContent: 'space-between', flexBasis: '100%', border: 'solid'}}>

                <Box sx={{display: 'flex', flexDirection: 'column', flexBasis: '20%'}}>
                    <h3 style={{margin: 0}}>God Morgen, Mohammad</h3>
                    <p style={{opacity: 0.8, color: 'black'}}>Du har 8 meldinger</p>
                </Box>
                
                <Box sx={{display: 'flex', flexBasis: '50%'}}>
                    <Box sx={{ flexGrow: 1}}>
                        <Grid container sx={{display: 'flex', height: "100%", justifyContent: "flex-end"}} spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <EditIcon sx={{pt: '10px', color: "orange !important"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Todo list</p>
                                </Item>
                            </Grid>
                            <Grid item xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <AssignmentTurnedInIcon sx={{pt: '10px', color: "green"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Prosjekter</p>
                                </Item>
                            </Grid>
                            <Grid item xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <KeyIcon sx={{pt: '10px', color: "#FA4616 !important"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Nøkkeltall</p>
                                </Item>
                            </Grid>
                            <Grid item xs={2} sm={4} md={2} sx={{mx: 1}}>
                                <Item sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#064bd7 !important', color: 'white !important'}}>
                                    <p style={{color: '#00192d', fontWeight: 'bold', paddingRight: '5px', color: 'white'}}>Add New</p>
                                    <AddIcon />                                    
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box sx={{flex: 1, mt: 2, display: 'flex', justifyContent: "space-between", border: 'solid'}}>
                <Box key={'Graph'} sx={{flex: 1.5, mr: 1, background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', borderWidth: '1px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', display: 'flex', justifyContent: 'center'}}>
                    <Line options={options} data={data} />
                </Box>
                <Box sx={{border: 'solid', flex: 1, ml: 1, display: 'flex', flexWrap: 'wrap'}}>
                        <Box sx={{border: 'solid', flexBasis: '100%', background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1}}>
                            test
                        </Box>
                        <Box sx={{border: 'solid', flex: 1, background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1}}>
                            test
                        </Box>
                        <Box sx={{border: 'solid', flex: 1, background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1}}>
                            test
                        </Box>
                        
                </Box>
            </Box>

        </Box>
    )
}