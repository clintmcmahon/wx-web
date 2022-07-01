import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">


            
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon">
                    <i className="fas fa-temperature-hot fa-2x"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Are these temps normal?</div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/about">
                    <i className="fas fa-fw fa-info-square"></i>
                    <span>About</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
        </ul>
    )
}

export default Sidebar;