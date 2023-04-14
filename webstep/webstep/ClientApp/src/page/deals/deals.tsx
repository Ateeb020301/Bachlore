import React from 'react';
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Link } from '@mui/material';
import { DealsContainer } from './DealsContainer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { GetProspectsPayload } from '../../api/prospects/payloads';
import { GET_PROSPECTS } from '../../api/prospects/queries';


export const Deals = () => {

    const breadcrumbs = [
        <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Link
            underline="none"
            fontSize="12px"
            key="3"
            color="inherit">
            Deals
        </Link>,
    ];

    const { data } = useQuery<GetProspectsPayload>(GET_PROSPECTS);

    function getDateOfWeek(w : any, y : any) {
        var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
        let date = new Date(y, 0, d).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });;
        return <span>{date}</span>;
    }
    let count = 0;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',flex: 1, mx: 1, mt:1, color: 'black', fontWeight: '950', letterSpacing: '.5px', fontSize: '14px' }}>
                <Box>
                    DEALS
                </Box>
                <Box>
                    <Breadcrumbs separator={<KeyboardArrowRightIcon fontSize="inherit" />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Box>
            </Box>

            <Box sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', display: 'flex', m: 1, flexBasis: '100%', flexWrap:'wrap', background: "#ffffff", borderRadius: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
                <DealsContainer />
            </Box>

            <Box sx={{borderRadius: '5px', m: 1, flexBasis: '100%', height: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{flexBasis: '22%'}}>
                    <Box className={'leadDiscovered'} sx={{p: 3, fontWeight: '950', letterSpacing: '.5px', display: 'flex', flexDirection: 'column', backgroundColor: '#fde2e3'}}>
                        <span>Lead Discovered</span>
                        <span style={{opacity: .5, fontSize: '14px'}}>$265.200 4 Deals</span>
                    </Box>
                </Box>
                <Box sx={{flexBasis: '22%'}}>
                    <Box className={'needsIdentified'} sx={{p: 3, fontWeight: '950', letterSpacing: '.5px', display: 'flex', flexDirection: 'column', backgroundColor: '#faf3e1'}}>
                        <span>Needs Identified</span>
                        <span style={{opacity: .5, fontSize: '14px'}}>$265.200 4 Deals</span>
                    </Box>
                </Box>

                <Box sx={{flexBasis: '22%'}}>
                    <Box className={'needsIdentified'} sx={{p: 3, fontWeight: '950', letterSpacing: '.5px', display: 'flex', flexDirection: 'column', backgroundColor: '#dff4fa'}}>
                        <span>Meeting Scheduled</span>
                        <span style={{opacity: .5, fontSize: '14px'}}>$265.200 4 Deals</span>
                    </Box>
                </Box>

                <Box sx={{flexBasis: '22%'}}>
                    <Box className={'offerAccepted'} sx={{p: 3, fontWeight: '950', letterSpacing: '.5px', display: 'flex', flexDirection: 'column', backgroundColor: '#e8e3fa'}}>
                        <span>Deal Completed</span>
                        <span style={{opacity: .5, fontSize: '14px'}}>$265.200 4 Deals</span>
                    </Box>
                </Box>
            </Box>

            <Box sx={{m: 1, flexBasis: '100%', height: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{flexBasis: '22%'}}>
                {
                        data?.prospects.items.map((prospects) => 
                            (prospects.subProspects.length > 0 ? (
                                (prospects.subProspects[0].probability === 10 ? (
                                    <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                        <AccordionSummary
                                        sx={{maxHeight: '70px'}}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                <Box className="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Box sx={{ borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '11px', letterSpacing: '1px' }}>{prospects.customer.firstName.charAt(0)}{prospects.customer.lastName.charAt(0)}</p>
                                                    </Box>
                                                </Box>
                                                <Box sx={{pl: 1}}>
                                                        <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.customer.firstName} {prospects.customer.lastName}</p>
                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Project - {prospects.projectName}</p>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                            <Box>
                                                <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.projectName}</p>
                                                <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>The assigned seller for this deal is <strong style={{fontWeight: 900, textDecoration: 'underline'}}>{prospects.seller.fullName}</strong>, with any inconvenience, he can be contacted down below</p>
                                            </Box>
                                            <Box>
                                                {prospects.subProspects.length > 1 ? (
                                                <>
                                                    {prospects.subProspects.map((subProspects) => 
                                                        <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                                            <AccordionSummary
                                                            sx={{maxHeight: '70px', padding: 0}}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header">
                                                                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                                    <Box sx={{pl: 1}}>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Start Date - {getDateOfWeek(subProspects.startWeek, subProspects.startYear)}</p>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>EndDate - {getDateOfWeek(subProspects.endWeek, subProspects.endYear)}</p>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                                                <Box>
                                                                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.numOfConsultants} Consultants available</p>
                                                                        </Box>
                                                                    </Box>
                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.probability}% - Meeting has been scheduled</p>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionDetails>
                                                        </Accordion> 
                                                    )}
                                                </>
                                                ) : (
                                                <>
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].numOfConsultants} Consultants available</p>
                                                    </Box>
                                                </Box>
                                                
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <HistoryOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Start Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].startWeek,prospects.subProspects[0].startYear)}, Week {prospects.subProspects[0].startWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <DoneOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>End Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].endWeek,prospects.subProspects[0].endYear)}, Week {prospects.subProspects[0].endWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].probability}% - Talks has begun</p>
                                                    </Box>
                                                </Box>
                                                </>)} 
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion> 
                                ) : (''))
                            ) : (''))
                        )
                    }
                </Box>

                <Box sx={{flexBasis: '22%'}}>
                {
                        data?.prospects.items.map((prospects) => 
                            (prospects.subProspects.length > 0 ? (
                                (prospects.subProspects[0].probability === 30 ? (
                                    <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                        <AccordionSummary
                                        sx={{maxHeight: '70px'}}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                <Box className="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Box sx={{ borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '11px', letterSpacing: '1px' }}>{prospects.customer.firstName.charAt(0)}{prospects.customer.lastName.charAt(0)}</p>
                                                    </Box>
                                                </Box>
                                                <Box sx={{pl: 1}}>
                                                        <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.customer.firstName} {prospects.customer.lastName}</p>
                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Project - {prospects.projectName}</p>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                            <Box>
                                                <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.projectName}</p>
                                                <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>The assigned seller for this deal is <strong style={{fontWeight: 900, textDecoration: 'underline'}}>{prospects.seller.fullName}</strong>, with any inconvenience, he can be contacted down below</p>
                                            </Box>
                                            <Box>
                                                {prospects.subProspects.length > 1 ? (
                                                <>
                                                    {prospects.subProspects.map((subProspects) => 
                                                        <Accordion key={prospects.id + '.' + count++} sx={{boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                                            <AccordionSummary
                                                            sx={{maxHeight: '70px', padding: 0}}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header">
                                                                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                                    <Box sx={{pl: 1}}>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>StartDate - {getDateOfWeek(subProspects.startWeek, subProspects.startYear)}</p>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>EndDate - {getDateOfWeek(subProspects.endWeek, subProspects.endYear)}</p>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                                                <Box>
                                                                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.numOfConsultants} Consultants available</p>
                                                                        </Box>
                                                                    </Box>
                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.probability}% - Customer needs identified</p>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionDetails>
                                                        </Accordion> 
                                                    )}
                                                </>
                                                ) : (
                                                <>
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].numOfConsultants} Consultants available</p>
                                                    </Box>
                                                </Box>
                                                
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <HistoryOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Start Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].startWeek,prospects.subProspects[0].startYear)}, Week {prospects.subProspects[0].startWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <DoneOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>End Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].endWeek,prospects.subProspects[0].endYear)}, Week {prospects.subProspects[0].endWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].probability}% - Talks has begun</p>
                                                    </Box>
                                                </Box>
                                                </>)} 
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion> 
                                ) : (''))
                            ) : (''))
                        )
                    }
                </Box>

                <Box sx={{flexBasis: '22%'}}>
                {
                        data?.prospects.items.map((prospects) => 
                            (prospects.subProspects.length > 0 ? (
                                (prospects.subProspects[0].probability === 70 ? (
                                    <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                        <AccordionSummary
                                        sx={{maxHeight: '70px'}}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                <Box className="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Box sx={{ borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '11px', letterSpacing: '1px' }}>{prospects.customer.firstName.charAt(0)}{prospects.customer.lastName.charAt(0)}</p>
                                                    </Box>
                                                </Box>
                                                <Box sx={{pl: 1}}>
                                                        <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.customer.firstName} {prospects.customer.lastName}</p>
                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Project - {prospects.projectName}</p>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                            <Box>
                                                <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.projectName}</p>
                                                <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>The assigned seller for this deal is <strong style={{fontWeight: 900, textDecoration: 'underline'}}>{prospects.seller.fullName}</strong>, with any inconvenience, he can be contacted down below</p>
                                            </Box>
                                            <Box>
                                                {prospects.subProspects.length > 1 ? (
                                                <>
                                                    {prospects.subProspects.map((subProspects) => 
                                                        <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                                            <AccordionSummary
                                                            sx={{maxHeight: '70px', padding: 0}}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header">
                                                                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                                    <Box sx={{pl: 1}}>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>StartDate - {getDateOfWeek(subProspects.startWeek, subProspects.startYear)}</p>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>EndDate - {getDateOfWeek(subProspects.endWeek, subProspects.endYear)}</p>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                                                <Box>
                                                                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.numOfConsultants} Consultants available</p>
                                                                        </Box>
                                                                    </Box>
                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.probability}% - Talks has begun</p>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionDetails>
                                                        </Accordion> 
                                                    )}
                                                </>
                                                ) : (
                                                <>
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].numOfConsultants} Consultants available</p>
                                                    </Box>
                                                </Box>
                                                
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <HistoryOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Start Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].startWeek,prospects.subProspects[0].startYear)}, Week {prospects.subProspects[0].startWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <DoneOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>End Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].endWeek,prospects.subProspects[0].endYear)}, Week {prospects.subProspects[0].endWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].probability}% - Talks has begun</p>
                                                    </Box>
                                                </Box>
                                                </>)} 
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion> 
                                ) : (''))
                            ) : (''))
                        )
                    }
                </Box>

                <Box sx={{flexBasis: '22%'}}>
                {
                        data?.prospects.items.map((prospects) => 
                            (prospects.subProspects.length > 0 ? (
                                (prospects.subProspects[0].probability === 100 ? (
                                    <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                        <AccordionSummary
                                        sx={{maxHeight: '70px'}}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                            <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                <Box className="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Box sx={{ borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '11px', letterSpacing: '1px' }}>{prospects.customer.firstName.charAt(0)}{prospects.customer.lastName.charAt(0)}</p>
                                                    </Box>
                                                </Box>
                                                <Box sx={{pl: 1}}>
                                                        <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.customer.firstName} {prospects.customer.lastName}</p>
                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Project - {prospects.projectName}</p>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9' }}>
                                            <Box>
                                                <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px', color: 'black'}}>{prospects.projectName}</p>
                                                <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>The assigned seller for this deal is <strong style={{fontWeight: 900, textDecoration: 'underline'}}>{prospects.seller.fullName}</strong>, with any inconvenience, he can be contacted down below</p>
                                            </Box>
                                            <Box>
                                                {prospects.subProspects.length > 1 ? (
                                                <>
                                                    {prospects.subProspects.map((subProspects) => 
                                                        <Accordion key={prospects.id} sx={{boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)', borderRadius: '5px', mb: 1, fontWeight: '950', letterSpacing: '.5px',  display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff'}}>
                                                            <AccordionSummary
                                                            sx={{maxHeight: '70px', padding: 0}}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header">
                                                                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                                                    <Box sx={{pl: 1}}>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>Start Date - {getDateOfWeek(subProspects.startWeek, subProspects.startYear)}</p>
                                                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '0px',color: 'black'}}>EndDate - {getDateOfWeek(subProspects.endWeek, subProspects.endYear)}</p>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionSummary>
                                                            <AccordionDetails sx={{borderTop: 'dotted', borderWidth: '1px', borderColor: '#f7f6f9', margin: '0px' }}>
                                                                <Box>
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.numOfConsultants} Consultants available</p>
                                                                        </Box>
                                                                    </Box>
                    
                                                                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                                        <Box sx={{mr: 1}}>
                                                                            <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                                        </Box>
                                                                        <Box>
                                                                            <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                                            <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{subProspects.probability}% - Deal has been completed</p>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </AccordionDetails>
                                                        </Accordion> 
                                                    )}
                                                </>
                                                ) : (
                                                <>
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <NumbersOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Number of Consultants</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].numOfConsultants} Consultants available</p>
                                                    </Box>
                                                </Box>
                                                
                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <HistoryOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Start Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].startWeek,prospects.subProspects[0].startYear)}, Week {prospects.subProspects[0].startWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <DoneOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>End Date</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{getDateOfWeek(prospects.subProspects[0].endWeek,prospects.subProspects[0].endYear)}, Week {prospects.subProspects[0].endWeek}</p>
                                                    </Box>
                                                </Box>

                                                <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                                                    <Box sx={{mr: 1}}>
                                                        <PercentOutlinedIcon fontSize='inherit' color='disabled'/>
                                                    </Box>
                                                    <Box>
                                                        <p style={{fontSize: '13px', fontWeight: 600, marginTop: '0px', marginBlockStart: '0px', marginBlockEnd: '0px', color: 'black'}}>Probability</p>
                                                        <p style={{fontSize: '11px', color: 'black', marginTop: '5px',  opacity: .5}}>{prospects.subProspects[0].probability}% - Talks has begun</p>
                                                    </Box>
                                                </Box>
                                                </>)} 
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion> 
                                ) : (''))
                            ) : (''))
                        )
                    }
                </Box>
            </Box>

            <ToastContainer />
        </Box>
    )

}