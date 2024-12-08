import React,{useEffect, useState} from 'react';
import Bennies from '../../assets/Agents/annie.jpg';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ContactDetails from '../ContactDetails/details'
import ProperrtList from '../AgentPropertyListing/listing';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profiles.css'


const agentArray=[
    {
        name:'Ben Clyde Sikanwe',
        img:Bennies,
        location:'LSK, Woodland Independence Avenue Road',
        description:'I am a professional real estate agent with 15 years of experience',
        services:['Real Estate','Property Management','Sales'],
        phone:'(123) 456-7890',
        email:'ben@example.com'
    }
]
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const Profile =()=>{
  const [full_name, setFullName] = useState("")
  const [agentId, setAgentId] = useState("")
  const [propertyList, setPropertyList] = useState(Boolean)
  const [contactDetails, setContactDetails] = useState(Boolean)

  const fetchAgentId = async (client_agentId)=>{
    const url = `http://localhost:5001/agent-single/${client_agentId}`
      try{
          const response = await axios.get(url)
          setFullName(response.data.full_name)       
      }
      catch(err){
          console.log("Error Message: " + err.message)
      }
  }
  const displayDetails=()=>{
    setContactDetails(true)
    setPropertyList(false)
  }

  const agentPropertiesTable=()=>{
    setPropertyList(true)
    setContactDetails(false)
  }
    useEffect(()=>{

          const client_agentId = localStorage.getItem('client_agentId');

          if( client_agentId ){
              setAgentId(client_agentId)
          }
          fetchAgentId(client_agentId);
          setContactDetails(true)
    },[])
    
    return (
        <div className='profiles'>
            <div className='Avatar'>
                <div>

                </div>
                <Stack direction="row" spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        >
                        <Avatar alt="Remy Sharp" src={agentArray[0].img}/>
                    </StyledBadge>
                    {full_name && <h4 className='avatarname'>{full_name}</h4>}
                </Stack>
                <div className='avatadetails'>
                    <p className='avatarcontact' onClick={displayDetails}>Contact Details</p>
                    {/* <Link to='/property-listing'><p className='avatarprop'>Agent Properties</p></Link> */}
                    <p className='avatarprop' onClick={agentPropertiesTable}>Agent Properties</p>
                    <p className='avatarcomment'>Comments</p>
                </div>
                
            </div>
            <div className='contact'>
                {contactDetails && <ContactDetails/>}
            </div>
            <div className='property'>
                {propertyList && <ProperrtList/>}
            </div>
            
        </div>
    )
}
export  default Profile;