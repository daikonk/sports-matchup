// CreateEdit.js
import React, { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import basketballImage from './images/sports-basketball.png';
import soccerImage from './images/sports-soccer.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import axios from 'axios';
import './App.css';

const CreateEdit = () => {
    const states = [
        { name: 'Alabama', abbreviation: 'AL' },
        { name: 'Alaska', abbreviation: 'AK' },
        { name: 'Arizona', abbreviation: 'AZ' },
        { name: 'Arkansas', abbreviation: 'AR' },
        { name: 'California', abbreviation: 'CA' },
        { name: 'Colorado', abbreviation: 'CO' },
        { name: 'Connecticut', abbreviation: 'CT' },
        { name: 'Delaware', abbreviation: 'DE' },
        { name: 'Florida', abbreviation: 'FL' },
        { name: 'Georgia', abbreviation: 'GA' },
        { name: 'Hawaii', abbreviation: 'HI' },
        { name: 'Idaho', abbreviation: 'ID' },
        { name: 'Illinois', abbreviation: 'IL' },
        { name: 'Indiana', abbreviation: 'IN' },
        { name: 'Iowa', abbreviation: 'IA' },
        { name: 'Kansas', abbreviation: 'KS' },
        { name: 'Kentucky', abbreviation: 'KY' },
        { name: 'Louisiana', abbreviation: 'LA' },
        { name: 'Maine', abbreviation: 'ME' },
        { name: 'Maryland', abbreviation: 'MD' },
        { name: 'Massachusetts', abbreviation: 'MA' },
        { name: 'Michigan', abbreviation: 'MI' },
        { name: 'Minnesota', abbreviation: 'MN' },
        { name: 'Mississippi', abbreviation: 'MS' },
        { name: 'Missouri', abbreviation: 'MO' },
        { name: 'Montana', abbreviation: 'MT' },
        { name: 'Nebraska', abbreviation: 'NE' },
        { name: 'Nevada', abbreviation: 'NV' },
        { name: 'New Hampshire', abbreviation: 'NH' },
        { name: 'New Jersey', abbreviation: 'NJ' },
        { name: 'New Mexico', abbreviation: 'NM' },
        { name: 'New York', abbreviation: 'NY' },
        { name: 'North Carolina', abbreviation: 'NC' },
        { name: 'North Dakota', abbreviation: 'ND' },
        { name: 'Ohio', abbreviation: 'OH' },
        { name: 'Oklahoma', abbreviation: 'OK' },
        { name: 'Oregon', abbreviation: 'OR' },
        { name: 'Pennsylvania', abbreviation: 'PA' },
        { name: 'Rhode Island', abbreviation: 'RI' },
        { name: 'South Carolina', abbreviation: 'SC' },
        { name: 'South Dakota', abbreviation: 'SD' },
        { name: 'Tennessee', abbreviation: 'TN' },
        { name: 'Texas', abbreviation: 'TX' },
        { name: 'Utah', abbreviation: 'UT' },
        { name: 'Vermont', abbreviation: 'VT' },
        { name: 'Virginia', abbreviation: 'VA' },
        { name: 'Washington', abbreviation: 'WA' },
        { name: 'West Virginia', abbreviation: 'WV' },
        { name: 'Wisconsin', abbreviation: 'WI' },
        { name: 'Wyoming', abbreviation: 'WY' }
    ];

    const { token, signOut } = useAuth();

    const [eventName, setEventName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [inputAddress, setInputAddress] = useState('');
    const [inputAddress2, setInputAddress2] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputZip, setInputZip] = useState('');

    const [date_time, setDateTime] = useState(null);
    const [Phonevalue, PhonesetValue] = useState()
    const [expertiseLevel, setExpertiseLevel] = useState('Beginner');
    const [peopleCount, setPeopleCount] = useState(1);
    const [selectedState, setSelectedState] = useState('');
    const [newSport, setNewSport] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState(['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis']);
    const [textAreaValue, setTextAreaValue] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const [showAddSport, setShowAddSport] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleShowAddSport = () => setShowAddSport(true);
    const handleCloseAddSport = () => setShowAddSport(false);

    const handleShowConfirmation = () => setShowConfirmation(true);
    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        setEventName('');
        setFirstName('');
        setLastName('');
        setInputAddress('');
        setInputAddress2('');
        setInputCity('');
        setInputZip('');
        setDateTime(null);
        PhonesetValue('');
        setPeopleCount(1);
        setSelectedState('');
        setNewSport('');
        setSelectedSport('');
        setTextAreaValue('');
        // Reset form fields here
    };

    const handleDateChange = (date) => {
        setDateTime(date);
    };

    const handleSportChange = (event) => {
        if (event.target.value === 'add-sport') {
            handleShowAddSport();
        } else {
            setSelectedSport(event.target.value);
        }
    };

    const handleNewSportChange = (event) => {
        setNewSport(event.target.value);
    };

    const handleSaveChanges = () => {
        setSports([...sports, newSport]);
        setSelectedSport(newSport);
        handleCloseAddSport();
    };

    const handleRangeChange = (event) => {
        const value = parseInt(event.target.value);
        let level = 'Beginner';
        if (value === 1) {
          level = 'Intermediate';
        } else if (value === 2) {
          level = 'Advanced';
        } else if (value === 3) {
          level = 'Expert';
        }
        setExpertiseLevel(level);
    };

    const handlePeopleCountChange = (event) => {
        const newCount = Math.max(1, Math.min(25, Number(event.target.value)));
        setPeopleCount(newCount);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const { userId } = useAuth();

    const handleSubmit = (event) => {
        // Prevent the default form submission
        event.preventDefault();
        let finalTextAreaValue = textAreaValue;
        if (textAreaValue.trim() === '') {
            finalTextAreaValue = 'N/A';
        }
        
        // Gather the data from the form fields
        const eventData = {
            user: userId,
            sport: document.getElementById('sport').value,
            eventname: document.getElementById('eventName').value,
            members: document.getElementById('peopleCount').value,
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            location_address: document.getElementById('inputAddress').value,
            location_city: document.getElementById('inputCity').value,
            location_state: document.getElementById('inputState').value,
            location_zip: document.getElementById('inputZip').value,
            datetime: date_time, 
            phonenum: document.getElementById('inputPhoneNumber').value,
            info: finalTextAreaValue,
            skill: expertiseLevel
        };
        console.log(eventData);
    
        // Send a POST request to the Django server
        axios.post('/api/api/sportevents/', eventData)
            .then(response => {
                console.log(response);
                // Handle successful response here
            })
            .catch(error => {
                console.error(error);
                // Handle error here
            });
        handleShowConfirmation();
    };

    useEffect(() => {
        document.title = 'Create/Edit - Sports Matchup';
    }, []);

    if (!token) {
        console.log(`Navigating to login`)
        return <Navigate to="/login" />;
    }

    const handleSignOut = () => {
        // Call the signOut function to log the user out
        signOut();
        navigate('/profile');
    };

    return (
        <main>
            <section className='bg-light bg-text-light p-2'>
                <h1 className="text-center mb-2"> Create Event</h1>
                <div className = "container mb-3">
                    <form className="row g-3" id="input-form" onSubmit={handleSubmit}>
                        <div className="container mb-3">
                            <label for="eventName" className="form-label">Event Name:</label>
                            <input type="text" className="form-control" id="eventName" placeholder="Enter the name of the event" value={eventName} onChange={e => setEventName(e.target.value)} required/>
                        </div>
                        <div className = "container mb-3">
                            <div className="row">
                                <div className="col">
                                    <label for="firstName" className="form-label">Full Name:</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                                </div>
                                <div className="col">
                                    <label for="lastName" className="form-label"></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="col">
                                    <label for="inputSport" className="form-label">Sport:</label>
                                    <select className="form-control" id="sport" value={selectedSport} onChange={handleSportChange} required>
                                        <option value="" disabled>Select Sport...</option>
                                        {sports.map((sport, index) => (
                                            <option key={index} value={sport}>{sport}</option>
                                        ))}
                                        <option value="add-sport">Other...</option>
                                    </select>

                                    <Modal show={showAddSport} onHide={handleCloseAddSport}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add a Sport</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <input type="text" className="form-control" placeholder="Enter sport name" onChange={handleNewSportChange} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseAddSport}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={handleSaveChanges}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <div className="col">
                                    <label for="inputPhoneNumber" className="form-label">Phone Number:</label>
                                    <PhoneInput placeholder="Enter phone number" defaultCountry="US" value={Phonevalue} onChange={PhonesetValue} id="inputPhoneNumber" required/>
                                </div>
                            </div>
                        </div>

                        <div className="container mb-3">
                            <label for="inputAddress" className="form-label">Address or Venue Name:</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={inputAddress} onChange={e => setInputAddress(e.target.value)} required/>
                        </div>
                        <div className="container mb-3">
                            <label for="inputAddress2" className="form-label">Address 2:</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                        </div>

                        <div className="container mb-3">
                            <div className='row'>
                                <div className="col">
                                    <label for="inputCity" className="form-label">City:</label>
                                    <input type="text" className="form-control" id="inputCity" value={inputCity} onChange={e => setInputCity(e.target.value)} required/>
                                </div>
                                <div className="col">
                                    <label htmlFor="inputState" className="form-label">State:</label>
                                    <select id="inputState" className="form-select" value={selectedState} onChange={handleStateChange} required>
                                        <option value="" selected disabled>Choose...</option>
                                        {states.map((state, index) => (
                                            <option key={index} value={state.abbreviation}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col">
                                    <label for="inputZip" className="form-label">Zip:</label>
                                    <input type="text" className="form-control" id="inputZip" value={inputZip} onChange={e => setInputZip(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Date and Time:</label>
                                    <Datetime id="inputDateTime" onChange={handleDateChange} required/>
                                </div>
                                <div className="col">
                                    <label htmlFor="peopleCount" className="form-label">Maximum Number of People:</label>
                                    <input type="number" className="form-control" id="peopleCount" min="1" max="25" value={peopleCount} onChange={handlePeopleCountChange} required/>
                                    <div id="peopleDisplay" className="mt-1 add-padding">{peopleCount} out of 25</div>
                                </div>
                            </div>
                        </div>

                        <div className="container mb-2">
                            <label htmlFor="descriptionBox" className="form-label">Additional Information:</label>
                            <textarea className="form-control" id="descriptionBox" rows="4" placeholder="Enter any additional notes or information here..." value={textAreaValue} onChange={handleTextAreaChange}></textarea>
                        </div>

                        <div className="container mb-3 mt-3">
                            <label for="customRange2" className="form-label mb-3">Level Of Expertise:</label>
                            <input type="range" className="form-range" min="0" max="3" id="customRange2" defaultValue="0" onChange={handleRangeChange} required/>
                            <div className="add-padding" id="rangeValue">{expertiseLevel}</div>
                        </div>

                        <div className="btn-toolbar justify-content-between mt-2">
                            <div className='btn-group'>
                                <button type="button" className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="reset" className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                        <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Your event was created successfully!</Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseConfirmation}>
                                Done
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </section>

        </main>
    );
};

export default CreateEdit;