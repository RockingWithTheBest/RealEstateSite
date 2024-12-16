import React ,{useState, useEffect}from 'react';
import axios from 'axios';
import './add.css'

const neighborhood = ()=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [amenities, setAmenities] = useState('');
    const [packs, setNumberOfParks] = useState('');
    const property_id = localStorage.getItem('added_property_id');

    const addNeighbourhood =async (e)=>{
        e.preventDefault();
        const url = 'http://localhost:4112/neighborhoods';
        try{
            const response = await axios.post(url, {
                name: name,
                description: description,
                amenities: amenities,
                number_of_parks: packs,
                property_id: property_id,
            })
            alert("Successfully added Neighborhood details");
            localStorage.removeItem('added_neigh_id');
        }
        catch(err){
            console.log("Error Message: " + err.message)
            alert('An error occurred while adding neighborhood details')
        }
       
    }

    useEffect(()=>{

    },[property_id,name,description,amenities,packs]);

    return(
        <div className='neighbor-page'>
            <h1>Neighborhood Page</h1>
            <form action="" onSubmit={addNeighbourhood} className='form-neighborhood'>
                <input 
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className='property-input'
                />
                 <input 
                    type="text" 
                    placeholder='Description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='property-input'
                />
                 <input 
                    type="text" 
                    placeholder='Amenities'
                    value={amenities}
                    onChange={(e)=>setAmenities(e.target.value)}
                    className='property-input'
                />
                 <input 
                    type="text" 
                    placeholder='number'
                    value={packs}
                    onChange={(e)=>setNumberOfParks(e.target.value)}
                    className='property-input'
                />
                 <button type='submit'>Submit Data</button>
            </form>
        </div>
    )
}

export default neighborhood;