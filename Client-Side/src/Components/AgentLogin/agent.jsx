import React ,{ useEffect, useState }from 'react';
import axios from 'axios';
import Instagram from '../../assets/Login/InstagramIcon.png';
import Facebook from '../../assets/Login/facebook.png';
import Twitter from '../../assets/Login/twitter.png';
import LinkedIn from '../../assets/Login/linkedin.png';
import Architect from '../../assets/Login/architect.png';
import { useNavigate } from 'react-router-dom';
import './agent.css'

const agent =()=>{
    const [password, setPassword] = useState("");
    const [email_address, setEmail] = useState("");
    const [messagePassword, setMessagePassword] = useState("");
    const [messageEmail, setMessageEmail] = useState("");
    const navigate =  useNavigate("");

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const url = 'http://localhost:5000/agent-login'
            const response = await axios.post(url, {
                password:password,
                email_address:email_address
            })
            saveToLocalStorage(response.data.accessToken);
        }
        catch(error){
            setMessagePassword("Invalid Password")
            setMessageEmail("Invalid Email address")
            console.error('Error:', error);
        }
        
     
    }

    const saveToLocalStorage = async(token) => {
        try{
            const url = 'http://localhost:5001/agent-identify'
            const response = await axios.get(url, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })

            console.log("Full-name", response.data[0].full_name)
            localStorage.setItem('loggedin_agent_full_name' , response.data[0].full_name)
            localStorage.setItem('loggedin_agent_phone_number', response.data[0].phone_number)
            localStorage.setItem('loggedin_agent_email_addresss', response.data[0].email_address)
            localStorage.setItem('loggedin_agent_password', response.data[0].password)
            localStorage.setItem('loggedin_agent_id', response.data[0].id)
            if(confirm('Your are being directed to your work page.')){
                navigate(`/property-add/${response.data[0].id}`)
            }
        }
        catch(error){
            console.log('Error:', error);
        }       
    }
    

    
    const BackGroundImage={
        backgroundImage: `url(${Architect})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(()=>{
        setMessageEmail("")
        setMessagePassword("")
    },[password, email_address])
    return(
        <div style={BackGroundImage}>
            <form action="" onSubmit={handleLogin} className='form-agent'>
                <h1>Agent Details</h1>
                <input 
                    type="text" 
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='agent-input'
                />
                {messagePassword && <div ><p className='error'>{messagePassword}</p></div>}
                <input 
                    type="email" 
                    placeholder='Enter Email'
                    value={email_address}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='agent-input'
                    />
                {messageEmail && <div ><p className='error'>{messageEmail}</p></div>}
                <button type='submit'>Login</button>
                <div className='socialNetworks'>
                    <a href="https://www.instagram.com/aboyfromafrica/?__d=1"><img src={Instagram} alt="" /></a>
                    <img src={Facebook} alt="" />
                    <img src={Twitter} alt="" />
                    <img src={LinkedIn} alt="" />
                </div>
            </form>
        </div>
    )
}
export default agent;