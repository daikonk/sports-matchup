// Navbar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import { useAuth } from './AuthContext';
import './App.css'

const Navbar = ({ logo, logoStyle }) => {
  const location = useLocation();
  const { token } = useAuth();
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
              <span className='roboto-style'>Discover Events</span>
              </HashLink>
            </li>
            {token ? 
              <>
                <li className="nav-item">
                  <NavLink to="/create-edit-events" className="nav-link" activeClassName="active">
                  <span className='roboto-style'>Create Events</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/my-events" className="nav-link" activeClassName="active">
                  <span className='roboto-style'>My Events</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link" activeClassName="active">
                  <span className='roboto-style'>Profile</span>
                  </NavLink>
                </li>
              </>
            :
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active">
                <span className='roboto-style'>Login/Sign Up</span>
                </NavLink>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
