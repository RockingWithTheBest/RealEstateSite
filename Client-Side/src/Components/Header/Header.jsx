import React, {useState} from 'react';
import Vector from '../../assets/HeaderImg/Vector.png';
import Hanger from '../../assets/HeaderImg/Hanger.png';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import userDetailsIcon  from '../../assets/User Details/user-details.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserDetails from '../UserDetails/clientdata';
import './Header.css';

const Header =()=>{
    const client_id = localStorage.getItem('client_passport_number');
    const [message, setMessage] = useState("");

    const checkLocalStorage =()=>{
        console.log("localStorage");
        if(client_id === null){
            setMessage("You havent yet Logged in")
        }
        else{
            setMessage("")
        }
        console.log("Checking", client_id)
    }

    return(
        <div className = 'header'>
            <div className='Estatery'>
                <img src={Vector} alt="" />
                <span>Estatery</span>
            </div>
            <div className='rent-span'>
                <span>Rent</span>
            </div>
            <div className='buy-span'>
                <span>Buy</span>
            </div>
            <div className='sell-span'>
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
            <div className='userImgs'>
                <Popup trigger= 
                    {<img className='detailsIcon' src={userDetailsIcon} alt="" />}
                    modal nested 
                    onOpen={checkLocalStorage}>
                    {
                        close=>(
                            <div className='modal'>
                            <div className='content' >
                                {client_id && <UserDetails/>}  
                                {message && <p className='not-yet'>{message}</p>}
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                        )
                    } 
                </Popup>
                <Link to = '/login'><Button className = 'btn-login' variant="outlined"  href =''>Login</Button></Link>
                <Link to ='/register-client'><Button className = 'btn-signup' variant="contained" href =''>Sign Up</Button></Link>
            </div>

        </div>
    );
}

export default Header;