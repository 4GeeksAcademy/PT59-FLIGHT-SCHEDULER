import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useContext, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../store/appContext";
// import "./App.css";



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

export function Thecalender() {
    const [newFlight, setNewFlight] = useState({ title: "", start: "", end: "" });
    const [allFlights, setAllFlights] = useState(events);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        async function getReservation() {
            await actions.getReservation()
            await setAllFlights(store.reservation)
        }
        getReservation()
    }, [])

    function handleAddEvent(showTimeSelect) {

        for (let i = 0; i < allFlights.length; i++) {

            const d1 = new Date(allFlights[i].start);
            const d2 = new Date(newFlight.start);
            const d3 = new Date(allFlights[i].end);
            const d4 = new Date(newFlight.end);
            /*
                console.log(d1 <= d2);
                console.log(d2 <= d3);
                console.log(d1 <= d4);
                console.log(d4 <= d3);
                  */

            if (
                ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
                    (d4 <= d3))
            ) {
                alert("CLASH");
                break;
            }

        }
        // update this to get name and data properly
        // they are being save to new flight, you seperate them before here
        actions.createReservation(newFlight)

        setAllFlights([...allFlights, newFlight]);
    }

    return (
        <div className="App">
            <div className="calendar-header">
                <h1>Calendar</h1>
                <h2>Add New Event</h2>
                <div>
                    <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newFlight.title} onChange={(e) => setNewFlight({ ...newFlight, title: e.target.value })} />
                    <DatePicker style={{ "zIndex": "99999", marginRight: "10px" }} placeholderText="Start Date" selected={newFlight.start} onChange={(start) => setNewFlight({ ...newFlight, start })} showTimeSelect dateFormat="Pp" />
                    <DatePicker style={{ "zIndex": "99999" }} placeholderText="End Date" selected={newFlight.end} onChange={(end) => setNewFlight({ ...newFlight, end })} showTimeSelect dateFormat="Pp" />
                    <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                        Add Event
                    </button>
                </div>
            </div>
            <Calendar localizer={localizer} events={allFlights} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />

        </div>
    );
}


