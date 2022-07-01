import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import SetLocation from "../location/SetLocation";

function TopNav() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white topbar mb-4 static-top shadow">
            <button aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed"><span className="navbar-toggler-icon"></span></button>
            <div className="navbar-collapse collapse d-md-none" id="basic-navbar-nav">
                <div className="me-auto navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/about">About</Link>
                </div>
            </div>
            <SetLocation />
        </nav>
    )
}

export default TopNav;