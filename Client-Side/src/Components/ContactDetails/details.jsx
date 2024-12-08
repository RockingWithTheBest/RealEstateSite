import React,{useState,useEffect} from 'react';
import Bennies from '../../assets/Agents/annie.jpg';
import Message from '../../assets/Agents/message.png';
import axios from 'axios'
import './details.css'


const agentArray=[
    {
        name:'Ben Clyde Sikanwe',
        img:Bennies,
        location:'Woodland Independence Avenue Road - Lusaka',
        description:'I am a professional real estate agent with 15 years of experience',
        services:['Real Estate','Property Management','Sales'],
        phone:'(123) 456-7890',
        email:'ben@example.com',
        rent: '20',
        buy: '11',
        sell: '13'
    }
]

const ContactDetails =()=>{
  
    const [full_name, setFullName] = useState("")
    const [email_address, setEmailAddress] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    // const [agentId, setAgentId] = useState("")
    const [password, setPassword] = useState("")
  

    const fetchAgentData = async (client_agentId)=>{
        const url = `http://localhost:5001/agent-single/${client_agentId}`
          try{
              const response = await axios.get(url)
              console.log('DATA', response.data)
              setFullName(response.data.full_name)
              setPhoneNumber(response.data.phone_number)
              setEmailAddress(response.data.email_address)
          }
          catch(err){
              console.log("Error Message: " + err.message)
          }
      }
    
useEffect(()=>{

    const client_agentId = localStorage.getItem('client_agentId');  
    if(client_agentId ){
        fetchAgentData(client_agentId);
    }    
    
},[]);
    return(
    <div className='dash'>{
        agentArray.map((agent,index)=>(
            <div key={index} className='agent'>
                <div className='displayPhoto'><img src={agent.img} alt={agent.name}/></div>
                <div className='message'><img src={Message} alt="" /><p>Message</p></div>
                <div className='agentdetail'>
                    <div>
                        {full_name && <h1>{full_name}</h1>}
                        <p className='location'>{agent.location}</p>
                        <p>{agent.description}</p>
                    </div>
                    <p className='propeva'>Property Evaluation</p>
                    <div className='evalaurion'>
                        <div className='renta'><p className='agentrent '>{agent.rent}</p><p>Rent</p></div>
                        <div className='buya'><p className='agentbuy'>{agent.buy}</p><p>Buy</p></div>
                        <div className='sella'><p className='agentsell'>{agent.sell}</p><p >Sell</p></div>
                    </div>
                    <div>
                        {email_address && <p><a href="mailto:your_email@example.com">{email_address}</a></p>}
                        {phone_number && <p>+(260) - {phone_number}</p>}
                    </div>
                </div>
               
                
            </div>
        ))
    }
        </div>
    )
}

export default ContactDetails;