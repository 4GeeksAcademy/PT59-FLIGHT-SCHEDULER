import React, { useState, useEffect } from 'react';
import axios from 'axios';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//include images into your bundle
import { useParams } from 'react-router-dom';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const events = [
    {
        title: "Flight Schedule",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
        notes: "",
    },
];

//create your first component
const Flightactions = () => {
	const [newFlight, setNewFlight] = useState({ title: "", start: "", end: "", Hours: "" });
    const [allFlights, setAllFlights] = useState(events);
	const apiUrl = process.env.BACKEND_URL;
	// process.env.BACKEND_URL + "/admin/Reservation"

	// useEffect(async () => {
	// 	// Define the API endpoint
	// 	actions.getEvents()
	// }, []);

	useEffect(() => {
		console.log("This function will run any time events change.");
		updateApi()
	}, [events])

	const createNewEvent = async (inputValue) => {
		const newEvent = events.concat([{label: inputValue, done: false}])
		const response = await fetch(apiUrl + "reservation", {
			headers: {
				// 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
				'Content-Type': 'application/json'
			},
			  method: "POST",
			  body: JSON.stringify(newEvent)
		});
		const data = response.json();
		// window.location.reload()
	}
	
	
	// get reservation id from api when getting past crated reservations, then when updating a res pass in the id to api request
	// const updateApi = async () => {
	// 	try {
	// 		await axios.put(apiUrl + "/reservation/" + resId, events)
	// 	} catch (error) {
	// 		console.error('Error fetching data', error)
	// 	}
	// }

	const deleteReservation = async () => {
		try {
			await axios.delete(apiUrl + "reservation", {
				headers: {
					'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
					'Content-Type': 'application/json'
				},
				// Assuming newEvent is defined elsewhere
				data: JSON.stringify(newEvent)
			});
	
			// After successful deletion, reload the page
			window.location.reload();
	
			console.log('Reservation deleted successfully');
		} catch (error) {
			console.error('Error deleting reservation:', error);
		}
	};
	

	function handleAddEvent() {
        
        for (let i=0; i<allFlights.length; i++){

            const d1 = new Date (allFlights[i].start);
            const d2 = new Date(newFlight.start);
            const d3 = new Date(allFlights[i].end);
            const d4 = new Date(newFlight.end);
      
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        // Eventactions([]);
        setAllFlights([...allFlights, newFlight]);
    }


	// //{item}{""}<i className="fa-solid fa-xmark" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
	return (

		<div className="container">
			{/* <!-- Button trigger modal --> */}
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
			Launch demo modal
			</button>

			{/* <!-- Modal --> */}

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Add Flight</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="App">
							<div>
								<input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newFlight.title} onChange={(e) => setNewFlight({ ...newFlight, title: e.target.value })} />
								<DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newFlight.start} onChange={(start) => setNewFlight({ ...newFlight, start })} />
								<DatePicker placeholderText="End Date" selected={newFlight.end} onChange={(end) => setNewFlight({ ...newFlight, end })} />
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={deleteReservation}>Delete</button>
						<button type="button" className="btn btn-primary" onClick={handleAddEvent}>Save changes</button>
					</div>
					</div>
				</div>
			</div>
			<Calendar localizer={localizer} events={allFlights} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
		</div>
	);
};

export default Flightactions;