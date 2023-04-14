
import Box from "@mui/material/Box"
import Grid from '@mui/material/Unstable_Grid2';
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import KeyIcon from '@mui/icons-material/Key';
import AddIcon from '@mui/icons-material/Add';
import MultiAxis from './charts/mutliaxis'
import { faker } from '@faker-js/faker';
import { CollapsibleTable } from "./table/projects";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { useCallback, useState } from 'react';
import DoughnutChart, {SumAnually, targetPercentage} from "./charts/doughnut";
import ProfitLine, { SumProfit } from "./charts/linechart";
import { Link } from "react-router-dom";
import './home.css'
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import useForceUpdate from "use-force-update";
  
let yearOut = 2017;

const Item = styled(Paper)(({ }) => ({
    backgroundColor: '#fefffe',
    textAlign: 'center',
    color: '#00192d',
    boxShadow: 'none',
  }));
export const Home = () => {
    const [year, setYear] = React.useState(yearOut);
    const handleChange = (event: SelectChangeEvent) => {
      setYear(parseInt(event.target.value));
      yearOut = parseInt(event.target.value);
    };
    const SelectYear = () => {
        return (
          <Box sx={{ minWidth: 100, height: 50 }}>
            <FormControl fullWidth sx={{}}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="yearSelect"
                value={year.toString()}
                label="year"
                onChange={handleChange}>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
    }
    return (
        <Box sx={{my: 3, px:2, display: 'flex', flexWrap: 'wrap', maxHeight: '100%'}}>

            <Box sx={{display: 'flex', justifyContent: 'space-between', flexBasis: '100%'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{margin: 0}}>God Morgen, Mohammad</h3>
                    <p style={{opacity: 0.8, color: 'black'}}>Du har 8 meldinger</p>
                </Box>
                <Box sx={{display: 'flex', flexBasis: '50%'}}>
                    <Box sx={{ flexGrow: 1}}>
                    <Grid container sx={{display: 'flex', height: "100%", justifyContent: "flex-end"}} spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <EditIcon sx={{pt: '10px', color: "orange !important"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Todo list</p>
                                </Item>
                            </Grid>
                            <Grid xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <AssignmentTurnedInIcon sx={{pt: '10px', color: "green"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Prosjekter</p>
                                </Item>
                            </Grid>
                            <Grid xs={2} sm={4} md={1.5} sx={{mx: 1}}>
                                <Item sx={{height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <KeyIcon sx={{pt: '10px', color: "#FA4616 !important"}}/>
                                    <p style={{color: '#00192d', fontWeight: 'bold'}}>Nøkkeltall</p>
                                </Item>
                            </Grid>
                            <Grid xs={2} sm={4} md={2} sx={{ml: 1}}>
                                <Item sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3979fa !important', color: 'white !important'}}>
                                    <PopupState variant="popover" popupId="demo-popup-menu">
                                        {(popupState) => (
                                            <React.Fragment>
                                            <Button sx={{color: 'white'}} {...bindTrigger(popupState)}>
                                                Add New <AddIcon />  
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={popupState.close}><Link className="dropLink" to="/consultant">Add Consualtant</Link></MenuItem>
                                                <MenuItem onClick={popupState.close}><Link className="dropLink" to="/seller">Add Seller</Link></MenuItem>
                                            </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>                                  
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box sx={{flex: 1, mt: 2, display: 'flex', justifyContent: "space-between"}}>
                <Box key={'Graph'} sx={{flex: 1.5, mr: 3, background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', borderWidth: '1px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
                    <Box sx={{display: 'flex', mx: 2, mt: 1, mb: 1, justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}><h4>Revenue vs Actual Revenue</h4></Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <SelectYear />
                        </Box>
                        
                    </Box>
                    <hr  style={{
                        marginTop: 0,
                        color: '#000000',
                        backgroundColor: '#000000',
                        opacity: 0.1,
                        height: 0,
                        border: 'none',
                        borderTop: '1px solid black',
                        width: '100%',
                    }}/>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, height: '100%'}}>
                        {MultiAxis(yearOut)}
                    </Box>
                </Box>
                <Box sx={{flex: 1, ml: 1, display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', flex: 1, background: '#fefeff', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1, borderRadius: '10px'}}>
                            <Box sx={{flex: 2, alignSelf: 'center', display: 'flex', justifyContent: 'center', maxHeight: '200px'}}>
                                {DoughnutChart(yearOut)}
                            </Box>
                            <Box sx={{borderLeft: 'solid', borderColor: '#e7eaf3', borderWidth: '2px',display: 'flex', flex:1, justifyContent: 'center', pl: 6, flexDirection: 'column'}}>
                                <Box>
                                    <h3 style={{margin: 0, fontSize: '20px', opacity: 0.6}}>${SumAnually(yearOut)}</h3>
                                </Box>
                                <Box>
                                    <p style={{color: 'black',margin: 0, opacity: 0.4, fontSize: '13px'}}>Actual Revenue {yearOut}</p>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{display: 'flex', mt:3}}>
                            <Box sx={{border: 'solid', flex: 1, background: '#3979fa', borderRadius: '10px', borderColor: '#e7eaf3', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1, my: 0, mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <h3 style={{color: 'white'}}>Total Prosjekter: <span className="totalProjects">0</span></h3>
                            </Box>
                            <Box sx={{border: 'solid', background: '#fefeff', borderRadius: '10px', borderColor: '#e7eaf3', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);', p:1, ml: 2, justifyContent: 'space-between', display: 'flex', flex: 1}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'space-between', mb: 1}}>
                                        <Box sx={{flex: 1}}>
                                            <h4 style={{margin: 0, fontSize: '20px', opacity: 0.6}}>${SumProfit(yearOut)}</h4>
                                        </Box>
                                        <Box sx={{flex: 1, textAlign: 'right'}}>
                                            <h5 style={{margin: 0}}>Totalt Profit</h5>
                                            <h6 style={{margin: 0}}>{targetPercentage.toFixed(1)}% of Target</h6>
                                        </Box>
                                    </Box>
                                    <Box sx={{display: 'flex', height: '75%', width: '100%', justifyContent: 'center'}}>
                                        {ProfitLine(yearOut)}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                </Box>
            </Box>
            
            <Box sx={{display: 'flex', flexBasis: '100%', mt: 3, justifyContent: "space-between", height: 'auto', pb: 2}}>
                <Box sx={{borderRadius: '10px', borderColor: '#e7eaf3', borderWidth: '1px', background: '#fefeff', display: 'flex', flexDirection: 'column', flex: 2.5, mr: 2, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);'}}>
                    <Box sx={{mx: 2, mt: 2, mb: 2}}>
                        <h4 style={{padding: '0px', margin: '0px'}}>Pågående prosjekter</h4>
                    </Box>
                    
                    <hr  style={{
                        marginTop: 0,
                        color: '#000000',
                        backgroundColor: '#000000',
                        opacity: 0.1,
                        height: 0,
                        border: 'none',
                        borderTop: '1px solid black',
                        width: '100%',
                    }}/>

                    <Box sx={{mx: 2, mt: 2, mb: 2}}>
                        <CollapsibleTable />
                    </Box>
                </Box>
            
            
                <Box sx={{borderRadius: '10px', borderColor: '#e7eaf3', borderWidth: '1px',background: '#fefeff', display: 'flex', flexDirection: 'column', flex: 1, ml: 2, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1);'}}>
                    <Box sx={{mx: 2, mt: 2, mb: 2}}>
                        <h4 style={{padding: '0px', margin: '0px'}}>Nylig Aktivitet</h4>
                    </Box>
                        
                    <hr  style={{
                        marginTop: 0,
                        color: '#000000',
                        backgroundColor: '#000000',
                        opacity: 0.1,
                        height: 0,
                        border: 'none',
                        borderTop: '1px solid black',
                        width: '100%',
                    }}/>
                </Box>
                
            </Box>
        </Box>
    )
}