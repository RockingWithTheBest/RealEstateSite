import React from 'react';
import Vector from '../../assets/HeaderImg/Vector.png';
import Hanger from '../../assets/HeaderImg/Hanger.png';
import './Header.css';
import Button from '@mui/material/Button';


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
                <Button className = 'btn-login' variant="outlined"  href =''>Login</Button>
                <Button className = 'btn-signup' variant="contained" href =''>Sign Up</Button>
            </div>

        </div>
    );
}

export default Header;