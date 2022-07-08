import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import SetLocation from "../location/SetLocation";

function TopNav(props) {
    return (
        <div className="bg-white topbar mb-4 static-top shadow">
            <Navbar bg="dark" variant="dark" expand="lg" className="d-md-none">
                <Container>
                    <Navbar.Brand href="/">Climate Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/month">Month View</Link>
                            <Link className="nav-link" to="/about">About</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {!props.hideLocation &&
                <div className="p-4">
                    <SetLocation />
                </div>
            }
        </div>
    )
}

export default TopNav;