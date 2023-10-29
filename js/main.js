const categoryModal = new bootstrap.Modal(document.getElementById("categoryModal"));

// Function to open the modal
function openCategoryModal() {
    categoryModal.show();
}

// Function to close the modal
function closeCategoryModal() {
    categoryModal.hide();
}

function sportsArray() {
    return ["Football", "Basketball", "Tennis", "Soccer", "Baseball", "Golf", "Swimming", "Running", "Hockey", "Volleyball"]
}

document.addEventListener('DOMContentLoaded', function() {
    var sports1 = sportsArray();
    var selectSport = document.getElementById("sport_pref");

    // Access the select element
    var skills = ["Beginner", "Intermediate", "Advanced", "Expert"];
    var selectSkill = document.getElementById('skill');

    // Populate the select element with sports options
    for (var i = 0; i < sports1.length; i++) {
        var option = document.createElement('option');
        option.text = sports1[i];
        option.value = sports1[i];
        selectSport.add(option);
    }

    // Populate the select element with skill options
    for (var i = 0; i < skills.length; i++) {
        var option = document.createElement('option');
        option.text = skills[i];
        option.value = skills[i];
        selectSkill.add(option);
    }
    
    selectSport.addEventListener("change", (e) => {
        if (e.target.value === "+ Add New Sport") {
            e.target.value = ""; // Reset the select value before opening the modal
            openCategoryModal();
        }
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Array of sports and skill options
    var sports = sportsArray();
    var selectSport = document.getElementById("sport");
    var eventsFilter = document.getElementById('eventsFilter');

    // Sample event data
    var allEvents = [
        { sport: "Football", name: "Football Game", skill:'Advanced', location: "Snapdragon Stadium", date: "11/05/2023" },
        { sport: "Soccer", name: "Soccer Match", skill: 'Intermediate',location: "Allen Field", date: "11/22/2023" },
        { sport: "Basketball", name: "Pickup Game", skill: 'Beginner', location: "San Diego Community Center", date: "12/05/2023" },
        { sport: "Tennis", name: "Training Camp", skill: 'Beginner',location: "Del Cerro Tennis Club", date: "11/12/2023" },
        { sport: "Basketball", name: "2v2 Pickup", skill: 'Intermediate',location: "Aztec Recreation Center", date: "11/02/2023" },
        { sport: "Baseball", name: "Full 9 Inning Game", skill: 'Expert',location: "Petco Park", date: "12/01/2023" },
        { sport: "Golf", name: "18 Hole 4 Person", skill: 'Advanced',location: "Torrey Pines Golf Course", date: "11/16/2023" }
        // Add more events here - will be updated with database values
    ];

    for (var i = 0; i < sports.length; i++) {
        var option = document.createElement('option');
        option.text = sports[i];
        option.value = sports[i];
        selectSport.add(option);
    }

    // Function to display events as a table
    function displayEvents(events) {
        eventsFilter.innerHTML = ""; // Clear previous results

        if (events.length === 0) {
            eventsFilter.innerHTML = "No events available for the selected sport.";
        } else {
            var table = document.createElement('table');
            table.classList.add("table");

            var thead = table.createTHead();
            var row = thead.insertRow();
            var headers = ["Sport", "Event", "Location", "Skill", "Date"];
            for (var i = 0; i < headers.length; i++) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(headers[i]));
                row.appendChild(th);
            }

            var tbody = table.createTBody();
            events.forEach(function(event) {
                var row = tbody.insertRow();
                var cell1 = row.insertCell();
                var cell2 = row.insertCell();
                var cell3 = row.insertCell();
                var cell4 = row.insertCell();
                var cell5 = row.insertCell()
                cell1.appendChild(document.createTextNode(event.sport));
                cell2.appendChild(document.createTextNode(event.name));
                cell3.appendChild(document.createTextNode(event.location));
                cell4.appendChild(document.createTextNode(event.skill));
                cell5.appendChild(document.createTextNode(event.date));
            });

            eventsFilter.appendChild(table);
        }
    }

    

    // Initial display of all events
    displayEvents(allEvents);

    var selectSport = document.getElementById("sport-participating");
    var eventsFilter = document.getElementById('eventsFilter-participating');

    var participatingEvents = [
        { sport: "Football", name: "Football Game", skill:'Advanced', location: "Snapdragon Stadium", date: "11/05/2023" },
        { sport: "Soccer", name: "Soccer Match", skill: 'Intermediate',location: "Allen Field", date: "11/22/2023" },
        // Add more events here - will be updated with database values
    ];

    displayEvents(participatingEvents);

    var eventsFilter = document.getElementById('eventsFilter-pending');

    var pendingEvents = [
        { sport: "Basketball", name: "Pickup Game", skill: 'Beginner', location: "San Diego Community Center", date: "12/05/2023" },
        { sport: "Tennis", name: "Training Camp", skill: 'Beginner',location: "Del Cerro Tennis Club", date: "11/12/2023" },
        { sport: "Basketball", name: "2v2 Pickup", skill: 'Intermediate',location: "Aztec Recreation Center", date: "11/02/2023" },
        { sport: "Baseball", name: "Full 9 Inning Game", skill: 'Expert',location: "Petco Park", date: "12/01/2023" },
        { sport: "Golf", name: "18 Hole 4 Person", skill: 'Advanced',location: "Torrey Pines Golf Course", date: "11/16/2023" }
        // Add more events here - will be updated with database values
    ];
    
    displayEvents(pendingEvents);

    // Event listener for sport selection change
    selectSport.addEventListener('change', function() {
        var selectedSport = selectSport.value;
        if (selectedSport === "") {
            displayEvents(allEvents); // Display all events if no sport is selected
        } else {
            var filteredEvents = allEvents.filter(function(event) {
                return event.sport === selectedSport;
            });
            displayEvents(filteredEvents); // Display filtered events
        }
    });
});
