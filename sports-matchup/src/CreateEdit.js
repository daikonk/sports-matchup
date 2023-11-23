// CreateEdit.js
import React, { useEffect, useState} from 'react';

const CreateEdit = () => {
    const [expertiseLevel, setExpertiseLevel] = useState('Beginner');
    const [peopleCount, setPeopleCount] = useState(1);
    const [selectedState, setSelectedState] = useState('');

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
        const newCount = Math.max(1, Math.min(10, Number(event.target.value)));
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
                <h1 className="text-center mb-5"> Create Event</h1>
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
                        <select className="form-control" id="sport">
                            <option value="" selected disabled>Select Sport...</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="soccer">Soccer</option>
                            <option value="football">Football</option>
                            <option value="volleyball">Volleyball</option>
                            <option value="hockey">Hockey</option>
                            <option value="golf">Golf</option>
                            <option value="tennis">Tennis</option>
                            <option value="add-sport">Other</option>
                        </select>
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
                                <option value="">Choose...</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                        <label for="inputZip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="inputZip"/>
                        </div>
                        <div className="container mt-3">
                            <label htmlFor="peopleCount" className="form-label">Maximum Number of People:</label>
                            <input type="number" className="form-control" id="peopleCount" min="1" max="10" value={peopleCount} onChange={handlePeopleCountChange}/>
                            <div id="peopleDisplay" className="mt-2">{peopleCount} out of 10</div>
                        </div>
                        <div className="container mt-3">
                            <label for="descriptionBox" className="form-label">Additional Information:</label>
                            <textarea className="form-control" id="descriptionBox" rows="4" placeholder="Enter any additional notes or information here..."></textarea>
                        </div> 
                        <div className="container mb-3">
                            <label for="customRange2" className="form-label">Level Of Expertise</label>
                            <input type="range" className="form-range" min="0" max="3" id="customRange2" onChange={handleRangeChange}/>
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