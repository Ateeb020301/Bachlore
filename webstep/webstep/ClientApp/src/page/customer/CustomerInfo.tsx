import React from "react";
import { Customer } from "../../api/customer";
import { Box } from "@mui/material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

function GetInfo(customer: Customer) {
    let subProspectlen = 0;
    let str = customer.firstName + ' ' + customer.lastName;
    let acronym = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')

    customer.prospects.forEach(element => {
      subProspectlen += element.subProspects.length;
    });

    const element = (
        <Box sx={{p: 1}}>

          <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', borderBottom: '1px dotted #e0e0e0'}}>
              <Box id="img" sx={{padding: '5px', background: '#f2f6f8', border: 'solid', borderColor: '#ecefee', borderWidth: 'thin', borderRadius: '100%', height: '75px', width: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ border: 'solid', borderRadius: '100%', borderColor: '#ecefee', borderWidth: 'thin', width: '100%', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                      <p style={{ color: '#6a96e9', fontWeight: 900, fontSize: '24px', letterSpacing: '2px' }}>{acronym}</p>
                  </Box>
              </Box>
            <Box sx={{mt: 1}}>
              <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '16px', padding: '0px', margin: '0px'}}>{customer.firstName} {customer.lastName}</p>
              <p style={{opacity: .3, fontWeight: 600, color: 'black', fontSize: '12px', padding: '0px', margin: '5px', textAlign: 'center'}}>{customer.email}</p>
            </Box>

            <Box sx={{my: 2, display: 'flex'}}>
              <Box sx={{padding: '5px',width: '30px', height: '30px', borderRadius: '5px', background: '#d5f4e4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <MailOutlineOutlinedIcon sx={{color: '#3cc987', fontSize: '18px'}}/>
              </Box>
              <Box sx={{padding: '5px',width: '30px', height: '30px', borderRadius: '5px', background: '#fde3e2', mx: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <PhoneEnabledOutlinedIcon sx={{color: '#f17967', fontSize: '18px'}}/>
              </Box>
              <Box sx={{padding: '5px',width: '30px', height: '30px', borderRadius: '5px', background: '#fbf3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <ChatOutlinedIcon sx={{color: '#e8bf62', fontSize: '18px'}}/>
              </Box>
            </Box>
          </Box>

          <Box sx={{my: 1}}>
            <Box sx={{my: 2}}>
              <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '16px', padding: '0px', margin: '0px'}}>Information</p>
            </Box>

            <Box sx={{display: 'flex', my: 3}}>
              <Box sx={{flex: 1}}>
                <p style={{fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>Address</p>
              </Box>
              <Box sx={{flex: 1}}>
                <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>{customer.adresse}</p>
              </Box>
            </Box>

            <Box sx={{display: 'flex', my: 3}}>
              <Box sx={{flex: 1}}>
                <p style={{fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>E-Mail</p>
              </Box>
              <Box sx={{flex: 1}}>
                <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>{customer.email}</p>
              </Box>
            </Box>

            
            <Box sx={{display: 'flex', my: 3}}>
              <Box sx={{flex: 1}}>
                <p style={{fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>Phone Number</p>
              </Box>
              <Box sx={{flex: 1}}>
                <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>{`(+47) ${customer.tlf.slice(0,3)} ${customer.tlf.slice(3,5)} ${customer.tlf.slice(5,8)} `}</p>
              </Box>
            </Box>

            <Box sx={{display: 'flex', my: 3}}>
              <Box sx={{flex: 1}}>
                <p style={{fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>Prospects</p>
              </Box>
              <Box sx={{flex: 1}}>
                <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>{customer.prospects.length}</p>
              </Box>
            </Box>

            <Box sx={{display: 'flex', my: 3}}>
              <Box sx={{flex: 1}}>
                <p style={{fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>Subprospects</p>
              </Box>
              <Box sx={{flex: 1}}>
                <p style={{opacity: .6, fontWeight: 600, color: 'black', fontSize: '14px', padding: '0px', margin: '0px'}}>{subProspectlen}</p>
              </Box>
            </Box>

          </Box>
        </Box>
      )

    return element
}

export default GetInfo;