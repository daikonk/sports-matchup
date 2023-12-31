// Register.js
import logoLogin from './images/sports.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {

  useEffect(() => {
    document.title = 'Sign Up - Sports Matchup';
  }, []);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const { saveToken, saveUserEmail, saveUserId } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleShowErrorModal = () => {
    setShowErrorModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Clear previous password error if any
    setPasswordError('');

    try {
      const response = await fetch('/api/api/registeruser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        saveToken(responseData.access_token);
        saveUserEmail(responseData.email);
        saveUserId(responseData.user_id);
        navigate('/profile');
      } else {
        // Handle errors
        const errorData = await response.json(); 
        console.error('Error:', errorData.message);
        // Show error modal
        setError(errorData.message);
        handleShowErrorModal();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

  };

  return (
    <main>
    <section className="container mt-2 bg-light bg-text-light p-2">
      <h1 className="text-center">Sign Up</h1>
      <div className="d-flex flex-row justify-content-center">
        
      </div>
      <form id="register-form" onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword">Repeat Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
            required
            onChange={handleChange}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <a href="/Login" id="toggle-register">
          Login here
        </a>
      </p>
    </section>

    {/* Error Modal */}
    <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
  </main>
  );
};

export default Register;