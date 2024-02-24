import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

    function handleAddEvent() {
        
        for (let i=0; i<allFlights.length; i++){

            const d1 = new Date (allFlights[i].start);
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
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("CLASH"); 
                break;
             }
    
        }
        
        
        setAllFlights([...allFlights, newFlight]);
    }

    return (
        <div className="App">
            <h1>Calendar</h1>
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
    );
}
