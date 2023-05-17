import { Box, IconButton } from '@mui/material'
import { useContext } from 'react'
import { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom'
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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const Item = ({ title, location, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === location}
      style={{
        color: 'white'
      }}
      onClick={() => setSelected(location)}
      icon={icon}
    >
      <p>{title}</p>
      <Link to={to} />
    </MenuItem>
  );
};

export let setNavCollapse = false;
export const Navbar = () => {
  let width = window.innerWidth;
  const [isCollapsed, setIsCollapsed] = useState(width < 1600 ? true : false);
  const [selected, setSelected] = useState("Dashboard");

  let changed = 'block';
  let solid = 'none'

  return (
      <Box sx={{display: 'flex', zIndex: 1}}>
        <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `#064bd7 !important`,
            justifyContent: 'center',
            display: (isCollapsed ? 'flex' : 'block'),
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          
          },
          "& .pro-sidebar .pro-menu .pro-menu-item > .pro-inner-item": {
            padding: '0px',
            paddingTop: (isCollapsed ? '10px' : '0px'),
          
          },
          "& .pro-menu-item.active": {
            borderRight: (!isCollapsed && 'solid'),
            opacity: .8,
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square" style={{flex: 1}}>
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => (isCollapsed && setIsCollapsed(!isCollapsed))}
              icon={isCollapsed ? <MenuIcon /> : undefined}
              style={{
                margin: "10px 0 10px 0",
                color: 'white',
                padding: 0,
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingLeft={'15px'}
                >
                  <Box>
                    <img
                      alt="profile-user"
                      width="120px"
                      src={require('../../components/images/webstepinv.png')}
                      style={{ cursor: "pointer"}}
                    />
                  </Box>
                  <Box>
                    <IconButton style={{color: 'white'}} onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOpen  />
                    </IconButton>
                  </Box>
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
                location={"/"}
                active={window.location.pathname == "/"}
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
                location={"/prospect"}
                active={window.location.pathname == "/prospect"}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Contracts")}
                to="/belegg"
                icon={<ContactsOutlinedIcon />}
                location={"/belegg"}
                active={window.location.pathname == "/belegg"}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Deals")}
                to="/deals"
                icon={<LocalOfferOutlinedIcon />}
                location={"/deals"}
                active={window.location.pathname == "/deals"}
                selected={selected}
                setSelected={setSelected}
              />

              {!isCollapsed && (
                <p
                  className='subHead'
                  color={'white'}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                Form
                </p>
              )}
              <Item
                title={!isCollapsed &&("Customers")}
                to="/customer"
                icon={<PeopleOutlineOutlinedIcon />}
                location={"/customer"}
                active={window.location.pathname == "/customer"}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Sellers")}
                to="/seller"
                icon={<PersonAddAltIcon />}
                location={"/seller"}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title={!isCollapsed &&("Consultants")}
                to="/consultant"
                icon={<BadgeOutlinedIcon />}
                location={"/consultant"}
                active={window.location.pathname === "/consultant/"}
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
