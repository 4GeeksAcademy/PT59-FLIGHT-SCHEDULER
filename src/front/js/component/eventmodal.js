import React, { useState, useEffect } from 'react';
import axios from 'axios';
//include images into your bundle
import { useParams } from 'react-router';

//create your first component
const Eventactions = () => {
	const [event, setEvent] = useState("");
	const [events, setEvents] = useState([]);
	const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/NicholasDuenas";

	useEffect(async () => {
		// Define the API endpoint
		getEvents()
	}, []);

	useEffect(() => {
		console.log("This function will run any time events change.");
		updateApi()
	}, [events])

	const putNewEvent = async (inputValue) => {
		const newEvent = events.concat([{label: inputValue, done: false}])
		// Make a PUT request
		try {
			await axios.put(apiUrl, newEvent)
		} catch (error) {
			console.error('Error fetching data', error)
		}
	}
	
	const updateApi = async () => {
		try {
			await axios.put(apiUrl, events)
		} catch (error) {
			console.error('Error fetching data', error)
		}
	}

	const getEvents = async () => {
		// Make a GET request
		try {
			const res = await axios.get(apiUrl)
			setEvents(res.data)
		} catch (error) {
			console.error('Error fetching data', error)
		}
	}

	const handleDelete = async () => {
		try {
		// Make a DELETE request using Axios
		await axios.delete(`https://playground.4geeks.com/apis/fake/todos/user/NicholasDuenas`);
		window.location.reload();
	
		// Handle success, e.g., show a success message or update the UI
		console.log('Event deleted successfully');
		} catch (error) {
		// Handle error, e.g., show an error message or log the error
		console.error('Error deleting event:', error);
		}
	};


	// //{item}{""}<i classNamename="fa-solid fa-xmark" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
	return (
		<div classNameName="container">
			{/* <!-- Button trigger modal --> */}
			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
			Launch demo modal
			</button>

			{/* <!-- Modal --> */}
			<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<div className="App">
							<h2>Add New Event</h2>
							<div>
								<input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newFlight.title} onChange={(e) => setnewFlight({ ...newFlight, title: e.target.value })} />
								<DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newFlight.start} onChange={(start) => setnewFlight({ ...newFlight, start })} />
								<DatePicker placeholderText="End Date" selected={newFlight.end} onChange={(end) => setnewFlight({ ...newFlight, end })} />
								<button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
									Add Event
								</button>
							</div>
							<Calendar localizer={localizer} events={allFlights} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" classNameName="btn btn-secondary" onClick={handleDelete}>Delete</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Eventactions;