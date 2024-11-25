import React from 'react';
import Header from '../Components/Header/Header'
import BodYOne  from '../Components/BodyOne/BodyOne';
import Properties from '../Components/PropertyDisplay/properties'
import SlideDisplay from '../Components/SlideDisplay/SlideDisplay'
import LandLordQuestion from '../Components/LandLordQuestion/LandLordQuestion'
import Footer from '../Components/Footer/footer';

const Page=()=>{
    return(
        <div>
            <Header/>
            <BodYOne/> 
            <Properties/>
            <SlideDisplay/>  
            <LandLordQuestion/>
            <Footer/>
        </div>
    );
};

export default Page;