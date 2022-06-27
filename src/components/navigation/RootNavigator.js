

import React, {useEffect} from "react";
import Home from "../../screens/Home";
import About from "../../screens/About";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Routes, Route } from "react-router-dom";
import * as locationService from "../../services/LocationService";
import { useSelector, useDispatch } from 'react-redux';
import { changeLocation } from '../../actions/locations';

function RootNavigator() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        const getLocation = async () => {
            let location = await locationService.getLocation();
            if (location) {
                dispatch(changeLocation(location));
            }
            else
            {
                alert('no location found')
            }
        }

        if (!state.location) {
            getLocation();
        }
    }, [])

    if (!state.location) {
        return (
            <Row>
                <Col>
                    <div>
                        Loading...
                    </div>
                </Col>
            </Row>
        )
    }
    return (
        <Row>
            <Col xs={12}>
                <div id="content-wrapper" className="d-flex flex-column">
                    <Row>
                        <Col className="mt-4">
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="*" element={<Home />} />
                            </Routes>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default RootNavigator;
