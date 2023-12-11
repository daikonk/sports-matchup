// .MyEvents.js
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import hockeyImage from './images/sports-hockey.png';
import tennisImage from './images/sports-tennis.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const MyEvents = () => {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    
    const [events, setEvents] = useState([]);
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const { userId, token } = useAuth();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/sportevents/?user=${userId}`)
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
            <section id="discover-events">
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

            <section id="discover-events">
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

 
            
        </main>
    );
};

export default MyEvents;