// Profile.js
import React, { useEffect } from 'react';
import profile_pic from './images/profile.png'

const Profile = () => {
    useEffect(() => {
        document.title = 'Profile - Sports Matchup';
      }, []);

    return (
        <main>
            <section>
                <div className="container text-center mt-4 bg-light text-bg-light py-2">
                    <h2>Profile Information</h2>
                    <div className="row">
                        <div className="col-3">
                            <label for="file-input" className="profile-pic-btn">
                                <img id="profile-picture" src={profile_pic} alt="Profile Picture" className="img-fluid"/>
                            </label>
                            <input type="file" id="file-input" className="file-input"/>
                        </div>
                        <div className="col-9">
                            <form id="form" className="mt-4">
                                {/* <!-- NAME --> */}
                                <div className="form-group row mt-1">
                                    <label for="name" className="col-sm-2 col-form-label">Name:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name"/>
                                    </div>
                                </div>

                                {/* <!-- AGE --> */}
                                <div className="form-group row mt-1">
                                    <label for="age" className="col-sm-2 col-form-label">Age:</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="age" placeholder="Enter your age"/>
                                    </div>
                                </div>

                                {/* <!-- SPORTS --> */}
                                <div className="form-group row mt-1">
                                    <label for="sport_pref" className="col-sm-2 col-form-label">Sports Preferences:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="sport_pref">
                                            <option value="" selected disabled>Select Sports...</option>
                                            <option>+ Add New Sport</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <!-- Modal for adding a new sport --> */}
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
                                
                                {/* <!-- SKILL --> */}
                                <div className="form-group row mt-1">
                                    <label for="skill" className="col-sm-2 col-form-label">Skill Level:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="skill">
                                            <option value="" selected disabled>Select Skill Level</option>
                                        </select>
                                    </div>
                                </div>
                                
                                {/* <!-- LOCATION --> */}
                                <div className="form-group row mt-1">
                                    <label for="location" className="col-sm-2 col-form-label">Location:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="location" placeholder="Enter your city"/>
                                    </div>
                                </div>

                                {/* <!-- EMAIL --> */}
                                <div className="form-group row mt-1">
                                    <label for="email" className="col-sm-2 col-form-label">Email:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="email" placeholder="Enter your email"/>
                                    </div>
                                </div>
                                
                                {/* <!-- PHONE --> */}
                                <div className="form-group row mt-1">
                                    <label for="phone" className="col-sm-2 col-form-label">Phone #:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="phone" placeholder="Enter your number"/>
                                    </div>
                                </div>

                                {/* <!-- BUTTONS --> */}
                                <div className="row mt-2">
                                    <div className="col-sm-6">
                                        <button type="button" className="btn btn-danger">Sign Out</button>
                                    </div>
                                    <div className="col-sm-2">
                                        
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