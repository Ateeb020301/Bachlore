import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Link } from '@mui/material';
import { GET_CONSULTANT } from '../../../api/contract/queries';
import { useQuery } from '@apollo/client';
import { GetConsultantContractsPayload } from '../../../api/contract/payloads';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './profile.css'
import ChartDoughnut from './chart';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderLinearProgress from '@mui/material/LinearProgress';
import CustomPaginationActionsTable from './profileTable';



export const Profile = () => {
    let sumSalary = 0;
    let percentage = 0;
    let todayDate = new Date().getMonth();
    let monthlySalary = [{month: 'January', salary: 0}, {month: 'February', salary: 0}, {month: 'March', salary: 0}, {month: 'April', salary: 0}, {month: 'May', salary: 0}, {month: 'June', salary: 0}, 
                        {month: 'July', salary: 0}, {month: 'August', salary: 0}, {month: 'September', salary: 0}, {month: 'October', salary: 0}, {month: 'November', salary: 0}, {month: 'December', salary: 0}]
    const navigate = useNavigate();
    const breadcrumbs = [
        <Link underline="none" sx={{':hover': {cursor: 'pointer'}}} fontSize="12px" key="1" color="inherit" onClick={() => navigate("/")}>
            Home
        </Link>,
        <Link
            underline="none"
            onClick={() => navigate("/consultant")}
            sx={{':hover': {cursor: 'pointer'}}}
            fontSize="12px"
            key="2"
            color="inherit">
            Consultant
        </Link>,
        <Link
            underline="none"
            fontSize="12px"
            key="3"
            color="inherit">
            Profile
        </Link>,
    ];


    const getId = useParams();

    const { data } = useQuery<GetConsultantContractsPayload>(
        GET_CONSULTANT,
        {
            variables: { id: Number(getId.id) },
        }
    );

    let contractsLength = data?.consultant[0].contracts.length ?? 0;
    for (let i = 0; i < contractsLength; i++) {
        let startWeek = data?.consultant[0].contracts[i].startWeek ?? 0;
        let endWeek = data?.consultant[0].contracts[i].endWeek ?? 0;
        for (let z = 0; z < monthlySalary.length; z++) {
            for (let x = startWeek; x <= endWeek; x++) {
                const date = new Date(1000 * 60 * 60 * 24 * 7 * x);
                const month = date.toLocaleString('en-us', { month: 'long' });
                if (month === monthlySalary[z].month) {
                    monthlySalary[z].salary += (((data?.consultant[0].contracts[i].daysOfWeek ?? 0) * (data?.consultant[0].contracts[i].hourlyRate ?? 0)) * 8);
                    sumSalary += (((data?.consultant[0].contracts[i].daysOfWeek ?? 0) * (data?.consultant[0].contracts[i].hourlyRate ?? 0)) * 8);
                }
            }
        }
    }
    
    {todayDate = 0 ? (13) : (todayDate)}
    percentage = (monthlySalary[todayDate].salary-monthlySalary[todayDate-1].salary)/(monthlySalary[todayDate-1].salary+1);
    let lastMonth = 0;
    let thisMonth = 0;
    let colorPercentage;

    if (percentage > 0) {
        colorPercentage = 'green'
        thisMonth = 100;
        lastMonth = 100-(percentage*100);
    } else if(percentage == 0) {
        thisMonth = 0;
        lastMonth = 0;
    } 
    else {
        colorPercentage = 'red';
        lastMonth = 100;
        thisMonth = (percentage*100)+100;
    }

    return (
        <Box sx={{height: '100%'} }>
            <Box sx={{ display: 'flex', /*boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',*/ justifyContent: 'space-between',flex: 1, m: 2,  color: 'black', fontWeight: '950', letterSpacing: '.5px', fontSize: '14px' }}>
               
                <Box>
                    CONSULTANT
                </Box>
                <Box>
                    <Breadcrumbs separator={<KeyboardArrowRightIcon fontSize="inherit" />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Box>

            </Box>

            <Box sx={{ display: 'flex', m: 2 }}>
                <Box className={'column'} sx={{ position: 'sticky', top: 0 }}>
                    <Box className={'welcomeBox'}>
                        <Box className={'welcomeHeader'} sx={{borderTopRightRadius: '3px', borderTopLeftRadius: '3px'}}>
                            <Box className={'headerText'}>
                                <p style={{fontSize: '14px'}}>Welcome back!</p>
                                <p style={{fontSize: '11px', paddingBottom: '35px', width: '100px'}}>Lorem ipsum dolor</p>
                            </Box>

                            <Box className={'headerImg'}>
                                
                            </Box>
                            
                        </Box>
                        <Box className={'welcomeBody'} sx={{borderBottomRightRadius: '3px', borderBottomLeftRadius: '3px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Box className={'welcomeInitials'}>
                                    <Box className="img" sx={{ mr: 2, padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{ border: 'solid', borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '14px', letterSpacing: '1px' }}>{`${data?.consultant[0].firstName.substring(0, 1)}${data?.consultant[0].lastName.substring(0, 1)}` }</p>
                                        </Box>
                                    </Box>
                                   <Box sx={{pl: 1}}>
                                        <p style={{fontSize: '15px', fontWeight: 600, marginTop: '10px'}}>{data?.consultant[0].firstName} {data?.consultant[0].lastName}</p>
                                        <p style={{fontSize: '12px', opacity: .5, marginTop: '5px'}}>Front-End Developer</p>
                                   </Box>
                                </Box>

                                <Box sx={{mt: 2, textAlign: 'center'}}>
                                    <p style={{fontWeight: 600}}>{data?.consultant[0].projectConsultants.length}</p>
                                    <p style={{opacity: .5}}>Projects</p>
                                </Box>

                                <Box sx={{mt: 2, textAlign: 'center'}}>
                                    <p style={{fontWeight: 600}}>{data?.consultant[0].contracts.length}</p>
                                    <p style={{opacity: .5}}>Contracts</p>
                                </Box>

                            </Box>

                        </Box>
                    </Box>

                    <Box className={'infoBox'} sx={{my: 2, py:1, borderRadius: '3px'}}>
                        <Box sx={{pl: 2, pt: .5, pb: 1, borderBottom: 'solid', borderWidth: 'thin', borderColor: '#f6f7fb'}}>
                            <p style={{fontWeight: 600, letterSpacing: '1px'}}>Consultant Information</p>
                        </Box>
                        <Box sx={{mx: 2, py:2, borderBottom: 'solid', borderWidth: 'thin', borderColor: '#f6f7fb', display: 'flex'}}>
                            <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>Full Name:</p>
                            <p style={{flex: 1, fontWeight: 400, letterSpacing: '1px', opacity: .7}} className={'infoText'}>{data?.consultant[0].firstName} {data?.consultant[0].lastName}</p>
                        </Box>
                        <Box sx={{mx: 2, py:2, borderBottom: 'solid', borderWidth: 'thin', borderColor: '#f6f7fb', display: 'flex'}}>
                            <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>Employment Date:</p>
                            <p style={{flex: 1, fontWeight: 400, letterSpacing: '1px', opacity: .7}} className={'infoText'}>{data?.consultant[0].employmentDate}</p>
                        </Box>
                        {data?.consultant[0].resignationDate ? (
                            <Box sx={{mx: 2, py:2, borderBottom: 'solid', borderWidth: 'thin', borderColor: '#f6f7fb', display: 'flex'}}>
                                <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>Resignation Date:</p>
                                <p style={{flex: 1, fontWeight: 400, letterSpacing: '1px', opacity: .7}} className={'infoText'}>{data?.consultant[0].resignationDate}</p>
                            </Box>
                        ) : (<></>)}
                        <Box sx={{mx: 2, py:2,  display: 'flex'}}>
                            <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>Workdays:</p>
                            <p style={{flex: 1, fontWeight: 400, letterSpacing: '1px', opacity: .7}} className={'infoText'}>{data?.consultant[0].workdays}</p>
                        </Box>
                    </Box>

                    <Box className={'infoBox'} sx={{my: 1, py: 1, borderRadius: '3px', display: 'flex'}}>
                        <Box sx={{flex: '1', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <p style={{fontWeight: 600, letterSpacing: '1px'}}>Estimated Anually Salary</p>
                            <p style={{fontSize: '20px', color: 'green', fontWeight: 600, letterSpacing: '1px', margin: '5px 0px 0px 0px'}}>{sumSalary.toLocaleString()} NOK</p>
                            <p style={{fontSize: '14px', letterSpacing: '0.5px', margin: '5px 0px 0px 0px', color: colorPercentage}}>
                                {percentage > 0 ? (`Increased from ${monthlySalary[todayDate-1].month}`)  : (`Decreased from ${monthlySalary[todayDate-1].month}`)}                           
                                <span style={{display: 'flex', alignItems: 'center'}}>                                
                                    {percentage > 0 ? (`By +${(percentage*100).toFixed(2)}%`)  : (`By ${(percentage*100).toFixed(2)}%`)}
                                    {percentage > 0 ? (<ArrowDropUpIcon />)  : (<ArrowDropDownIcon />)}
                                </span>
                            </p>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Box sx={{width: '50%', p: 1}}>
                                    <BorderLinearProgress sx={{height: '5px'}} color="success" variant="determinate" value={thisMonth} />
                                </Box>
                                <Box>
                                    <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>{monthlySalary[todayDate].salary.toLocaleString()} kr</p>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Box sx={{width: '50%', p: 1}}>
                                    <BorderLinearProgress sx={{height: '5px'}} color="success" variant="determinate" value={lastMonth} />
                                </Box>
                                <Box>
                                    <p style={{flex: 1, fontWeight: 600, letterSpacing: '1px'}}>{monthlySalary[todayDate-1].salary.toLocaleString()} kr</p>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{flex: '1', display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                                <ChartDoughnut dataSalary={monthlySalary} />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className={'row'} sx={{flex: 2, ml: 1, background: '#f2f6f8',alignSelf: 'flex-start'}}>
                        <CustomPaginationActionsTable />
                </Box>
            </Box>

        </Box>
    );
};