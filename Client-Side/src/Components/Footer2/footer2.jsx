import React from 'react';
import Facebook from '../../assets/footer/facebook.png';
import Instagram from '../../assets/footer/instagram.png';
import Twitter from '../../assets/footer/twitter.png';
import Linkedin from '../../assets/footer/linkedin.png';
import './footer2.css';

const footerTwo =()=>{
    return(
        <div className='footer2'>
            <div>©2021 Estatery. All rights reserved</div>
            <div className='faceinst'>
                <img src={Facebook} alt="" />
                <img src={Instagram} alt="" />
                <img src={Twitter} alt="" />
                <img src={Linkedin} alt="" />
            </div>
        </div>
    )
}
export default footerTwo;