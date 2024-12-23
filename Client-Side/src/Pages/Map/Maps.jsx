import React,{useEffect, useRef} from 'react';
import prop1 from '../../assets/Property/prop1.png';
import prop2 from '../../assets/Property/prop2.png';
import prop3 from '../../assets/Property/prop3.png';
import prop4 from '../../assets/Property/prop4.png';
import prop5 from '../../assets/Property/prop5.png';
import prop6 from '../../assets/Property/prop6.png';
import bed from '../../assets/Property/bed.png';
import bathtab from '../../assets/Property/bathtab.png';
import measure from '../../assets/Property/measure.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const Maps =()=>{
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialize the map

            const map = L.map(mapRef.current).setView([-15.55847, 28.27555], 13);

            // Add tile layer
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
    
            // Define data
            const areas = ["5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²", "5x7 m²"];
            const rooms = [5, 6, 7, 6, 3, 4];
            const images = [prop1, prop2, prop3, prop4, prop5, prop6];
            const coords = [[-15.40685, 28.34593], [-15.44690, 28.25675], [-15.55847, 28.27555], [-15.51712, 28.27555], [-15.44425, 28.44695], [-15.38856, 28.42669]];
            const rent = ['$2,095', '$2,700', '$4,550', '$2,400', '$1,500', '$1,600'];
            const apart1 = document.querySelector('.prop11');
            const apart2 = document.querySelector('.prop21');
            const apart3 = document.querySelector('.prop31');
            const apart4 = document.querySelector('.prop41');
            const apart5 = document.querySelector('.prop51');
            const apart6 = document.querySelector('.prop61');
            const aparts =[apart1,apart2,apart3,apart4,apart5,apart6];
       
    
            for(let i = 0; i <coords.length; i++) {
                const pop = L.popup({
                    closeOnClick: true,
                }).setContent('<h4 style={{fontStyle: "italic"}}>Area: '+areas[i]+' Rooms: '+rooms[i]+'</h4><img src=' + images[i] + ' style="height: 100px">');
    
                const marker = L.marker(coords[i]).addTo(map).bindPopup(pop);
    
                const toollip = L.tooltip({
                    permanent:true
                }).setContent(rent[i]);
                marker.bindTooltip(toollip);
                     // // Optional: Add a circle and a polygon
                L.circle(coords[i], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);
                aparts[i].addEventListener('mouseover',() => {
                    map.flyTo(coords[i], 16);
                });
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
    }, []);

    return(
        <div className='propertyListings'>
            <h1>Welcome to the Sikanwe's Real Estate Website</h1>
            <h3 className='propertyListins'>Displayed below is our property listins</h3>
            <div className='mapdisplay'>
                <div className='sixcardsList1'>
                    <div className='prop11'>
                        <img src={prop1} alt="" />
                        <p className='amount1'>$2,095 <span>/month</span></p>
                        <p className='nameplace1'>Palm Harbor</p>
                        <p className='locationonmap1'>Helen Kaunda, Alick Nkhata Road</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />3 Beds</div>
                            <div><img src={bathtab} alt="" />2 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                    <div className='prop21'>
                        <img src={prop2} alt="" />
                        <p className='amount1'>$2,700<span>/month</span></p>
                        <p className='nameplace1'>Beverly Springfield</p>
                        <p className='locationonmap1'>John Lang, Los Angelos Road</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />4 Beds</div>
                            <div><img src={bathtab} alt="" />2 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                    <div className='prop31'>
                        <img src={prop3} alt="" />
                        <p className='amount1'>$4,550<span>/month</span></p>
                        <p className='nameplace1'>Faulkner Ave</p>
                        <p className='locationonmap1'>Chilanga Munda Wanga, Kafue Road</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />4 Beds</div>
                            <div><img src={bathtab} alt="" />3 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                    <div className='prop41'>
                        <img src={prop4} alt="" />
                        <p className='amount1'>$2,400<span>/month</span></p>
                        <p className='nameplace1'>St. Crystal</p>
                        <p className='locationonmap1'>Kendal Park, Lilayi, Lilayi Road</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />4 Beds</div>
                            <div><img src={bathtab} alt="" />2 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                    <div className='prop51'>
                        <img src={prop5} alt="" />
                        <p className='amount1'>$1,500<span>/month</span></p>
                        <p className='nameplace1'>Cove Red</p>
                        <p className='locationonmap1'>State Lodge, State Lodge Road</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />2 Beds</div>
                            <div><img src={bathtab} alt="" />1 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                    <div className='prop61'>
                        <img src={prop6} alt="" />
                        <p className='amount1'>$1,600<span>/month</span></p>
                        <p className='nameplace'>Tarpon Bay</p>
                        <p className='locationonmap'>Ibex Meanwood, Olive Tree Street</p>
                        <div className='material1'>
                            <div><img src={bed} alt="" />3 Beds</div>
                            <div><img src={bathtab} alt="" />1 Bathrooms</div>
                            <div><img src={measure} alt="" />5x7 m²</div>
                        </div>
                    </div>
                </div>
                <div id="map" ref={mapRef} ></div>   
            </div>
        </div>


    );
}

export default Maps;