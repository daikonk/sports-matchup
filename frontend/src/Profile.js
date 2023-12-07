// Profile.js
import React, { useEffect, useState } from 'react';
import profile_pic from './images/profile.png'
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { token, user, signOut } = useAuth();
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    const [show, setShow] = useState(false);
    const [newSport, setNewSport] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState(['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis']);
    const [selectedSkill, setSelectedSkill] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSportChange = (event) => {
        if (event.target.value === 'add-sport') {
            handleShow();
        } else {
            setSelectedSport(event.target.value);
        }
    };

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
    };

    const [selectedImage, setSelectedImage] = useState(profile_pic);
    const handleImageClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    useEffect(() => {
        document.title = 'Profile - Sports Matchup';
        console.log(`profile`);
    }, []);

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
                    <div className="row">
                        <div className="col-3">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img id="profile-picture" src={selectedImage} alt="Profile Picture" className="profile-img-container" onClick={handleImageClick} />
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
                            <form id="form" className="mt-4">
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
                                    <label for="sport_pref" className="col-sm-2 col-form-label">Sports Preferences:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="sport" value={selectedSport} onChange={handleSportChange} required>
                                            <option value="" disabled>Select Sports...</option>
                                            {sports.map((sport, index) => (
                                                <option key={index} value={sport.toLowerCase()}>{sport}</option>
                                            ))}
                                            <option value="add-sport">+ Add new sport</option>
                                        </select>

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
                                            value={user ? user.email : ''}
                                            readOnly // This makes the input read-only
                                        />
                                    </div>
                                </div>

                                {/* <!-- PHONE --> */}
                                <div className="form-group row mt-1">
                                    <label for="phone" className="col-sm-2 col-form-label">Phone #: required</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="phone" placeholder="Enter your number" />
                                    </div>
                                </div>

                                {/* <!-- BUTTONS --> */}
                                <div className="btn-toolbar justify-content-between mt-2">
                                    <div className='btn-group'>
                                        <button type="button" className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                        <button type="reset" className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Profile;