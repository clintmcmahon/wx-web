import React, { useState, useEffect } from "react";
import DailyRecords from "../components/dailyrecords/DailyRecords";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import { stateOptions, defaultStations } from "../data/stateOptions.js";
import Select from 'react-select';

function Home() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedState, setSelectedState] = useState({ value: "MN", label: "Minnesota" });
    const [stationOptions, setStationOptions] = useState(defaultStations);
    const [selectedStation, setSelectedStation] = useState({ value: "MSPthr 9", label: "Minneapolis-St Paul Area" });
    const [meta, setMeta] = useState(null);
    const [normals, setNormals] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const loadingOption = { value: "", label: "Loading stations..." };

    const dt = new Date();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    const year = dt.getFullYear();
    const shortDate = month + "-" + day;
    const longDate = year + "-" + month + "-" + day;
    const dateName = dt.toLocaleString('en-US', { month: 'long' }) + ' ' + day;

    useEffect(() => {
        setIsLoading(true);
        const fetchRecords = async () => {

            const _query = {
                sid: selectedStation.value,
                sDate: longDate,
                eDate: longDate,
                elems: [
                    {
                        "name": "maxt",
                        "interval": "dly",
                        "duration": "dly",
                        "normal": "1",
                        "prec": 2
                    },
                    {
                        "name": "mint",
                        "interval": "dly",
                        "duration": "dly",
                        "normal": "1",
                        "prec": 2
                    }
                ]
            };

            const url = "https://data.rcc-acis.org/StnData";

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(_query)
            });
            const json = await response.json();

            setMeta(json.meta);
            setNormals({
                date: json.data[0][0],
                high: json.data[0][1],
                low: json.data[0][2]
            });

            setIsLoading(false);
        }

        fetchRecords();
    }, [selectedStation]);

    const selectedStateChange = async (e) => {
        setIsLoading(true);
        setSelectedState(e);

        const getStationsQuery = {
            sdate: "1871-01-01",
            edate: "2021-12-31",
            meta: ["name", "sids"],
            elems: "maxt,mint",
            state: e.value
        };

        const url = "http://data.rcc-acis.org/StnMeta";

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(getStationsQuery)
        });

        const data = await response.json();

        const stationsData = data.meta.filter(station => {
            return station.name.toLowerCase().includes("area")
        }).sort((a, b) => a.name > b.name ? 1 : -1)
            .map((station) => {
                return { label: station.name, value: station.sids[0] }
            });

        setStationOptions(stationsData);
        setSelectedStation(stationsData[0]);
        setIsLoading(false);

    }

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Row>
                            <Col md={4}>
                                <Form.Label>State</Form.Label>
                                <Select
                                    className="wx-select"
                                    value={selectedState}
                                    onChange={selectedStateChange}
                                    options={stateOptions ? stateOptions : []}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Station</Form.Label>
                                <Select
                                    className="wx-select"
                                    value={!isLoading ? selectedStation : loadingOption}
                                    onChange={(e) => setSelectedStation(e)}
                                    options={stationOptions && !isLoading ? stationOptions : []} />
                            </Col>
                            <Col md={4}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control placeholder={selectedDate} disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr />
                </Col>
            </Row>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Current and historical weather for {meta ? meta.name : ""}</h1>
            </div>
            <Row>
                <Col xl={3} md={6}>
                    <div class="card border-left-danger shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Normal High</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{normals ? `${normals.high} ℉` : ""}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={3} md={6}>
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Normal Low</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{normals ? `${normals.low} ℉` : ""}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <DailyRecords selectedStation={selectedStation.value} />
            </Row>

        </>
    )
}

export default Home;