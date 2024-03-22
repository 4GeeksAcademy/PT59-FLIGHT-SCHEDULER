import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



//create your first component
const Profile = () => {
        const { store, actions } = useContext(Context);
        const user = store.user;

        const [first_name, setFirst_name] = useState();
        const [last_name, setLast_name] = useState();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [reservations, setReservations] = useState([])
        const [currentView, setCurrentView] = useState("update")
        // let jumbotron = null;
        useEffect(() => {
                actions.getReservation(); 
            }, [actions]);
                // const fetchData = async () => {
                //   actions.getReservation(); // Assuming actions.getReservation() does not need to be awaited or is not async. If it is, you should await it here.

                //   // Fetch reservations from the backend
                //   let response = await fetch(process.env.BACKEND_URL + "/api/reservation", {
                //     headers: {
                //         "Authorization": "Bearer " + getStore().token, // Ensure getStore() is accessible or replace with the actual way of accessing the token.
                //     },
                  
                  
                //   let data = await response.json();

                  // Assuming setReservations and setStore are useState setter functions from the useContext or useState hook.
        //           setReservations(store.reservation); // This seems misplaced. Should probably be set after you update the store with new data.

        //           setStore({ 
        //             reservation: data.map((event) => ({
        //               id: event.id,
        //               title: event.name,
        //               start: event.start_date,
        //               end: event.end_date,
        //             })) 
        //           });
        //         };

        //         fetchData().catch(console.error); // It's important to catch and handle any errors that might occur during the fetch.
        //       }, []);

        // deal with updating a user using action in the flux
        // const handleUpdate = () => { }

        let jumbotron = null;
        if (currentView === "update") {
                jumbotron = (
                        <div className="jumbotron">
                                <div className="d-flex justify-content-between">
                                        <div className="mb-3" onClick={() => setCurrentView("update")}>
                                                <h1>Update Profile</h1>
                                        </div>
                                        <div className="mb-3" onClick={() => setCurrentView("reservations")}>
                                                <h1>Currents Reservations</h1>
                                        </div>
                                </div>
                                {store.reservation && store.reservation.length > 0? (
                                        <ul>
                                                {store.reservation.map((reservation) =>)
                                                <li key={reservation.id}>
                                                        {reservation.title} - {format(new Date(reservation.start), )}
                                                </ul>

                                                }
                                )}
                                <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">First Name</label>
                                        <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                                        <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
                                </div>

                                <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
                                </div>

                                <div className="mzb-3">
                                        <label htmlFor="formGroupExampleInput3" className="form-label">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter your physical address here"></input>
                                </div>
                                <div className="button d-flex flex-column justify-content-between">
                                        <Link to={"/"} type="button" className="btn btn-success" onClick={() => actions.updateProfile(first_name, last_name, email, password, id)}>Update Password </Link>
                                        <Link type="button" to={"/"} className="btn btn-danger  justify-content-center">Cancel</Link>
                                        <Link type="button" to={"/"} className="btn btn-primary justify-content-right">Go to Home page</Link>
                                </div>
                        </div >
                )
        }
        else {
                jumbotron = (
                        <div className="jumbotron">

                                <div className="d-flex justify-content-between">
                                        <div className="mb-3" onClick={() => setCurrentView("update")}>
                                                <h1>Update Profile</h1>
                                        </div>
                                        <div className="mb-3" onClick={() => setCurrentView("reservations")}>
                                                <h1>Currents Reservations</h1>
                                        </div>
                                </div>
                                <div>Name:</div>
                                        <div>Date/Time:</div>
                        </div >
                )
        }
        return (

                <div className="card mb-3 mx-auto" style={{ "width": "36rem" }}>
                        {jumbotron}
                        {/* 
                        <div className="Card-body-tel">

                                <div className="email">{user.email}</div>

                                <div className="password">{user.password}</div>
                        </div> */}

                </div>
        );
};

export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";

// // Create your first component
// const Profile = () => {
//         const { store, actions } = useContext(Context);

//         const [reservations, setReservations] = useState([]);
//         const [currentView, setCurrentView] = useState("update");

//         // Initial states for form fields
//         const [first_name, setFirst_name] = useState("");
//         const [last_name, setLast_name] = useState("");
//         const [email, setEmail] = useState("");
//         const [password, setPassword] = useState("");

//         useEffect(() => {
//                 const fetchData = async () => {
//                         // Fetch reservations from the backend
//                         let response = await fetch(process.env.BACKEND_URL + "/api/reservation", {
//                                 headers: {
//                                         "Authorization": "Bearer " + getStore().token,
//                                 },
//                         });
//                         let data = await response.json();

//                         // Update local reservations state
//                         setReservations(data.map((event) => ({
//                                 id: event.id,
//                                 title: event.name,
//                                 start: event.start_date,
//                                 end: event.end_date,
//                         })));
//                 };

//                 fetchData().catch(console.error);
//         }, [store.token]); // Depend on store.token to re-fetch when it changes

//         const handleUpdate = () => {
//                 // Implement user profile update logic here
//                 // You might want to call something like actions.updateProfile(...)
//         };

//         // Conditional rendering logic for `currentView`
//         let jumbotron;
//         if (currentView === "update") {
//                 <div className="jumbotron">
//                         <div className="d-flex justify-content-between">
//                                 <div className="mb-3" onClick={() => setCurrentView("update")}>
//                                         <h1>Update Profile</h1>
//                                 </div>
//                                                          <div className="mb-3" onClick={() => setCurrentView("reservations")}>
//                                                                  <h1>Currents Reservations</h1>
//                                                          </div>
//                                                  </div>
//                                                  <div className="mb-3">
//                                                          <label htmlFor="formGroupExampleInput2" className="form-label">First Name</label>
//                                                          <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
//                                                  </div>
//                                                  <div className="mb-3">
//                                                          <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
//                                                          <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
//                                                  </div>

//                                          <div className="mb-3">
//                                                          <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
//                                                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email address here"></input>
//                                                  </div>

//                                                  <div className="mzb-3">
//                                                          <label htmlFor="formGroupExampleInput3" className="form-label">Password</label>
//                                                          <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter your physical address here"></input>
//                                                  </div>
//                                                  <div className="button d-flex flex-column justify-content-between">
//                                                          <Link to={"/"} type="button" className="btn btn-success" onClick={() => actions.updateProfile(first_name, last_name, email, password, id)}>Update Password </Link>
//                                                          <Link type="button" to={"/"} className="btn btn-danger  justify-content-center">Cancel</Link>
//                                                  <Link type="button" to={"/"} className="btn btn-primary justify-content-right">Go to Home page</Link>
//                                          </div>
//                                        </div >

//         }
//         else {
//                 jumbotron = (
//                         <div className="jumbotron">

//                                 <div className="d-flex justify-content-between">
//                                         <div className="mb-3" onClick={() => setCurrentView("update")}>
//                                                 <h1>Update Profile</h1>
//                                         </div>
//                                         <div className="mb-3" onClick={() => setCurrentView("reservations")}>
//                                                 <h1>Currents Reservations</h1>
//                                         </div>
//                                 </div>
//                                 <div>Name:</div>
//                                 <div>Date/Time:</div>
//                         </div >
//                 )
//         }
//         return (
//                 <div className="card mb-3 mx-auto" style={{ width: "36rem" }}>
//                         {jumbotron}
//                 </div>
//         );
// };

// export default Profile;
