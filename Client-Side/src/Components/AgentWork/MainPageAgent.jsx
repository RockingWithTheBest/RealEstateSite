import React ,{useEffect, useState} from 'react';
import Properties from './property';
import Neighborhood from './neighborhood';
import CoordinatesInput from './coordinatesInput'
import Coordinates from './coordinates'
import CoordinateActions from './Actions/coordinates';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PropertyActions from './Actions/property';
import NeighborhoodActions from './Actions/neighborhood';
import './MainPageAgent.css'


const mainpage = ()=>{
    const [full_name, setFullName]=useState('');
    const [email, setEmail]=useState('');
    const [phone_number, setPhoneNumber]=useState('');
    const agent_id =  parseInt(localStorage.getItem('client_agentId'));
    const [opencoord, setOpenCoord] = useState(false);
    const [openproperty, setOpenProperty] = useState(false);
    const [openNeighbor, setOpenNeighbor] = useState(false);
    const [openCoordinateDU, setOpenCoordinateDU] = useState(false);
    const [openPropertyDU, setOpenPropertyDU] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openTableNeighbor, setOpentableNeighborDu] = useState(false);
    const agentFetch =async()=>{
        const url = `http://localhost:5001/agent-single/${agent_id}`;
        const response = await axios.get(url)
        setFullName(response.data.full_name);
        setEmail(response.data.email_address);
        setPhoneNumber(response.data.phone_number);
    }

    const OpenCoordinatesAdd = ()=>{
        setOpenCoord(true);
        setOpenProperty(false);
        setOpenNeighbor(false);

        setOpenCoordinateDU(false); // Open Coordinate Actions
        setOpenDrawer(false); // Close drawer
        setOpenPropertyDU(false)
        setOpentableNeighborDu(false)
    }
    const OpenNeighborhoodAdd = ()=>{
        setOpenCoord(false);
        setOpenProperty(false);
        setOpenNeighbor(true);

        setOpenCoordinateDU(false); // Open Coordinate Actions
        setOpenDrawer(false); // Close drawer
        setOpenPropertyDU(false)
        setOpentableNeighborDu(false)
    }
    const OpenPropertyAdd = ()=>{
        setOpenCoord(false);
        setOpenProperty(true);
        setOpenNeighbor(false);

        setOpenCoordinateDU(false); // Open Coordinate Actions
        setOpenDrawer(false); // Close drawer
        setOpenPropertyDU(false)
        setOpentableNeighborDu(false)
    }


    const handleOpenCoordinates = () => {
        setOpenCoordinateDU(true); // Open Coordinate Actions
        setOpenDrawer(false); // Close drawer
        setOpenPropertyDU(false)
        setOpentableNeighborDu(false)

        setOpenCoord(false);
        setOpenProperty(false);
        setOpenNeighbor(false);
    };

    const handleOPenProperty = () => {
        setOpenPropertyDU(true); 
        setOpenCoordinateDU(false); 
        setOpenDrawer(false); // Close drawer
        setOpentableNeighborDu(false)

        setOpenCoord(false);
        setOpenProperty(false);
        setOpenNeighbor(false);
    };

    const handleOpenNeighborhood = () => {
        setOpentableNeighborDu(true); // Open Neighborhood Actions
        setOpenDrawer(false); // Close drawer
        setOpenPropertyDU(false)
        setOpenCoordinateDU(false);
        
        setOpenCoord(false);
        setOpenProperty(false);
        setOpenNeighbor(false);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
      };

      const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListItem key="Inbox" disablePadding>
                <ListItemButton onClick={handleOpenCoordinates}>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Coordinates" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Starred" disablePadding>
                    <ListItemButton onClick={handleOPenProperty}>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Property" />
                    </ListItemButton>
                </ListItem>
            <ListItem key="Send email" disablePadding>
                    <ListItemButton onClick={handleOpenNeighborhood}>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Neighborhood" />
                    </ListItemButton>
            </ListItem>
          </List>
        </Box>
      );


    useEffect(()=>{
        agentFetch();
    },[agent_id])
    return(
        <div className='mainbody'>
            {full_name && 
                <div className='navbar'>
                    <h2>Agent {full_name}</h2>
                    <div className='action-btn'>
                        <p className='menu-para' onClick={toggleDrawer(true)}>Menu</p>
                        <button className='addbtn' onClick={OpenCoordinatesAdd}>+ Coordinate</button>
                        <button className='addbtn' onClick={OpenPropertyAdd}>+ Property</button>
                        <button className='addbtn' onClick={OpenNeighborhoodAdd}>+ Neighborhood</button>
                    </div>
                </div>}

                {opencoord && 
                    <div className='coordinates-div'>
                        <Coordinates/>
                        <CoordinatesInput/>
                    </div>}
                {openproperty && 
                    <div className='property-div'>
                        <Properties/>
                    </div>}
                {openNeighbor && 
                    <div className='neighborhood-div'>
                        <Neighborhood/>
                    </div>}
                {openCoordinateDU &&
                <div className='coordinates-action'>
                    <CoordinateActions/>
                </div>}
                 <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                {openPropertyDU && 
                    <div className='property-actions'>
                        <PropertyActions/>
                    </div>
                    
                }
                {openTableNeighbor &&
                    <div className="neigh-actions">
                        <NeighborhoodActions/>
                    </div>                  
                }
        </div>
    )
}

export default mainpage;