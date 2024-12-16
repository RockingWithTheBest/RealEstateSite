import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './add.css';

const properties =()=>{
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rooms, setRooms] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const agent_id =localStorage.getItem('loggedin_agent_id');
    const coordinates_id = localStorage.getItem('cooridnates_id');

    const postPropertyData = async(e)=>{
        e.preventDefault();
        const url = 'http://localhost:4111/properites';
        const response = await axios.post(url, {
            name: name,
            address: address,
            number_of_rooms: rooms,
            location: location,
            price: price,
            agent_id: agent_id,
            coordinates_id: coordinates_id
        })
        localStorage.setItem("added_property_id", response.data.property.id);
        alert('Successfull addedd')
    }
    useEffect(()=>{
    
    },[name,address,rooms,location,price, agent_id, coordinates_id])
    
    return(
        <div className='property-page'>
            <h1>Properties Page</h1>
            <form action="" onSubmit={postPropertyData} className='form-add-property'>
                <input 
                    placeholder='Property name'
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='property-input'
                />

                <input
                    placeholder='Address' 
                    type="text"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    className='property-input'
                />

                <input
                    placeholder='Number of Rooms' 
                    type="number"
                    value={rooms}
                    onChange={(e)=>setRooms(e.target.value)}
                    className='property-input'
                />

                <input
                    placeholder='Location' 
                    type="text"
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                    className='property-input'
                />

                
                <input
                    placeholder='Price' 
                    type="text"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                    className='property-input'
                />
                <button type='submit'>Submit Data</button>
            </form>
        </div>
    )
}

export default properties;