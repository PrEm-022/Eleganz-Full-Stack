import React from 'react'
import './Hero.css'
import hero_img from '../Assets/hero.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2><b>NEW ARRIVALS ONLY</b></h2>
            <div>
                <div className="hero-hand-icon">
                    <p>new 👋</p>
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection →</div>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero
