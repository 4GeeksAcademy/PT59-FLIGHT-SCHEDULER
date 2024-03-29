import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Thecalender } from "./component/calenderpage";
import Flightactions from "./component/eventmodal";


import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import Profile from "./pages/profile";
import { Single } from "./pages/single";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { ForgotPassword } from "./pages/forgotPassword";

// import "./App.css";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Thecalender />} path="/calenderpage" />
                        <Route element={<Flightactions />} path="/eventmodal" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />

                        <Route element={<Profile />} path="/profile" />

                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ForgotPassword />} path="/forgotPassword" />
                        <Route element={<Single />} path="/single/:theid" />




                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
