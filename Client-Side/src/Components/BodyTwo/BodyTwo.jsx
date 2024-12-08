import React, {useEffect} from 'react';
import MaskGroup from '../../assets/BodyTwoImg/MaskGroup.png'; 
import check from '../../assets/BodyTwoImg/checkIcon.png'
import Dollar from '../../assets/BodyTwoImg/DollaSignIcon.png'
import dropdown from '../../assets/BodyTwoImg/dropdownIcon.png'
import  HouseIcon from '../../assets/BodyTwoImg/HouseIcon.png'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

import './BodyTwo.css'

const bac = {
    backgroundImage: `url(${MaskGroup})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px'
}

const BodyTwo = ()=>{
    const client_id = localStorage.getItem('client_id')
    const navigate = useNavigate();
    const BrowsePage = () => {
        if(client_id){
            alert("You are about to be directed to the properties of all Agents page")
            navigate(`/browser-property/${client_id}`)
        }
    }

    useEffect(() =>{
        
    },[client_id])
    return(
        <div className='BodyTwo-Menu'>
            <div className='newHome' style={bac}>
                <h2>The new way to find your new home</h2>
                <p>Find your dream place to live in with more than 10k+ properties listed.</p>
                <Button variant="contained" onClick={BrowsePage}><span>Browse Properties</span></Button>
            </div>
            <div className='PBLO'>
                <div>
                    <img src ={check} alt="" />
                    <h3>Property Insurance</h3>
                    <p>We offer our customer property protection of liability coverage and insurance for their better life.</p>
                </div>
                <div>
                    <img src={Dollar} alt="" />
                    <h3>Best Price</h3>
                    <p>Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.</p>
                </div>
                <div>
                    <img src={dropdown} alt="" />
                    <h3>Lowest Commission</h3>
                    <p>You no longer have to negotiate commissions and haggle with other agents it only cost 2%!</p>
                </div>
                <div>
                    <img src={HouseIcon} alt="" />
                    <h3>Overall Control</h3>
                    <p>Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.</p>
                </div>
            </div>
        </div>
    )
 
}
export default BodyTwo;