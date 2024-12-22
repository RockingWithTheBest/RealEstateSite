import React, {useState} from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import BackG from '../../assets/ClientRegistration/realestate.png'
import axios from  'axios';
import Instagram from '../../assets/Login/InstagramIcon.png';
import Facebook from '../../assets/Login/facebook.png';
import Twitter from '../../assets/Login/twitter.png';
import LinkedIn from '../../assets/Login/linkedin.png';
import UserIcon from '../../assets/ClientRegistration/usericon.png';
import {useNavigate} from 'react-router-dom'
import './client.css'

const client =()=>{
    const [full_name, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [passport_number, setPassportNumber] = useState("")
    const [agent_id, setAgentId] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        full_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Full name must only contain letters and spaces')
            .required('Full Name is required'),
        email_address: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phone_number: Yup.string()
            .matches(/^(?:\+260)?77[0-9]{8}$/,'Invalid phone number format "771234567"')
            .required('Phone number is required "771234567"'),
        passport_number: Yup.string()
            .transform(value => value.trim()) 
            .matches(/^ZN\d{6}$/, 'Invalid passport number format ZN123456')
            .required('Passport number is required ZN123456'),
        agent_id: Yup.string()
            .matches(/[4-6]/,'Invalid agent ID format')
            .required('Agent ID is required'),
        password: Yup.string()
            .min(8,"Password must be at least 10 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, "Password is of invalid format e.g Secure@1234")
            .required("Password is required"),
    })
    const FormImgae= {
        backgroundImage: `url(${BackG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            full_name:  full_name,
            email_address: email,
            phone_number : phone_number,
            passport_number: passport_number,
            password: password,
            agent_id: agent_id
            }
        
        const url = 'http://localhost:4000/client-register'
        try{
            console.log("DATA" )
            const boy = await validationSchema.validate(data, {abortEarly:false})
            console.log("boy", boy)
        }
        catch(error){
            console.error("Error message: " + error.message)
           alert(`An error occurred while registering data: ${error.message}`)  
            const newErrors ={};
                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message}
                )
            setErrors(newErrors)
        }

        try{
            const response = await axios.post(url, data)
            console.log(response.data)
            setErrors({})
            alert("Successfully registered")
            navigate('/Website')
        }
        catch(error){
            alert("An error occurred while submitting data. Please try again.");
            console.error("Error message  ff: " + error.message)
            console.error("Error message" + error.stack)
        }
        
    }
    return(
        <div className='' style={FormImgae} >
            <form action="" onSubmit ={handleSubmit} className='form-edit'> 
                <img src={UserIcon} alt="User Icon" className="user-icon" />
                <h1>Client Registration</h1>
                <div>
                    <input type="text"  
                    placeholder='Full Name'
                    name = 'Full Name'
                    value ={full_name}
                    onChange={(e)=>setFullName(e.target.value)}
                    className='inputfield'/>
                    {errors.full_name  && <div className='error'>{errors.full_name}</div>}
                </div>
                <div>
                    <input type = 'email' 
                    placeholder = 'Email Address'
                    name = 'email'
                    value ={email}
                    onChange= {(e)=>setEmail(e.target.value)}
                    className='inputfield'
                    />
                    {errors.email_address && <div className='error'>{errors.email_address}</div>}
                </div>
                <div>
                    <input type = 'password'
                    placeholder = 'Password'
                    value={password}
                    name = 'password'
                    onChange={(e)=>setPassword(e.target.value)}
                    className='inputfield'
                    />
                    {errors.password && <div className='error'>{errors.password}</div>}
                </div>
                <div>
                    <input type = 'text' 
                    placeholder = 'Phone Number'
                    value={phone_number}
                    name = 'phone_number'
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    className='inputfield'
                    />
                    {errors.phone_number && <div className='error'>{errors.phone_number}</div>}
                </div>
                <div>
                    <input type = 'text' 
                    placeholder = 'Passport Number'
                    value={passport_number}
                    name = 'passport_number'
                    onChange={(e)=>setPassportNumber(e.target.value)}
                    className='inputfield'
                    />
                    {errors.passport_number && <div className='error'>{errors.passport_number}</div>}
                </div>
                <div>
                    <input type = 'number' 
                    placeholder = 'Agent ID'
                    value={agent_id}
                    name = 'agent_id'
                    onChange={(e)=>setAgentId(e.target.value)}
                    className='inputfield'
                    />
                    {errors.agent_id && <div className='error'>{errors.agent_id}</div>}
                </div>
                <div>
                    <Button 
                            type='submit' 
                            sx={{
                                background: '#7065F0',
                                color: 'white',
                                fontFamily: 'Plus Jakarta Sans',
                                margin: '20px',
                                width: {
                                    xs: '110px', // Width for extra-small screens
                                    sm: '150px', // Width for small screens and up
                                },
                                fontSize: {
                                    xs: '16px', // Font size for extra-small screens
                                    sm: '18px',  // Font size for small screens and up
                                },
                                '&:hover': {
                                    backgroundColor: '#5b5bdf', // Optional: hover effect
                                }
                            }}
                        >
                            Submit
                    </Button>
                </div>
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

export default client;