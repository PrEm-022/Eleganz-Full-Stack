import React, { useCallback, useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown-icon.png'
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";

const Navbar = () => {

    const [menu, setMenu] = useState("Shop");
    const {getTotalCartItems, user} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

    const closeMenu = () => {
      if (menuRef.current) {
        menuRef.current.classList.remove('nav-menu-visible');
      }
      const navDropdown = document.querySelector('.nav-dropdown');
      if (navDropdown) {
        navDropdown.classList.remove('open');
      }
    };

  return (
    <div className='navbar'>
      <div className="nav-logo" onClick={()=> {setMenu("Shop"); closeMenu();}}>
        <Link style={{textDecoration:'none'}} to='/'><img src={logo} alt='' /></Link>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=> {setMenu("Shop"); closeMenu();}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu === "Shop"? <hr/>: <></>}</li>
        <li onClick={()=> {setMenu("Mens"); closeMenu();}}><Link style={{textDecoration:'none'}} to='/mens'>Mens</Link>{menu === "Mens"? <hr/>: <></>}</li>
        <li onClick={()=> {setMenu("Womens"); closeMenu();}}><Link style={{textDecoration:'none'}} to='/womens'>Womens</Link>{menu === "Womens"? <hr/>: <></>}</li>
        <li onClick={()=> {setMenu("Kids"); closeMenu();}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu === "Kids"? <hr/>: <></>}</li>
      </ul>
      
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <div className="nav-profile-dropdown">
            <div className="nav-profile-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="nav-username-prefix">{user ? (user.displayName || 'Account') : 'Loading...'}</span>
            </div>
            {user && (
              <div className="nav-profile-dropdown-content">
                <div className="dropdown-header">
                  <p className="hello">Hello,</p>
                  <p className="name">{user.displayName || 'Guest User'}</p>
                </div>
                <hr />
                <Link style={{textDecoration:'none'}} to='/profile'>My Account</Link>
                {user.email === 'admin123@elegence.com' && (
                  <Link style={{textDecoration:'none'}} to='/admin'>Admin Panel</Link>
                )}
                <hr />
                <button onClick={async ()=>{
                  try {
                    await signOut(auth);
                    localStorage.removeItem('auth-token');
                    window.location.replace("/");
                  } catch (error) {
                    console.error("Firebase Signout Error", error);
                    localStorage.removeItem('auth-token');
                    window.location.replace("/");
                  }
                }}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to='/cart'>
          <img src={cart_icon} alt="" />
          {getTotalCartItems() > 0 && <div className="nav-cart-count">{getTotalCartItems()}</div>}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
