import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import './edit.css'
const edit =()=>{
    const email = localStorage.getItem('client_email_address')
    const fullName = localStorage.getItem('client_full_name')
    const passport_number = localStorage.getItem('client_passport_number')
    const phone_number = localStorage.getItem('client_phone_number')
    const agent_id = localStorage.getItem('client_agentId')
    const {client_id} = useParams();

    const [updateName, setUpdateName]= useState(fullName)
    const [updateEmail, setUpdateEmail]= useState(email)
    const [updatePassword, setUpdatePassword]= useState("")
    const [updatePhoneNumber, setUpdatePhoneNumber]= useState(phone_number)
    const [updateAgentId, setUpdateAgentId]= useState(agent_id)
    const [agents, setAgents]= useState([])
 
    
    const userDetails=async(e)=>{
        e.preventDefault()
        try{
            const url = `http://localhost:4000/client-edit/${client_id}`
            const response = await axios.put(url,{
                full_name: updateName,
                email_address: updateEmail,
                phone_number:updatePhoneNumber,
                agent_id:updateAgentId,
                password : updatePassword,
                passport_number : passport_number
            })
            console.log("Password", updatePassword)
            localStorage.setItem('client_email_address', updateEmail)
            localStorage.setItem('client_full_name', updateName)
            localStorage.setItem('client_passport_number', passport_number)
            localStorage.setItem('client_phone_number', updatePhoneNumber)
            localStorage.setItem('client_agentId', updateAgentId)
            alert("Details successfully updated")         
        }
        catch(err){
            alert('An error occurred while updating the details')
            console.log('Error:', err)
        }
    }
    const fetchAgentsDetails =async ()=>{
        try{
            const url = 'http://localhost:5000/agent-data'
            const response = await axios.get(url)
            setAgents(response.data)
        }
        catch(error){
            console.log('Error:', error)
        }
    }
    useEffect(()=>{
        fetchAgentsDetails()
    },[client_id, agent_id])
    return(
        <div className="lets-edit">
            <div className="welcome">
                {client_id && <h1>Welcome ,{fullName}</h1>}
                {client_id && <h2>Your Current Details</h2>}
                <div>
                    {client_id && <p>Names : {fullName}</p>}
                    {client_id && <p>Email: {email}</p>}
                    {client_id && <p>Passport Number: {passport_number}</p>}
                    {client_id && <p>Phone Number: {phone_number}</p>}
                </div>
               
            </div>
            <div className="formIDv">
                <h1>Edit User Details</h1>
                <form onSubmit = {userDetails} className="form-update">
                    <TextField 
                        variant="filled"
                        type="text" 
                        placeholder="Full Name" 
                        value={updateName} 
                        onChange={(e)=>setUpdateName(e.target.value)} />

                    <TextField 
                        variant="filled"
                        type="email"  
                        placeholder="Email" 
                        value={updateEmail} 
                        onChange={(e)=>setUpdateEmail(e.target.value)}/>

                    <TextField 
                        variant="filled"
                        type="password" 
                        placeholder="Password" 
                        value={updatePassword}
                        onChange={(e)=>setUpdatePassword(e.target.value)}/>
        
                    <TextField 
                        variant="filled"
                        type="text" 
                        placeholder="Phone Number" 
                        value={updatePhoneNumber} 
                        onChange={(e)=>setUpdatePhoneNumber(e.target.value)}/>
                    <label for="fruits">Choose a 'Real Estate Agent':</label>
                    <select name = 'Real Estate Agent' label ='Real Estate Agent'  value = {updateAgentId} onChange={(e)=>setUpdateAgentId(e.target.value)}>
                        {agents && agents.map(agent=>(
                            <option key={agent.id} value={agent.id}>{agent.full_name}</option>
                        ))}
                    </select>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default edit;