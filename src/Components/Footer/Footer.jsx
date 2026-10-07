import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import footer_logo from '../Assets/footer_logo.png'
import instagram_icon from '../Assets/insta_logo.png'
import pintrest_icon from '../Assets/pintrest_logo.png'
import whatsapp_icon from '../Assets/whatsapp_logo.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintrest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2026 - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
