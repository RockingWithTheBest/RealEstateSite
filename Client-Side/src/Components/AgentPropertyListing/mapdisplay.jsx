import React,{useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapdisplay.css';
import prop6 from '../../assets/Property/prop6.png';

const mapShow=()=>{
    const {ID} = useParams();
    const mapRef = useRef(null);

    useEffect(() => {
            const map = L.map(mapRef.current).setView([-15.55847, 28.27555], 13);

            // Add tile layer
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
    
            // Define data
            const areas = ["5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²"];
            const rooms = [5, 6, 7, 6, 3, 4];
            const images = [prop6];
            const coords = [[-15.40685, 28.34593], [-15.44690, 28.25675], [-15.55847, 28.27555], [-15.51712, 28.27555], [-15.44425, 28.44695], [-15.38856, 28.42669]];
            const rent = ['$2,095', '$2,700', '$4,550', '$2,400', '$1,500', '$1,600'];
            const aparts =[];
       
    
            for(let i = 0; i <coords.length; i++) {
                const pop = L.popup({
                    closeOnClick: true,
                }).setContent('<h4 style={{fontStyle: "italic"}}>Area: '+areas[ID]+' Rooms: '+rooms[ID]+'</h4><img src=' +images[0] + ' style="height: 100px">');
    
                const marker = L.marker(coords[ID]).addTo(map).bindPopup(pop);
    
                const toollip = L.tooltip({
                    permanent:true
                }).setContent(rent[ID]);
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
    
            // Cleanup on component unmount
            return () => {
                map.remove();
            };
         // Initialize the map     
    }, [ID]);
    return (
        <div>
            <div id="map" ref={mapRef} ></div>   
        </div>
    );
};

export default mapShow;