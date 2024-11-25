import React from 'react';
import './footer.css';
import Pack from '../../assets/footer/pack.png'
import Footer2 from '../Footer/footer'

const footer =()=>{
    return(
        <div className='footer-wrapper'>
             <div className='footer'>
            <div className='pack'><img src={Pack} alt="" /><h2 className='Estatery'>Estatery</h2></div>
            <div className='buyandsellhome'>
                <div className='sell'>
                    <h3>SELL A HOME</h3>
                    <div className='para'>
                        <p>Request an offer</p>
                        <p>Pricing</p>
                        <p>Reviews</p>
                        <p>Stories</p>
                    </div>
                </div>
                <div className='buy'>
                    <h3>BUY A HOME</h3>
                    <div className='para'>
                        <p>Buy</p>
                        <p>Finance</p>
                    </div>
                </div>
            </div>
            <div  className='buyrentsell'>
                <div className='rent'>
                    <h3>BUY, RENT AND SEL</h3>
                    <div className='para'>
                        <p>Buy and sell properties</p>
                        <p>Rent home</p>
                        <p>Builder trade-up</p>
                    </div>
                </div>
                <div className='terms'>
                    <h3>TERMS & PRIVACY</h3>
                    <div className='para'>
                        <p>Trust & Safety</p>
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
            <div className='about-and-resources'>
                <div className='about'>
                    <h3>ABOUT</h3>
                    <div className='para'>
                        <p>Company</p>
                        <p>How it works</p>
                        <p>Contact</p>
                        <p>Investors</p>
                   </div>
                </div>
                <div className='resource'>
                    <h3>RESOURCES</h3>
                    <div className='para'>
                        <p>Blog</p>
                        <p>Guides</p>
                        <p>FAQ</p>
                        <p>Help Center</p>
                    </div>
                </div>
            </div>
            </div>
            <Footer2/>
        </div>
       
    )
}
export default footer;