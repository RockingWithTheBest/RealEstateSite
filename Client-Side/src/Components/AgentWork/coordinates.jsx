import React, {useState, useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './add.css';

const coordinates = ()=>{
    const [getCoords, setCoords] = useState("");
    const getI = localStorage.getItem('cooridnates_id');
    const mapRef = useRef(null);

    console.log("cooridnates_id",getI)

    const defaultCoords = [-15.55847, 28.27555];
    
    const getCoordinates = async()=>{
        const url =`http://localhost:1000/coordinate-single/${getI}`
        try{
            const response = await axios.get(url);
            console.log("response",response.data.length)
            if(response.data.length>0){
                const coordinates = response.data.filter(coods=>coods.id === parseInt(getI));
                const parsedCoords = JSON.parse(coordinates[0].grid_number);
                console.log("response",parsedCoords)
                setCoords(parsedCoords); // Update state with parsed coordinates
            }
        
        }catch(error){
            console.error('Error fetching coordinates', error);
          
        }
    }
    useEffect(()=>{
        getCoordinates();
    },[getI]);


    
    useEffect(() => {
            // if(getCoords.length === 0) return;
            if(!getCoords) return;
            const mapDs = L.map(mapRef.current).setView(getCoords, 10);
            // Add tile layer
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapDs);
            const pop = L.popup({
                closeOnClick: true,
            })
            const marker = L.marker(getCoords).addTo(mapDs).bindPopup(pop);
            const toollip = L.tooltip({
                    permanent:true,
                    direction: 'top',
                    className: 'my-tooltip',
                    content: 'Current Possition'
            });
            marker.bindTooltip(toollip)


            
            L.polygon([
                [-15.509, 28.080],
                [-15.503, 28.060],
                [-15.510, 28.047]
            ]).addTo(mapDs);
            mapDs.flyTo(getCoords, 16);                
            return () => {
                mapDs.remove();
            };     
    }, [getCoords]);
    return(
        <div className='map-add' >
            <div id="map-id" ref={mapRef} ></div>  
        </div>
    )
}
export default coordinates;