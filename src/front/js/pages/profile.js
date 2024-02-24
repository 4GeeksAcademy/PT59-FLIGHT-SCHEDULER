import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



//create your first component
const Profile = () => {
        const { store, actions } = useContext(Context);
        const user = store.user;

        return (

                <div className="card mb-3" style={{ "width": "18rem" }}>

                        <div className="card-body">
                                <h3>{user.first_name}</h3>

                                <div className="Card-body-address">
                                        <div className="Card-body-address-icon"><i className="fa-sharp fa-solid fa-location-dot"></i></div>
                                        <div className="address">{user.last_name} </div>
                                </div>
                                <div className="Card-body-tel">
                                        <div className="card-body-tel-icon"><i className="fa-solid fa-phone"></i></div>
                                        <div className="tel">{user.email}</div>
                                </div>                                                               
                        </div>
                </div>   
        );
};


export default Profile;
