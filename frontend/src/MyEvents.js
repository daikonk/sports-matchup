// .MyEvents.js
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import './App.css'

const MyEvents = () => {

    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    
    const [events, setEvents] = useState([]);
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const [selectedSkill, setSelectedSkill] = useState('');

    const handleSkillChange = (event) => {
        setSelectedSkill(event.target.value);
    };

    const [newSport, setNewSport] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [sports, setSports] = useState(['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis']);
    const [showAddSport, setShowAddSport] = useState(false);
    const handleShowAddSport = () => setShowAddSport(true);
    const handleCloseAddSport = () => setShowAddSport(false);

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

    const { userId, token } = useAuth();

    useEffect(() => {
        axios.get(`/api/api/sportevents/?user=${userId}`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const [datetimeValue, setDatetimeValue] = useState(null);

    // Update datetimeValue whenever currentEvent changes
    useEffect(() => {
        if (currentEvent) {
            setDatetimeValue(new Date(currentEvent.datetime));
        }
    }, [currentEvent]);

    const handleDateChange = (date) => {
        // Convert the date to an ISO string
        const isoDate = date.toISOString();

        // Update the datetime field of currentEvent
        setCurrentEvent({...currentEvent, datetime: isoDate});

        // Update the Datetime component's value
        setDatetimeValue(date);
    };

    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // }

    const handleSort = (field) => {
        let direction = 'asc';
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedEvents = [...events].sort((a, b) => {
        if (sortField === 'skill') {
            return skillLevels.indexOf(a[sortField]) - skillLevels.indexOf(b[sortField]);
        }
        if (sortField === 'datetime') {
            // Convert the dates to Date objects
            const dateA = new Date(a[sortField]);
            const dateB = new Date(b[sortField]);
    
            // Use the getTime method to get the time value in milliseconds
            return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        } else {
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }
    });

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setShowModal(true);
    };

    // Function to handle closing of the modal
    const handleClose = () => {
        setShowModal(false);
    };

    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Make an API call to update the event
        axios.put(`http://localhost:8000/api/sportevents/${currentEvent.id}/`, currentEvent)
        .then(response => {
            // Handle successful update
            console.log('Event updated successfully');
            console.log(currentEvent);
            setEvents(events.map(event => event.id === currentEvent.id ? response.data : event));
            setShowModal(false);  // Close the modal
        })
        .catch(error => {
            // Handle error
            console.error('There was an error updating the event!', error);
        });
        setShowModal(false);
    };

    useEffect(() => {
        document.title = 'My Events - Sports Matchup';
      }, []);

    if (!token) {
    console.log(`Navigating to login`)
    return <Navigate to="/login" />;
    }

    return (
        <main>
            <h1 className="text-center"> My Events</h1>
            <section id="created-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h3 className="mt-4">Created:</h3>
                    <div id="eventsFilter" className="mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('sport')}>Sport</th>
                                    <th onClick={() => handleSort('datetime')}>Date</th>
                                    <th onClick={() => handleSort('datetime')}>Time</th>
                                    <th onClick={() => handleSort('location_address')}>Location</th>
                                    <th onClick={() => handleSort('location_city')}>City</th>
                                    <th onClick={() => handleSort('members')}>Members</th>
                                    <th onClick={() => handleSort('skill')}>Skill Level</th>
                                    <th onClick={() => handleSort('eventname')}>Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEvents.map(event => {
                                    const date = new Date(event.datetime);

                                    // Format the date and time
                                    const formattedDate = date.toLocaleDateString();
                                    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <tr key={event.id}>
                                            <td>{event.sport}</td>
                                            <td>{formattedDate}</td>
                                            <td>{formattedTime}</td>
                                            <td>{event.location_address}</td>
                                            <td>{event.location_city}</td>
                                            <td>{event.members}</td>
                                            <td>{event.skill}</td>
                                            <td>{event.eventname}</td>
                                            <td>
                                                <Button 
                                                    variant='secondary' 
                                                    className='centered-button' 
                                                    onClick={() => handleEdit(event)}>
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="joined-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h3 className="mt-4">Joined:</h3>
                    <div id="eventsFilter-participating" className="mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('sport')}>Sport</th>
                                    <th onClick={() => handleSort('datetime')}>Date</th>
                                    <th onClick={() => handleSort('datetime')}>Time</th>
                                    <th onClick={() => handleSort('location_address')}>Location</th>
                                    <th onClick={() => handleSort('location_city')}>City</th>
                                    <th onClick={() => handleSort('members')}>Members</th>
                                    <th onClick={() => handleSort('skill')}>Skill Level</th>
                                    <th onClick={() => handleSort('eventname')}>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEvents.map(event => {
                                    const date = new Date(event.datetime);

                                    // Format the date and time
                                    const formattedDate = date.toLocaleDateString();
                                    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <tr key={event.id}>
                                            <td>{event.sport}</td>
                                            <td>{formattedDate}</td>
                                            <td>{formattedTime}</td>
                                            <td>{event.location_address}</td>
                                            <td>{event.location_city}</td>
                                            <td>{event.members}</td>
                                            <td>{event.skill}</td>
                                            <td>{event.eventname}</td>
                                        </tr>
                                    );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>  

            <Modal show={showModal} onHide={handleClose} size='lg'>
                <Modal.Header className='bg-custom' closeButton>
                    <Modal.Title className='custom-color modal-title'>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        
                        <Row className='mb-2'>
                            <Form.Group as={Col} controlId="formEventName">
                                <Form.Label>Event Name:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.eventname : ''} onChange={e => setCurrentEvent({...currentEvent, eventname: e.target.value})} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formSport">
                                <Form.Label>Sport:</Form.Label>
                                <Form.Select value={currentEvent ? currentEvent.sport : ''} onChange={e => setCurrentEvent({...currentEvent, sport: e.target.value})}>
                                    <option value="" disabled>Select Sport...</option>
                                    {sports.map((sport, index) => (
                                        <option key={index} value={sport}>{sport}</option>
                                    ))}
                                    {/* <option value="add-sport">Other...</option> */}
                                </Form.Select>
                                
                            </Form.Group>
                        </Row>
                        
                        <Row className='mb-2'>
                            <Form.Group as={Col} controlId="formFirstName">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.firstname : ''} onChange={e => setCurrentEvent({...currentEvent, firstname: e.target.value})} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formLastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.lastname : ''} onChange={e => setCurrentEvent({...currentEvent, lastname: e.target.value})} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formPhoneNum">
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control type="tel" value={currentEvent ? currentEvent.phonenum : ''} onChange={e => setCurrentEvent({...currentEvent, phonenum: e.target.value})} />
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className='mb-2' controlId="formLocationAddress">
                            <Form.Label>Address/Venue Name:</Form.Label>
                            <Form.Control type="text" value={currentEvent ? currentEvent.location_address : ''} onChange={e => setCurrentEvent({...currentEvent, location_address: e.target.value})} />
                        </Form.Group>

                        <Row className='mb-2'>
                            <Form.Group as={Col} controlId="formLocationCity">
                                <Form.Label>City:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.location_city : ''} onChange={e => setCurrentEvent({...currentEvent, location_city: e.target.value})} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formLocationState">
                                <Form.Label>State:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.location_state : ''} onChange={e => setCurrentEvent({...currentEvent, location_state: e.target.value})} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formLocationZip">
                                <Form.Label>Zip:</Form.Label>
                                <Form.Control type="text" value={currentEvent ? currentEvent.location_zip : ''} onChange={e => setCurrentEvent({...currentEvent, location_zip: e.target.value})} />
                            </Form.Group>
                        </Row>
                        
                        <Row className='mb-2'>
                        <Form.Group as={Col} controlId="formDateTime">
                            <Form.Label>Date and Time:</Form.Label>
                            <Datetime 
                                id="inputDateTime" 
                                value={datetimeValue} 
                                onChange={handleDateChange} 
                                required
                            />
                        </Form.Group>
                            <Form.Group as={Col} controlId="formMembers">
                                <Form.Label>Members:</Form.Label>
                                <Form.Control type="number" value={currentEvent ? currentEvent.members : 0} onChange={e => setCurrentEvent({...currentEvent, members: e.target.value})} />
                            </Form.Group>
                        </Row>

                        <Form.Group className='mb-2' controlId="formInfo">
                            <Form.Label>Info:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={currentEvent ? currentEvent.info : ''} onChange={e => setCurrentEvent({...currentEvent, info: e.target.value})} />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId="formSkill">
                            <Form.Label>Skill Level:</Form.Label>
                            <Form.Select value={currentEvent ? currentEvent.skill : ''} onChange={e => setCurrentEvent({...currentEvent, skill: e.target.value})}>
                                <option value="" selected disabled>Select Skill Level</option>
                                {skillLevels.map((skill, index) => (
                                    <option key={index} value={skill}>{skill}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className="btn-toolbar justify-content-between mt-2">
                            <div className='btn-group'/>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary edit-modal-btns" onClick={handleSubmit}>Save</button>
                                <button type="reset" className="btn btn-secondary edit-modal-btns" onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

        </main>
    );
};

export default MyEvents;