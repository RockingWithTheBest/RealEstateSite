import React, {useEffect, useState} from "react";
import axios from 'axios';
import Pencil from '../../assets/User Details/Pencil.png'
import { useNavigate } from "react-router-dom";
import './clientdata.css'

const user =()=>{
    const email = localStorage.getItem('client_email_address')
    const fullName = localStorage.getItem('client_full_name')
    const passport_number = localStorage.getItem('client_passport_number')
    const phone_number = localStorage.getItem('client_phone_number')
    const agent_id = localStorage.getItem('client_agentId')
    const [agent_name, setAgentName] = useState("")
    const [agent_email, setAgentEmail] = useState("")
    const [agent_phone_number, setAgentPhoneNumber] = useState("")
    const client_id = localStorage.getItem('client_id')
    const navigate = useNavigate();

    const singleAgent = async()=>{
        try{
            const url = `http://localhost:5001/agent-single/${agent_id}`;
            const response = await axios.get(url)
            console.log("AGENT DATA", response.data)
            setAgentEmail(response.data.email_address)
            setAgentPhoneNumber(response.data.phone_number)
            setAgentName(response.data.full_name)
        }
        catch(error){
            console.error("Error fetching agent data ", error)
        }
    };
    const  editDetails=async()=>{
        if(confirm("You want to edit your details?")){
            navigate(`/edit-client/${client_id}`)
        }
        
       // 
    //     const updatedData = {
    //         full_name: fullName,
    //         email_address: email,
    //         phone_number: phone_number,
    //         passport_number: passport_number
    //     }
    //     const url = `http://localhost:5001/client-update/${email}`;
    //     axios.put(url, updatedData)
    //    .then(response => console.log(response.data))
    }
    useEffect(()=>{
        singleAgent();
    },[agent_id])
    return(
        <div className="user-data">
            <div>   
                {fullName && <h2>Welcome, {fullName}!</h2>}
                <h2>Your details are displayed below</h2>
                <div className="details">
                    {fullName && <div className="div-data"><p className="each-detail">{fullName}</p><img src={Pencil} className="pencil icon" onClick={editDetails}/></div>}
                    {email && <div className="div-data"><p className="each-detail">{email}</p><img src={Pencil} className="pencil icon"  onClick={editDetails}/></div>}
                    {phone_number && <div className="div-data"><p className="each-detail">{phone_number}</p><img src={Pencil} className="pencil icon" onClick={editDetails}/></div>}
                    {passport_number && <div className="div-data"><p className="each-detail">{passport_number}</p><img src={Pencil} className="pencil icon" onClick={editDetails}/></div>}                  
                </div>
                
                <div className="agent-details">
                <h2>Real Estate Agent details</h2>
                    {agent_name && <p>Agent Name : {agent_name}</p>}
                    {agent_email && <p>Email Address : {agent_email}</p>}
                    {agent_phone_number && <p>Contact Number : {agent_phone_number}</p>}
                </div>
            </div>
           
        </div>
    )
}

export default user;