import React from 'react';
import {Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className='navbar' style={{"backgroundColor":"#E3FDFD"}}>
        <Link to="/"><p  className='logo' >Profile</p></Link>
        {
          // <Link to="/appointment"><p> Appointments</p></Link>
        }
        <Link to="/experts"><p  className='logo' >Expert</p></Link>
    </div>
  )
}

export default Navbar;