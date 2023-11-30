// Home.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import home_png from './images/home.png'
import events from './event_info.json'
const Home = () => {
    const location = useLocation();
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [selectedSport, setSelectedSport] = useState('');

    useEffect(() => {
        switch (location.hash) {
          case '#discover-events':
            document.title = 'Discover Events - Sports Matchup';
            break;
          default:
            document.title = 'Home - Sports Matchup';
        }
      }, [location]);

    const handleSort = (field) => {
        let direction = 'asc';
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedEvents = [...events].sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
    };

    const filteredEvents = sortedEvents.filter(event => !selectedSport || event.sport === selectedSport);


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
                                    <option value="" selected>Select Sport...</option>
                                    <option value="Basketball">Basketball</option>
                                    <option value="Baseball">Baseball</option>
                                    <option value="Soccer">Soccer</option>
                                    <option value="Football">Football</option>
                                    <option value="Volleyball">Volleyball</option>
                                    <option value="Hockey">Hockey</option>
                                    <option value="Golf">Golf</option>
                                    <option value="Tennis">Tennis</option>
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
                                    <th onClick={() => handleSort('location')}>Location</th>
                                    <th onClick={() => handleSort('members')}>Members</th>
                                    <th onClick={() => handleSort('title')}>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.sport}</td>
                                        <td>{event.location}</td>
                                        <td>{event.members}</td>
                                        <td>{event.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
        
    );
};

export default Home;
