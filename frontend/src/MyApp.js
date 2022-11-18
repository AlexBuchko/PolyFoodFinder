import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import MainPage from "./MainPage";

function MyApp() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/foods/:id" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default MyApp;
