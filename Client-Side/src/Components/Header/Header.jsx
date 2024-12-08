import React from 'react';
import Vector from '../../assets/HeaderImg/Vector.png';
import Hanger from '../../assets/HeaderImg/Hanger.png';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import './Header.css';

const Header =()=>{
    return(
        <div className = 'header'>
            <div className='Estatery'>
                <img src={Vector} alt="" />
                <span>Estatery</span>
            </div>
            <div>
                <span>Rent</span>
            </div>
            <div>
                <span>Buy</span>
            </div>
            <div>
                <span>Sell</span>
            </div>
            <div className='Manage'>
                <span>Manage Property</span>
                <img src={Hanger} alt="" />
            </div>
            <div className='Resource'>
                <span>Resource</span>
                <img src={Hanger} alt="" />
            </div>
            <div>
                <Link to = 'login'><Button className = 'btn-login' variant="outlined"  href =''>Login</Button></Link>
                <Link to ='register-client'><Button className = 'btn-signup' variant="contained" href =''>Sign Up</Button></Link>
            </div>

        </div>
    );
}

export default Header;