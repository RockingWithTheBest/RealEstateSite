import React from 'react';
import ColorToggleButton from '../ToggleButton/ColorToggleButton';
import IconKey from '../../assets/BodyOneImg/IconKey.png';
import IconSearch from '../../assets/BodyOneImg/IconSearch.png'; 

import BodyTwo from '../BodyTwo/BodyTwo';
import './BodyOne.css'


const BodYOne =() => {
    return(
        <div className='BodyOne'>
            <div>
                <div className='BodyOne-1'>
                    <div className='heading'>
                        <span className = 'BuySellProperty'>Buy, rent, or sell your property easily</span>
                        <p className = 'BuySellProperty-para'>A great platform to buy, sell, or even rent your properties without any commisions.</p>
                    </div>
                    
                </div>
                <div className='toggle-btn'>
                    <ColorToggleButton/>
                </div>
              
            </div>
            <div className='Renters-Properties'>
                <div className='Renters'>
                    <img src={IconKey} alt="" />
                    <p className='fifty'>50k+ renters</p>
                    <p className='believe'>believe in our service</p>
                </div>
                <div className='Properties'>
                    <img src={IconSearch} alt="" />
                    <p className='ten'>10k+ properties</p>
                    <p className='occupance'>and houses ready for occupance</p>
                </div>
            </div>
            <div>
                <BodyTwo/>
            </div>
            
        </div>
    
    );
};

export default BodYOne;