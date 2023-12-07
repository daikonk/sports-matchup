
// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/sports.png';
import Navbar from './Navbar'; // Your Bootstrap Navbar component
import Home from './Home';
import CreateEdit from './CreateEdit';
import MyEvents from './MyEvents';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import { AuthProvider } from './AuthContext';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

const App = () => {

  const logoStyle = {
    marginRight: '10px', // Adjust the margin as needed
    width: '42px',
    height: 'auto',

  };

  const customStyles = {
    paddingTop: '80px', // Adjust the value as needed
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar logo={logo} logoStyle={logoStyle} />
        <div>
          <div className="container" style={customStyles}>
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create-edit-events" element={<CreateEdit />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;


