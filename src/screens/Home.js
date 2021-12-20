import React, { useState, useEffect } from "react";
import DailyRecords from "../components/daily/DailyRecords";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import { stateOptions, defaultStations } from "../data/stateOptions.js";
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton'
function Home() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedState, setSelectedState] = useState({ value: "MN", label: "Minnesota" });
    const [stationOptions, setStationOptions] = useState(defaultStations);
    const [selectedStation, setSelectedStation] = useState({ value: "MSPthr 9", label: "Minneapolis-St Paul Area" });
    const [meta, setMeta] = useState(null);
    const [normals, setNormals] = useState(null);
    const [records, setRecords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const loadingOption = { value: "", label: "Loading stations..." };

    const dt = new Date();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    const year = dt.getFullYear();
    const shortDate = month + "-" + day;
    const longDate = year + "-" + month + "-" + day;
    const dateName = dt.toLocaleString('en-US', { month: 'long' }) + ' ' + day;
    const dataUrl = "https://data.rcc-acis.org/StnData";
    const metaUrl = "https://data.rcc-acis.org/StnMeta";

    useEffect(() => {
        setIsLoading(true);

        const fetchNormals = async () => {
            const normalsQuery = {
                sid: selectedStation.value,
                sDate: longDate,
                eDate: longDate,
                elems: [
                    {
                        "name": "maxt",
                        "interval": "dly",
                        "duration": "dly",
                        "normal": "1",
                        "prec": 0
                    },
                    {
                        "name": "mint",
                        "interval": "dly",
                        "duration": "dly",
                        "normal": "1",
                        "prec": 0
                    }
                ]
            };

            const response = await fetch(dataUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(normalsQuery)
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

        const fetchRecords = async () => {
            const recordsQuery = {
                sid: selectedStation.value,
                elems: [
                    {
                        "name": "maxt",
                        "interval": "dly",
                        "duration": "dly",
                        "smry": {
                            "reduce": "max",
                            "add": "date"
                        },
                        "smry_only": 1,
                        "groupby": ["year", shortDate, shortDate]
                    },
                    {
                        "name": "mint",
                        "interval": "dly",
                        "duration": "dly",
                        "smry": {
                            "reduce": "min", "add": "date"
                        },
                        "smry_only": 1,
                        "groupby": ["year", shortDate, shortDate]
                    }],
                "sid": selectedStation.value, "sDate": "por", "eDate": "por", "meta": ["name", "state", "valid_daterange", "sids"]
            };

            const response = await fetch(dataUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(recordsQuery)
            });
            const json = await response.json();
            setRecords({
                highTemp: json.smry[0][0][0],
                highDate: json.smry[0][0][1] ? new Date(json.smry[0][0][1]) : "",
                lowTemp: json.smry[1][0][0],
                lowDate: json.smry[1][0][1] ? new Date(json.smry[1][0][1]) : "",
            });

            setIsLoading(false);
        }

        if(selectedStation)
        {
        fetchNormals();
        fetchRecords();
        }

    }, [selectedStation]);

    const selectedStateChange = async (e) => {
        setIsLoading(true);
        setSelectedState(e);
        setSelectedStation(null);

        const getStationsQuery = {
            sdate: "1871-01-01",
            edate: "2021-12-31",
            meta: ["name", "sids", "ll"],
            elems: "maxt,mint",
            state: e.value
        };

        const response = await fetch(metaUrl, {
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
                                <Form.Control placeholder={dateName} disabled />
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr />
                </Col>
            </Row>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                {isLoading &&
                    <h1 className="h3 mb-0 text-gray-800"><Skeleton width={500} /></h1>
                }
                {!isLoading &&
                    <h1 className="h3 mb-0 text-gray-800">Historical weather for the {meta ? meta.name : ""}</h1>
                }
            </div>
            <Row>
                <Col xl={3} md={6}>
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Normal High
                                    </div>
                                    {isLoading &&
                                        <div className="h5 mb-0 font-weight-bold text-gray-800"><Skeleton width={100} /></div>
                                    }
                                    {!isLoading &&
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{normals ? `${normals.high}℉` : ""}</div>
                                    }
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={3} md={6}>
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Record High
                                    </div>
                                    {isLoading && 
                                        <div className="h5 mb-0 font-weight-bold text-gray-800"><Skeleton width={100} /></div>
                                    }
                                    {!isLoading &&
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{records ? `${records.highTemp}℉ in ${records.highDate.getFullYear()}` : ""}</div>
                                    }
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={3} md={6}>
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Normal Low
                                    </div>
                                    {isLoading && 
                                        <div className="h5 mb-0 font-weight-bold text-gray-800"><Skeleton width={100} /></div>
                                    }
                                    {!isLoading &&
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{normals ? `${normals.low}℉` : ""}</div>
                                    }
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={3} md={6}>
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Record Low
                                    </div>
                                    {isLoading && 
                                        <div className="h5 mb-0 font-weight-bold text-gray-800"><Skeleton width={100} /></div>
                                    }
                                    {!isLoading &&
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{records ? `${records.lowTemp}℉ in ${records.lowDate.getFullYear()}` : ""}</div>
                                    }
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="mt-4">
                    <DailyRecords selectedStation={selectedStation ? selectedStation.value : null} />
                </Col>
            </Row>

        </>
    )
}

export default Home;