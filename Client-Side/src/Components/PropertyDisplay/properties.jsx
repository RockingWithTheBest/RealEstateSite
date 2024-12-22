import React, {useState} from 'react';
import Box from '@mui/material/Box';
import prop1 from '../../assets/Property/prop1.png';
import prop2 from '../../assets/Property/prop2.png';
import prop3 from '../../assets/Property/prop3.png';
import prop4 from '../../assets/Property/prop4.png';
import prop5 from '../../assets/Property/prop5.png';
import prop6 from '../../assets/Property/prop6.png';
import searchIcon from '../../assets/Property/searchIcon.png';
import bed from '../../assets/Property/bed.png';
import bathtab from '../../assets/Property/bathtab.png';
import measure from '../../assets/Property/measure.png';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Mortgage from '../Mortgage/mortgage'
import './properties.css';


const Properties = ()=>{
    const [openClose, setOpenClose] = useState(false);

    const mortage =()=>{
        if(confirm('Mortgage calculator')){
            setOpenClose(true);
        }
    }
    return(
        <div className='properties'>
            <h2>Based on your location</h2>
            <p className='pickedproperties'>Some of our picked properties near you location.</p>
            <div className='rentsearch'>
                <div><Box 
                sx={{background: '#E0DEF7', 
                padding:'8px', 
                display: 'flex', 
                gap:'17px', 
                borderRadius:'9px'}}>
                <Link to = '/agentprofiles'><button>Agent Listing</button></Link>
                <Link to ='/buy-favorite'><button>Buy</button></Link></Box></div>
            </div>
            <div className='sixcards'>
                <div className='prop1'>
                    <img src={prop1} className="prop" alt="" />
                    <p className='amount'>$200,095 <span>/month</span></p>
                    <p className='nameplace'>Palm Harbor</p>
                    <p className='locationonmap'>Helen Kaunda, Alick Nkhata Road</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />3 Beds</div>
                        <div><img src={bathtab} alt="" />2 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
                <div className='prop2'>
                    <img src={prop2} alt="" className="prop"  />
                    <p className='amount'>$200,700<span>/month</span></p>
                    <p className='nameplace'>Beverly Springfield</p>
                    <p className='locationonmap'>John Lang, Los Angelos Road</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />4 Beds</div>
                        <div><img src={bathtab} alt="" />2 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
                <div className='prop3'>
                    <img src={prop3} alt=""  className="prop" />
                    <p className='amount'>$400,550<span>/month</span></p>
                    <p className='nameplace'>Faulkner Ave</p>
                    <p className='locationonmap'>Chilanga Munda Wanga, Kafue Road</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />4 Beds</div>
                        <div><img src={bathtab} alt="" />3 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
                <div className='prop4'>
                    <img src={prop4} alt=""  className="prop" />
                    <p className='amount'>$200,400<span>/month</span></p>
                    <p className='nameplace'>St. Crystal</p>
                    <p className='locationonmap'>Kendal Park, Lilayi, Lilayi Road</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />4 Beds</div>
                        <div><img src={bathtab} alt="" />2 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
                <div className='prop5'>
                    <img src={prop5} alt=""  className="prop" />
                    <p className='amount'>$100,500<span>/month</span></p>
                    <p className='nameplace'>Cove Red</p>
                    <p className='locationonmap'>State Lodge, State Lodge Road</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />2 Beds</div>
                        <div><img src={bathtab} alt="" />1 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
                <div className='prop6'>
                    <img src={prop6} alt=""  className="prop" />
                    <p className='amount'>$100,600<span>/month</span></p>
                    <p className='nameplace'>Tarpon Bay</p>
                    <p className='locationonmap'>Ibex Meanwood, Olive Tree Street</p>
                    <div className='material'>
                        <p onClick={mortage}>Mortgage</p>
                        <div><img src={bed} alt="" />3 Beds</div>
                        <div><img src={bathtab} alt="" />1 Bathrooms</div>
                        <div><img src={measure} alt="" />5x7 m²</div>
                    </div>
                </div>
            </div>
            <div className='btnViewmap'>
                <Link to = '/Map'>
                    <Button 
                    variant="contained" className='viewmap' disableElevation
                    sx ={{backgroundColor: '#100A55',
                        color: 'white',
                        fontSize: '12px',                        
                        fontFamily: 'Plus Jakarta Sans',
                    }}>
                    View places on the Map</Button>
                </Link>
            </div>
            <div className='mortgage-calculator'>
                {openClose && 
                <Popup open ={openClose} onClose={()=>setOpenClose(false)}>
                    <Mortgage/>
                </Popup>}
            </div>
            
     
        </div>
    
    )
};
export default Properties;