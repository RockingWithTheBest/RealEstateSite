import React, {useEffect, useState} from "react";
import axios from "axios";
import './popUpNeighbor.css';



const neighboor=({id})=>{
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [amenities, setAmenities] = useState("")
    const [numberofParks, setNumberOfPacks] = useState("")
    const [propertyId, setPropertyId] = useState("")

    const fetchNeighbourhood =async()=>{
        const url = `http://localhost:4112/neighborhoods/${id}`;
        try{
            const response = await axios.get(url);
            setName(response.data.name);
            setDescription(response.data.description);
            setAmenities(response.data.amenities);
            setNumberOfPacks(response.data.number_of_parks);  
            setPropertyId(response.data.property_id);  
        }catch(error){
            console.error("There was an error!", error);
        }
    }

    useEffect(()=>{
        fetchNeighbourhood();
    }, [id])
    return(
        <div className="Neighbourhood">
            {propertyId &&<h1>Neighbourhood Details</h1>}
            {propertyId &&<p>Name : {name}</p>}
            {propertyId &&<p>Description : {description}</p>}
            {propertyId &&<p>Amenities : {amenities}</p>}
            {propertyId &&<p>Number of Parks : {numberofParks}</p>}
        </div>
    )
}
export default neighboor