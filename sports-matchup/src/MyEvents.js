// .MyEvents.js
import React, { useEffect } from 'react';

const MyEvents = () => {
    useEffect(() => {
        document.title = 'My Events - Sports Matchup';
      }, []);

    return (
        <main>
            <h1 className="text-center"> My Events</h1>
            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <form id="form" className="mt-4">
                        
                        <div id="categoryModal" className="modal" tabindex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <label for="newCategory"></label>
                                        <input type="text" className="form-control" id="newCategory" placeholder="New Category"/>
                                        <button id="addCategory" className="btn btn-primary mt-2">Add Sport</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h3 className="mt-4">Created:</h3>
                    <div id="eventsFilter" className="mt-3"></div>
                </div>
            </section>

            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <form id="form" className="mt-4">
                        
                        <div id="categoryModal" className="modal" tabindex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title">Add New Sport</h2>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        <select className="form-control invisible" id="sport-participating"></select>
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
                    <h3 className="mt-4">Participating:</h3>
                    <div id="eventsFilter-participating" className="mt-3"></div>
                </div>
            </section>

            <section id="discover-events">
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <form id="form" className="mt-4">
            
                        <div id="categoryModal" className="modal" tabindex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title">Add New Sport</h2>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                        <select className="form-control invisible" id="sport"></select>
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
                    <h3 className="mt-4">Pending:</h3>
                    <div id="eventsFilter-pending" className="mt-3"></div>
                </div>
            </section>
            
        </main>
    );
};

export default MyEvents;