import React from 'react';
import Buildin from '../../assets/openning/building.png';
import { useNavigate } from 'react-router-dom';
import './open.css'

const open=()=>{
    const navigate = useNavigate();
    const ClientSite =()=>{
        if(confirm("You are translating to the client site. Would you like to continue?")){
            navigate('/Website');
        }        
    }

    const AgentLogin=()=>{
        if(confirm("You are translating to the agent login. Are you a Agent, would you like to continue?")){
            navigate('/agent-login');
        }
    }
    return (
        <div className='open'>
           <div className='first'>
            <p className='genre'>General</p>
            <p className='gen2' >Home</p>
            <p className='gen3' onClick={ClientSite}>Services</p>
            <p className='gen4' onClick={AgentLogin}>Agent-Login</p>
            <p className='gen5'>Articles</p>
            <p className='gen6'>Contact Us</p>
           </div>
           <div className='second'>
                <div>
                    <h1>We Provide Architectural design and Construction</h1>
                    <p>​More than 100 building and housing projects that we have built.The building owner chose us over other contractors in Jakarta, 
                        because our work is different</p>
                </div>
                <div className='buildins'>
                    <img src={Buildin} alt="" />
                </div>
                
           </div>
           <div className='third'>
                <button><span>Discover More</span></button>
                <div className='simpleEncrpt'>
                    <div className='almight'>
                        <div>
                            <p className='threehun'>300<span>+</span></p>
                            <p>Happy Client</p></div>
                        <div>
                            <p className='ninehun'>900<span>+</span></p>
                            <p>Houses Sold</p>
                        </div>
                        <div>
                            <p className='twentyhun'>20<span>+</span></p>
                            <p>Award Winning Agents</p>
                        </div>  
                    </div>
                    <div className='paragraph'>
                        <p>As a trusted general project that has been operating 
                            for 25 years, our commitment is always to prioritize 
                            our client satisfaction</p>
                    </div>
                </div>
           </div>           
        </div>
    )
}

export default open;