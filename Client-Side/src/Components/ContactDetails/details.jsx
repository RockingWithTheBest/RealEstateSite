import React from 'react';
import Bennies from '../../assets/Agents/ben.jpg';
import Message from '../../assets/Agents/message.png';
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
    return(
    <div className='dash'>{
        agentArray.map((agent,index)=>(
            <div key={index} className='agent'>
                <div className='displayPhoto'><img src={agent.img} alt={agent.name}/></div>
                <div className='message'><img src={Message} alt="" /><p>Message</p></div>
                <div className='agentdetail'>
                    <div>
                        <h1>{agent.name}</h1>
                        <p className='location'>{agent.location}</p>
                        <p>{agent.description}</p>
                    </div>
                
                    {/* <div>
                        {agent.services.map((service,index)=>(
                                <p key={index}>{service}</p>
                        ))}
                    </div> */}
                    <p className='propeva'>Property Evaluation</p>
                    <div className='evalaurion'>
                        <div className='renta'><p className='agentrent '>{agent.rent}</p><p>Rent</p></div>
                        <div className='buya'><p className='agentbuy'>{agent.buy}</p><p>Buy</p></div>
                        <div className='sella'><p className='agentsell'>{agent.sell}</p><p >Sell</p></div>
                    </div>
                    <div>
                        <p><a href="mailto:your_email@example.com">{agent.email}</a></p>
                        <p>{agent.phone}</p>
                    </div>
                </div>
               
                
            </div>
        ))
    }
        </div>
    )
}

export default ContactDetails;