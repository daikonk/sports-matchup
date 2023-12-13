import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './App.css';
import Image from 'react-bootstrap/Image';  // Import Image from react-bootstrap
import profile_pic from './images/profile.png'
import setEvents from './MyEvents.js'

const Navbar = ({ logo, logoStyle, selectedImage }) => {
  const location = useLocation();
  const { token, userId } = useAuth();
  const [profilePic, setProfilePic] = useState(profile_pic);  // Default to local profile 

  useEffect(() => {
    axios.get(`/api/sportevents/?user=${userId}`)
        .then(response => {
          console.log(response.data[0])
            // Assuming the profile picture URL is stored in response.data.profile_pic
            setProfilePic(response.data[0].profile_pic);
            console.log(response.data[0])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, [userId]);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-custom fixed-top">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand" activeClassName="active">
          <img src={logo} alt="Sports Matchup logo" style={logoStyle} className='' />
          <span className='sports-matchup-text'>Sports Matchup</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <HashLink smooth to="/home#discover-events" className={`nav-link ${location.hash === '#discover-events' ? 'active' : ''}`}>
              <span className='roboto-style-navbar'>Discover Events</span>
              </HashLink>
            </li>
            {token ? 
              <>
                <li className="nav-item">
                  <NavLink to="/create-edit-events" className="nav-link" activeClassName="active">
                  <span className='roboto-style-navbar'>Create Events</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/my-events" className="nav-link" activeClassName="active">
                  <span className='roboto-style-navbar'>My Events</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link" activeClassName="active">
                  <span className='roboto-style-navbar'>Profile</span>
                  </NavLink>
                </li>
              </>
            :
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active">
                <span className='roboto-style-navbar'>Login/Sign Up</span>
                </NavLink>
              </li>
            }
          </ul>
        </div>
        {token && 
          <div>
            <NavLink to="/profile" className="nav-link" activeClassName="active">
              <Image src={selectedImage} roundedCircle style={{ width: '35px', height: '35px' }} />
            </NavLink>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
