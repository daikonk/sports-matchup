// CreateEdit.js
import React, { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

    const [expertiseLevel, setExpertiseLevel] = useState('Beginner');
    const [peopleCount, setPeopleCount] = useState(1);
    const [selectedState, setSelectedState] = useState('');
    const [show, setShow] = useState(false);
    const [newSport, setNewSport] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState(['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis']);
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

    useEffect(() => {
        document.title = 'Create/Edit - Sports Matchup';
    }, []);

    return (
        <main>
            <section className='bg-light bg-text-light'>
                <h1 className="text-center mb-2"> Create Event</h1>
                <div className="container mb-5">
                    <label for="eventName" className="form-label">Event Name</label>
                    <input type="text" className="form-control" id="eventName" placeholder="Enter the name of the event"/>
                </div>
                <div className = "container mb-3">
                    <form className="row g-3">
                        <div className = "container mb-3">
                            <div className="row">
                                <div className="col">
                                <input type="text" className="form-control" placeholder="First name" aria-label="First name"/>
                                </div>
                                <div className="col">
                                <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <label for="inputSport4" className="form-label">Sport</label>
                        <select className="form-control" id="sport" value={selectedSport} onChange={handleSportChange}>
                            <option value="" disabled>Select Sport...</option>
                            {sports.map((sport, index) => (
                                <option key={index} value={sport.toLowerCase()}>{sport}</option>
                            ))}
                            <option value="add-sport">Other...</option>
                        </select>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add a Sport</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type="text" className="form-control" placeholder="Enter sport name" onChange={handleNewSportChange} />
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
                        <div className="col-md-6">
                        <label for="inputPhoneNumber4" className="form-label">Phone Number</label>
                        <input type="phoneNumber" className="form-control" id="inputPhoneNumber4"/>
                        </div>
                        <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                        </div>
                        <div className="col-12">
                        <label for="inputAddress2" className="form-label">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                        </div>
                        <div className="col-12">
                            <label for="inputDateTime" className="form-label">Date and Time</label>
                            <input type="datetime-local" className="form-control" id="inputDateTime"/>
                        </div>
                        <div className="col-md-6">
                        <label for="inputCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select" value={selectedState} onChange={handleStateChange}>
                                <option value="" selected disabled>Choose...</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state.abbreviation}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                        <label for="inputZip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                        </div>
                        <div className="container mt-3">
                            <label htmlFor="peopleCount" className="form-label">Maximum Number of People:</label>
                            <input type="number" className="form-control" id="peopleCount" min="1" max="25" value={peopleCount} onChange={handlePeopleCountChange}/>
                            <div id="peopleDisplay" className="mt-2">{peopleCount} out of 25</div>
                        </div>
                        <div className="container mt-3">
                            <label for="descriptionBox" className="form-label">Additional Information:</label>
                            <textarea className="form-control" id="descriptionBox" rows="4" placeholder="Enter any additional notes or information here..."></textarea>
                        </div> 
                        <div className="container mb-3">
                            <label for="customRange2" className="form-label">Level Of Expertise</label>
                            <input type="range" className="form-range" min="0" max="3" id="customRange2" defaultValue="0" onChange={handleRangeChange}/>
                            <div id="rangeValue">{expertiseLevel}</div>
                        </div> 

                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-danger">Sign Out</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="reset" className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </main>
    );
};

export default CreateEdit;