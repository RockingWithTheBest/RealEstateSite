import React from "react";
import ListAgents from '../AvailableAgents/ListAgents'
import './LandLordQuestion.css';

const LandLordQuestion =()=>{
    return(
        <div className="agentscoments">
            <h2>No Spam Promise</h2>
            <h3>Are you a landlord?</h3>
            <p>Discover ways to increase your home's value and  get listed. No Spam.</p>
            <div>
                <ListAgents/>
            </div>
            <p>Join <span className="tenthousand">10,000+</span> other landlords in our estatery community.</p>
        </div>
       
    )
}
export default LandLordQuestion;