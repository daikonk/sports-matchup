// Login.js
import logoLogin from './images/sports.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState(null);
    const { token, saveToken, saveUserId, saveUserEmail } = useAuth();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Get form data...
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value,
        };
    
        try {
            const response = await axios.post('http://localhost:8000/loginuser/', formData);
    
            console.log('Response Data:', response.data);
            console.log(response.data)
            saveToken(response.data.access_token);
            saveUserId(response.data.user_id);  // Save the user_id
            saveUserEmail(response.data.email);
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error.message);
    
            // Show error modal
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
            handleShowErrorModal();
        }
    };

    useEffect(() => {
        document.title = 'Login - Sports Matchup';
    }, []);

    return (
        <main>
            <div id="login-form" className="container mt-2 bg-light bg-text-light p-2">
                <h1 className='text-center'>Login</h1>
                <div className="d-flex flex-row justify-content-center">

                </div>
                <form id="login" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="username" id="username" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" name="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p>Don't have an account? <a href="/Register">Register here</a></p>
            </div>

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

export default Login;
