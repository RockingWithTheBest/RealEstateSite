import React from 'react';
import './profiles.css'
import Bennies from '../../assets/Agents/ben.jpg';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ContactDetails from '../ContactDetails/details'
import { Link } from 'react-router-dom';


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
                    <h4 className='avatarname'>Ben Clyde Sikanwe</h4>
                </Stack>
                <div className='avatadetails'>
                    <p className='avatarcontact'>Contact Details</p>
                    <Link to='/property-listing'><p className='avatarprop'>Agent Properties</p></Link>
                    <p className='avatarcomment'>Comments</p>
                </div>
                
            </div>
            <div className='contact'>
                <ContactDetails/>
            </div>
        </div>
    )
}
export  default Profile;