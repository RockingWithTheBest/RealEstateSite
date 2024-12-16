import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './add.css';

const add=()=>{
    const [grid_number, setGridNumber] =useState("");
    const [coordinateName, setCoordinatesName] = useState("");
    const [obtainedGridNumber, setObtainedGridNumber] = useState("");
    const name = localStorage.getItem('loggedin_agent_full_name');
    const email = localStorage.getItem('loggedin_agent_email_addresss');
    const phone_number = localStorage.getItem('loggedin_agent_phone_number');
    const agent_id = localStorage.getItem('loggedin_agent_id');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = 'http://localhost:1000/coordinates'; 
        try{
            const response = await axios.post(url,{
                grid_number: `[${grid_number}]`,
                name: coordinateName,
                agent_id: agent_id,
            })
            setObtainedGridNumber(response.data.grid_number);
            localStorage.setItem('cooridnates_id', response.data.id);
        }
        catch(e){
            console.error('Error:', e);
            alert('Error adding coordinates!');
            return;
        }
        alert('Coordinates added successfully!');
    }

    useEffect(() => {
        
    }, [name, email, phone_number, agent_id]);
    return(
            <div className='work'>
                <form action="" onSubmit={handleSubmit} className='input-coordinates-form'>
                    <h2>Add Coordinates</h2>
                <button><a href="https://www.openstreetmap.org">Get Coordinates</a></button>
                    <input 
                        type="text"
                        placeholder="Grid Number"
                        onChange={(e)=>setGridNumber(e.target.value)}
                        value={grid_number}
                        />
                    <input 
                        type="text" 
                        placeholder = "Place Name"
                        onChange={(e)=>setCoordinatesName(e.target.value)}
                        value={coordinateName}/>
                        <button type='submit'>View on Map</button>
                </form>
        
    
        </div>
    )
}

export default add;
