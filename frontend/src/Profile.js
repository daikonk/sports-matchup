// Profile.js
import React, { useEffect, useState } from 'react';
import profile_pic from './images/profile.png'
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';

const Profile = ({ setSelectedImage, selectedImage }) => {
    const { token, user, signOut } = useAuth();
    const { userEmail, userId } = useAuth()
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    const [show, setShow] = useState(false);
    const [newSport, setNewSport] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState(['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis']);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [Phonevalue, PhonesetValue] = useState();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleShowConfirmation = () => setShowConfirmation(true);
    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    }


    const handleSportChange = (event) => {
        if (event.target.value === 'add-sport') {
            handleShow();
        } else {
            setSelectedSport(event.target.value);
        }
    };

    const handlePhoneChange = (event) => {
        PhonesetValue(event.target.value);
    }

    const handleNewSportChange = (event) => {
        setNewSport(event.target.value);
    };

    const handleSaveChanges = () => {
        setSports([...sports, newSport]);
        setSelectedSport(newSport.toLowerCase());
        handleClose();
    };

    const handleSkillChange = (event) => {
        setSelectedSkill(event.target.value);
    }

    
    const handleImageClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
    
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                document.getElementById('profile-picture-display').src = e.target.result;
            };
    
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Gather the data from the form fields
        const profileData = {
            user: userId,
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            sport: document.getElementById('sport').value,
            skill: document.getElementById('skill').value,
            location: document.getElementById('location').value,
            email: document.getElementById('email').value,
            phone_num: document.getElementById('inputPhoneNumber').value,
            profile_pic: document.getElementById('profile-picture-display').src,
        };
        console.log(profileData);
    
        // Get the UserProfile instance for the current user
        axios.get(`/api/api/profiles/?user=${userId}`)
            .then(response => {
                // Check if a UserProfile instance exists for the current user
                if (response.data.length > 0) {
                    // Get the ID of the UserProfile instance
                    const id = response.data[0].user;

                    // Append the file to the FormData instance, if a file has been selected
                    const fileInput = document.getElementById('file-input');
                    if (fileInput.files.length > 0) {
                        profileData.append('profile_pic', fileInput.files[0]);
                    } else {
                        // If no new file is selected, fetch the current profile picture and include it in the update request
                        axios.get(`http://localhost:8000/api/profiles/${id}/`)
                            .then(response => {
                                profileData.append('profile_pic', response.data.profile_pic);
                            })
                            .catch(error => {
                                console.error(error);
                                // Handle error here
                            });
                    }
                    console.log(profileData)
    
                    // Send a PUT request to the Django server to update the UserProfile instance
                    axios.put(`/api/api/profiles/${id}/`, profileData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => {
                            console.log(response);
                            // Handle successful response here
                        })
                        .catch(error => {
                            console.error(error);
                            // Handle error here
                        });
                        // handleShowConfirmation();
                } else {
                    // Send a POST request to the Django server to create a new UserProfile instance
                    axios.post('/api/api/profiles/', profileData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => {
                            console.log(response);
                            // Handle successful response here
                        })
                        .catch(error => {
                            console.error(error);
                            // Handle error here
                        });
                        // handleShowConfirmation();
                }
            })
            .catch(error => {
                console.error(error);
                // Handle error here
            });
    };

    useEffect(() => {
        document.title = 'Profile - Sports Matchup';
        console.log(`profile`);
    }, []);

    useEffect(() => {
        // Fetch the current user's profile data from the server
        axios.get(`/api/api/profiles/?user=${userId}`)
            .then(response => {
                if (response.data.length > 0) {
                    var phone_num = response.data[0].phone_num;

                    // Update the state with the fetched data
                    const profile = response.data[0];
                    document.getElementById('name').value = profile.name;
                    document.getElementById('age').value = profile.age;
                    setSelectedSport(profile.sport)
                    setSelectedSkill(profile.skill)
                    document.getElementById('location').value = profile.location;
                    document.getElementById('email').value = profile.email;
                    PhonesetValue(phone_num);
                    setSelectedImage(profile.profile_pic);
                }
                console.log(phone_num)
            })
            .catch(error => {
                console.error(error);
                // Handle error here
            });
    }, [userId]);

    if (!token) {
        console.log(`Navigating to login`)
        return <Navigate to="/login" />;
    }
    console.log('User details in profile:', user);
    const handleSignOut = () => {
        // Call the signOut function to log the user out
        signOut();
        navigate('/profile');
    };

    return (
        <main>
            <section>
                <div className="container text-center mt-2 bg-light text-bg-light py-3">
                    <h1>Profile Information</h1>
                    <form id="form" className="mt-4" onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="row">
                            <div className="col-3">
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <img id="profile-picture-display" src={selectedImage} alt="Profile Picture" className="profile-img-container" onClick={handleImageClick} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        display: 'none'
                                    }}
                                        onMouseOver={(e) => e.target.style.display = 'block'}
                                        onMouseOut={(e) => e.target.style.display = 'none'}
                                        onClick={handleImageClick}>Edit</button>
                                    <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange}/>
                                </div>
                            </div>
                            <div className="col-9">
                                {/* <!-- NAME --> */}
                                <div className="form-group row mt-1">
                                    <label for="name" className="col-sm-2 col-form-label">Name:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name" required/>
                                    </div>
                                </div>

                                {/* <!-- AGE --> */}
                                <div className="form-group row mt-1">
                                    <label for="age" className="col-sm-2 col-form-label">Age:</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="age" placeholder="Enter your age" required/>
                                    </div>
                                </div>

                                {/* <!-- SPORTS --> */}
                                <div className="form-group row mt-1">
                                    <label for="sport_pref" className="col-sm-2 col-form-label">Sport Preference:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="sport" value={selectedSport} onChange={handleSportChange} required>
                                            <option value="" disabled>Select Sports...</option>
                                            {sports.map((sport, index) => (
                                                <option key={index} value={sport.toLowerCase()}>{sport}</option>
                                            ))}
                                            <option value="add-sport">+ Add new sport</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- SKILL --> */}
                                <div className="form-group row mt-1">
                                    <label for="skill" className="col-sm-2 col-form-label">Skill Level:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="skill" value={selectedSkill} onChange={handleSkillChange} required>
                                            <option value="" selected disabled>Select Skill Level</option>
                                            {skillLevels.map((skill, index) => (
                                                <option key={index} value={skill.toLowerCase()}>{skill}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- LOCATION --> */}
                                <div className="form-group row mt-1">
                                    <label for="location" className="col-sm-2 col-form-label">Location:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="location" placeholder="Enter your city" required/>
                                    </div>
                                </div>

                                {/* <!-- EMAIL --> */}
                                <div className="form-group row mt-1">
                                    <label for="email" className="col-sm-2 col-form-label">Email:</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={userEmail}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* <!-- PHONE --> */}
                                <div className="form-group row mt-1">
                                    <label for="phone" className="col-sm-2 col-form-label">Phone #:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputPhoneNumber" placeholder="Enter phone number" value={Phonevalue} onChange={handlePhoneChange} required/>
                                    </div>
                                </div>

                                {/* <!-- BUTTONS --> */}
                                <div className="btn-toolbar justify-content-between mt-2">
                                    <div className='btn-group'>
                                        <button type="button" className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary" onClick={handleShowConfirmation}>Save</button>
                                        <button type="reset" className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            
            <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your profile was saved!</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseConfirmation}>
                    Done
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Sport</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" placeholder="Enter sport name" onChange={handleNewSportChange} required/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </main>
    );
};

export default Profile;