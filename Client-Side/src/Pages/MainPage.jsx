import React from 'react';
import Header from '../Components/Header/Header'
import BodYOne  from '../Components/BodyOne/BodyOne';
import BodYTwo  from '../Components/BodyTwo/BodyTwo';
import Properties from '../Components/PropertyDisplay/properties'
import SlideDisplay from '../Components/SlideDisplay/SlideDisplay'
import LandLordQuestion from '../Components/LandLordQuestion/LandLordQuestion'
import Footer from '../Components/Footer/footer';

const Page=()=>{
    return(
        <div>
            <Header/>
            <BodYOne/> 
            <BodYTwo/>
            <Properties/>
            <SlideDisplay/>  
            <LandLordQuestion/>
            <Footer/>
        </div>
    );
};

export default Page;