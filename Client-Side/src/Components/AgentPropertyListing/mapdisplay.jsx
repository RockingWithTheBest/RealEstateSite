import React,{useEffect,useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './mapdisplay.css';



const mapShow=()=>{
    const {ID} = useParams();
    const mapRef = useRef(null);
    const [mapCoordinates, setMapCoordinates] = useState([])
    const [propertyDetails, setPropertyDetails] = useState(null);
    const [neighborhood, setNeighborhood] = useState(null);


    useEffect(()=>{
        const fetchNeighborhoods = async()=>{
            if(propertyDetails){
                try{
                    const url = 'http://localhost:4112/neighborhoods';
                    const response = await axios.get(url);
                    const neighborhoods = response.data.filter(row=>row.property_id === propertyDetails.id);
                    if (neighborhoods.length > 0) {
                        setNeighborhood(neighborhoods[0]); 
                    }
                }
                catch(errorMessage){
                    console.log("ERROR1", errorMessage);
                }
            }
  
        }
        fetchNeighborhoods();
    },[propertyDetails])

    useEffect(()=>{ 
        const fetchMapCoordinates = async() =>{
            try{
                const url = 'http://localhost:1000/coordinates';
                const responseCoordinates  = await axios.get(url);
                const coordinates = responseCoordinates.data.map(item=>
                    JSON.parse((item.grid_number))
                )              
                setMapCoordinates(coordinates);
            }  
            catch(err){
                console.log("Error Message: " + err.message);
            } 
        }
        fetchMapCoordinates();
    },[])


    useEffect(() =>{
        const fetchProperties =async()=>{
            try{
                const url = 'http://localhost:4111/properites';
                const responseProperites = await axios.get(url);
                const property = responseProperites.data.find(prop => prop.coordinates_id === parseInt(ID));
                if(property){
                    setPropertyDetails(property)
                    details = property
                }
            }
            catch(error){
                console.log("Error Message: " + error.message);
            }
        }
        fetchProperties();
    },[ID])


    useEffect(() => {

            if((mapCoordinates.length && propertyDetails&&neighborhood)){
                const map = L.map(mapRef.current).setView([-15.55847, 28.27555], 13);

                // Add tile layer
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
        
                // Define data
                const details = propertyDetails;
                // const coords = [[-15.40685, 28.34593], [-15.44690, 28.25675], [-15.55847, 28.27555], [-15.51712, 28.27555], [-15.44425, 28.44695], [-15.38856, 28.42669]];
                const coords = mapCoordinates;

                const areas = neighborhood;
                console.log("Area: " )
                console.log(neighborhood)
                
                for(let i = 0; i <coords.length; i++) {
                    const pop = L.popup({
                        closeOnClick: true,
                    }).setContent(
                        '<h4 style={{fontStyle: "italic"}}>'+
                        ' Property Name: '+details.name+'<br>'+
                        ' Price : '+details.price+'<br'+
                        ' Number of Rooms: ' + details.number_of_rooms + '<br>' +
                        ' Location: ' + details.location +'<br>' +
                        ' Description: '+ neighborhood.description+'<br>'+
                        ' Amenities: '+neighborhood.amenities+'<br>'+
                        ' Number of Parks: '+neighborhood.number_of_parks+'<br>'
                        );
        
                    const marker = L.marker(coords[ID]).addTo(map).bindPopup(pop);
        
                    const toollip = L.tooltip({
                        permanent:true
                    }).setContent(details.name);
                    marker.bindTooltip(toollip);
                         // // Optional: Add a circle and a polygon
              
                    // aparts[i].addEventListener('mouseover',() => {
                    //     map.flyTo(coords[i], 16);
                    // });
                    map.flyTo(coords[ID], 16);
                    }
                
                    L.polygon([
                        [-15.509, 28.080],
                        [-15.503, 28.060],
                        [-15.510, 28.047]
                    ]).addTo(map);
                    
                    // fetchProperties();
                    // Cleanup on component unmount
                    return () => {
                        map.remove();
                    };

            }
            
         
        
         // Initialize the map     
    }, [ID,neighborhood, propertyDetails, mapCoordinates]);
    return (
        <div>
            <div id="map" ref={mapRef} ></div>   
        </div>
    );
};

export default mapShow;