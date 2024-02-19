import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="row">
			<img src="..." class="img-fluid" alt="..."></img>
			</div>
		<div className="text-center mt-5">
			<div className="row"><button type="button" class="btn btn-danger">Schedule your flight! HERE!</button></div>
			<div className="row"><button type="button" class="btn btn-primary">Edit your flight! HERE!</button></div>

		</div>
		</div>
	);
};
