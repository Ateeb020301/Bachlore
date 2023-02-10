import { Box, IconButton } from '@mui/material'
import { useContext } from 'react'
import { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key';
import HomeIcon from '@mui/icons-material/Home';
import PercentIcon from '@mui/icons-material/Percent';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import './navbar.css';
import "react-pro-sidebar/dist/css/styles.css";
import CloseIcon from '@mui/icons-material/Close';
import { textAlign } from '@mui/system';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: 'white',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <p>{title}</p>
      <Link to={to} />
    </MenuItem>
  );
};

export let setNavCollapse = false;

export const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  let changed = 'block';
  let solid = 'none'
  let pad = '5px 0px 5px 0px !important'
  {isCollapsed && (changed = 'flex')};
  {!isCollapsed && (solid = 'solid')}
  {isCollapsed && (pad = '15px 0px 10px 0px !important')}
  {isCollapsed && (setNavCollapse = true)};
  {!isCollapsed && (setNavCollapse = false)};
  

  return (

      <Box sx={{display: 'flex'}}>
        <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `#064bd7 !important`,
            justifyContent: 'center',
            display: changed
            
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          
          },
          "& .pro-inner-item": {
            padding: pad
          },
          "& .pro-inner-item:hover": {
            opacity: 0.9
          },
          "& .pro-menu-item.active": {
            fontWeight: 'bolder',
            opacity: .7,
            borderRight: solid
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuIcon /> : undefined}
              style={{
                margin: "10px 0 10px 0",
                color: 'white',
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingLeft={'20px'}
                >
                  <img
                    alt="profile-user"
                    width="120px"
                    src={require('../../components/images/webstepinv.png')}
                    style={{ cursor: "pointer"}}
                  />
                  <IconButton style={{color: 'white'}} onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOpen  />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="120px"
                    height="120px"
                    src={require('../../components/images/pp.png')}
                    style={{ cursor: "pointer", borderRadius: "100%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <p
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Mohammad
                  </p>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title={!isCollapsed &&("Dashboard")}
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />


              {!isCollapsed && (
                <p
                  className='subHead'
                  color={'white'}
                >
                Data
                </p>
              )}
              <Item
                title={!isCollapsed &&("Prospects")}
                to="/prospect"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Contact Information")}
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Invoices Balances")}
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              {!isCollapsed && (
                <p
                  className='subHead'
                  color={'white'}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                Pages
                </p>
              )}
              <Item
                title={!isCollapsed &&("Profile Form")}
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Calender")}
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("FAQ Page")}
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
      </Box>
    
  )
}
