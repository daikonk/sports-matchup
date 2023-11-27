// .MyEvents.js
import React, { useEffect, useState} from 'react';
import events from './event_info.json'

const MyEvents = () => {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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

    useEffect(() => {
        document.title = 'My Events - Sports Matchup';
      }, []);

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
                                    <th onClick={() => handleSort('location')}>Location</th>
                                    <th onClick={() => handleSort('members')}>Members</th>
                                    <th onClick={() => handleSort('title')}>Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEvents.map(event => (
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

            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h3 className="mt-4">Participating:</h3>
                    <div id="eventsFilter-participating" className="mt-3">
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
                                {sortedEvents.map(event => (
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

            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h3 className="mt-4">Pending:</h3>
                    <div id="eventsFilter-pending" className="mt-3">
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
                                {sortedEvents.map(event => (
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

export default MyEvents;