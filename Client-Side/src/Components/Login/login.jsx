import React,{useState, useEffect} from 'react';
import LoginImg from '../../assets/Login/login.jpg'
import axios from 'axios'
import Instagram from '../../assets/Login/InstagramIcon.png';
import Facebook from '../../assets/Login/facebook.png';
import Twitter from '../../assets/Login/twitter.png';
import LinkedIn from '../../assets/Login/linkedin.png';
import UserIcon from '../../assets/Login/userIcon.avif'
import './login.css';;

const login =()=>{
    const [password, setPassword] = useState("")
    const [passport_number, setPassNumber] = useState("")
    const [messagePasswords, setMessagePasswords] = useState("")
    const [messagePassPorts, setMessagePassPorts] = useState("")





    const BackGroundImage={
        backgroundImage: `url(${LoginImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const handleLogin= async(e)=>{
        e.preventDefault();
        try{
            const url = "http://localhost:4001/client-login"
            const response = await axios.post(url, {
                password: password,
                passport_number:passport_number
            })
            saveToLocalStorage(response.data.accessToken)
            console.log(response.data)
            setMessagePasswords("")
            setMessagePassPorts("")
        }
        catch(error){
            setMessagePasswords("Invalid Password")
            setMessagePassPorts("Invalid Passport Number")
            console.log('ERROR MESSAGE ' ,error.message);
        }
    }

    const saveToLocalStorage = async(token)=>{
        const url = "http://localhost:4001/client-identify";

        const response = await axios.get(url ,{
            headers: { Authorization : `Bearer ${token}` }
        } )
        console.log("FULL Names ", response.data[0].full_name)

        localStorage.setItem('client_full_name' , response.data[0].full_name)
        localStorage.setItem('client_email_address', response.data[0].email_address)
        localStorage.setItem('client_phone_number', response.data[0].phone_number)
        localStorage.setItem('client_agentId', response.data[0].agent_id)
        localStorage.setItem('client_password', response.data[0].password)
        localStorage.setItem('client_passport_number', response.data[0].passport_number)
    }

    useEffect(()=>{
        setMessagePasswords("")
        setMessagePassPorts("")
    },[password, passport_number])


    return(
        <div style ={BackGroundImage}>
            <form action="" onSubmit={handleLogin} className='form-login'>
                <img src={UserIcon} alt="" className='user'/>
                <h1>Welcome to Real Estate</h1>
                <h2>Enter correct details to Login</h2>
                <input 
                    type="text" 
                    placeholder ='Enter Password' 
                    value ={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='input-fields'
                    />

                {messagePasswords && <div ><p className='error'>{messagePasswords}</p></div>}
                <input 
                    type="text" 
                    placeholder='Enter Passport Number' 
                    value={passport_number} 
                    onChange={(e)=>setPassNumber(e.target.value)}
                    className='input-fields'
                    />

                {messagePassPorts && <div ><p className='error'>{messagePassPorts}</p></div>}
                <button type="submit" className='submit-form'>Submit</button>
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

export default login;