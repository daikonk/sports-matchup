// Home.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import home_png from './images/home.png'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './App.css';

const Home = () => {
    const { token } = useAuth();
    const location = useLocation();
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [events, setEvents] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    const sports = ['Basketball', 'Baseball', 'Soccer', 'Football', 'Volleyball', 'Hockey', 'Golf', 'Tennis'];
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    useEffect(() => {
        switch (location.hash) {
          case '#discover-events':
            document.title = 'Discover Events - Sports Matchup';
            break;
          default:
            document.title = 'Home - Sports Matchup';
        }
      }, [location]);

    useEffect(() => {
        axios.get('/api/api/sportevents/')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

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
    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
    };

    // const filteredEvents = sortedEvents.filter(event => !selectedSport || event.sport === selectedSport);
    const filteredEvents = sortedEvents.filter(event => {
        if (selectedSport.toLowerCase() === 'other') {
            // If "Other" is selected, include events that do not match any of the predefined sports
            return !sports.includes(event.sport);
        } else {
            // Otherwise, filter based on the selected sport
            return !selectedSport || event.sport === selectedSport;
        }
    });

    if (!token) {
        console.log(`Navigating to login`)
        return <Navigate to="/login" />;
        }

    return (
        <main>
            <section>
                <h1 className="text-center"> Sports Matchup</h1>
                <div className="container text-center mt-4 py-2 home-page">
                    <h3>A place to connect with sports' lovers like you!</h3>
                    <img id="Home page" src={home_png} alt="Home page" className="img-fluid home-page"/>
                </div>
            </section>

            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h2>Discover Events</h2>
                    <form id="form" className="mt-4">
                        <div className="form-group row mt-1">
                            <label for="search" className="col-sm-1 col-form-label">Search:</label>
                            <div className="col-sm-10">
                                <select className="form-control" id="sport" value={selectedSport} onChange={handleSportChange}>
                                    <option value="" selected>Filter Sports...</option>
                                    {sports.map((sport, index) => (
                                        <option key={index} value={sport}>{sport}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <h3 className="mt-4">Events in your Area:</h3>
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
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map(event => {
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
        </main>
        
    );
};

export default Home;
