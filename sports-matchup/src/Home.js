// Home.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import './App.css'
import home_png from './images/home.png'

const Home = () => {
    const location = useLocation();
    useEffect(() => {
        switch (location.hash) {
          case '#discover-events':
            document.title = 'Discover Events - Sports Matchup';
            break;
          // other cases...
          default:
            document.title = 'Home - Sports Matchup';
        }
      }, [location]);

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
                                <select className="form-control" id="sport">
                                    <option value="" selected disabled>Select Sports...</option>
                                </select>
                            </div>
                        </div>
                        <div id="categoryModal" className="modal" tabindex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title">Add New Sport</h2>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <label for="newCategory"></label>
                                        <input type="text" className="form-control" id="newCategory" placeholder="New Category"/>
                                        <button id="addCategory" className="btn btn-primary mt-2">Add Sport</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h3 className="mt-4">Events in your Area:</h3>
                    <div id="eventsFilter" className="mt-3"></div>
                </div>
            </section>
        </main>
        
    );
};

export default Home;
