import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import SetLocation from "../location/SetLocation";

function TopNav() {
    return (
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <SetLocation />
        </nav>
    )
}

export default TopNav;