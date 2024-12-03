import React,{useState} from 'react';
import LoginImg from '../../assets/Login/login.jpg'
import axios from 'axios'

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
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const url = "http://localhost:4001/client-login"
            console.log("SENSE")
            const response = await axios.post(url, {
                password: password,
                passport_number:passport_number
            })
            console.log(response.data)
        }
        catch(error){
            console.log(error);
            setMessagePasswords("Invalid Password")
            setMessagePassPorts("Invalid Passport Number")
        }
    }
    return(
        <div style ={BackGroundImage}>
            <form action="" onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder ='Enter Password' 
                    value ={password}
                    onChange={(e)=>setPassword(e.target.value)}/>

                {messagePasswords && <div className='errorpassword'><p>{messagePasswords}</p></div>}
                <input 
                    type="text" 
                    placeholder='Enter Passport Number' 
                    value={passport_number} 
                    onChange={(e)=>setPassNumber(e.target.value)}/>

                {messagePassPorts && <div className='errorpassport'><p>{messagePassPorts}</p></div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default login;