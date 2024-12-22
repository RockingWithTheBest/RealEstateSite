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
            setName(response.data[0].name);
            setDescription(response.data[0].description);
            setAmenities(response.data[0].amenities);
            setNumberOfPacks(response.data[0].number_of_parks);  
            setPropertyId(response.data[0].property_id);  
            console.log("DATA", response.data[0].property_id);
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
            <div className="name-descr">
                {propertyId &&<p>Name : {name}</p>}
                {propertyId &&<p>Description : {description}</p>}
                {propertyId &&<p>Amenities : {amenities}</p>}
                {propertyId &&<p>Number of Parks : {numberofParks}</p>}
            </div>
            
        </div>
    )
}
export default neighboor