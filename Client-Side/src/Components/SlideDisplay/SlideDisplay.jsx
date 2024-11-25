import React from "react";
import './SlideDisplay.css'
import Tube from '../../assets/SlidingDisplay/tube.png';
import House from '../../assets/SlidingDisplay/house.png';
import Doc from '../../assets/SlidingDisplay/document.png';




const SlideDisplay =()=>{
 return(
    <div className="backSlideDsiplay">
        <div className="landlord-Tenant">
            <h2 className="landloadheader">We make it easy for tenants and landlords.</h2>
            <p className="landloadheader">Whether it’s selling your current home, getting financing, or buying a new home, 
                we make it easy  and efficient. The best part? you’ll save a bunch of money 
                and time with our services.
            </p>
        </div>
        <div className="virtualBest">
            <div className="lightpurple">
                <img src={Tube} alt="" />
                <div>
                    <h2>Virtual home tour</h2>
                    <p>You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.</p>
                </div>
            </div>
            <div className="white">
                <img src={House} alt="" />
                <div>
                    <h2>Find the best deal</h2>
                    <p>Find your dream house? You just need to do a little to no effort and you can start move in to your new dream home!</p>
                </div>
            </div>
            <div className="deeppurple">
                <img src={Doc} alt="" />
                <div>
                    <h2>Get ready to apply</h2>
                    <p>Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!</p>
                </div>
            </div>
        </div>
        <div className="averaging">
            <div>
                <h2>7.4%</h2>
                <p>Property Return Rate</p>
            </div>
            <div>
                <h2>3,856</h2>
                <p>Property in Sell & Rent</p>
            </div>
            <div >
                <h2>2,540</h2>
                <p>Daily Completed Transactions</p>
            </div>
        </div>
    </div>

 );
};

export default SlideDisplay;