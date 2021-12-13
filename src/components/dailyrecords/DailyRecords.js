import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";

import { stateOptions, defaultStations } from "../data/stateOptions.js";
import Select from 'react-select';

function DailyRecords() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedState, setSelectedState] = useState({ value: "MN", label: "Minnesota" });
  const [stationOptions, setStationOptions] = useState(defaultStations);
  const [selectedStation, setSelectedStation] = useState({ value: "MSPthr 9", label: "Minneapolis-St Paul Area" });
  const [records, setRecords] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadingOption = {value:"", label: "Loading stations..."};

  useEffect(() => {
    setIsLoading(true);
    const fetchRecords = async () => {
      const dt = new Date();
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
      const day = dt.getDate().toString().padStart(2, "0");
      let _selectedDate = month + "-" + day;

      const _query = {
        sid: selectedStation.value,
        sdate: "1871-01-01",
        edate: "2021-12-31",
        elems: [{
          name: "maxt",
          interval: "dly",
          duration: "dly",
          smry: {
            reduce: "max",
            add: "date",
            n: 10
          },
          smry_only: 1,
          groupby: [
            "year",
            _selectedDate,
            _selectedDate
          ]
        }],
        meta: [
          "name",
          "state",
          "valid_daterange"
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
      const data = await response.json();
      setMeta(data.meta);
      
      let chartData = data.smry[0][0].map(item => {
        var newDate = new Date(item[1]);
        return { temp: item[0], date: newDate.getFullYear() }
      }).sort((a, b) => a.date > b.date ? 1 : -1);;

      setRecords({
        labels: chartData.map((record) => record.date),
        datasets: [
          {
            label: "High temp",
            data: chartData.map((record) => record.temp),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',

          }
        ]
      });

      setSelectedDate(_selectedDate);
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
    <Row>
      <Col>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row>
                <Col xs={4}>
                  <Form.Label>State</Form.Label>
                  <Select
                    value={selectedState}
                    onChange={selectedStateChange}
                    options={stateOptions ? stateOptions : []}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Label>Station</Form.Label>
                  <Select
                    value={!isLoading ? selectedStation : loadingOption}
                    onChange={(e) => setSelectedStation(e)}
                    options={stationOptions && !isLoading ? stationOptions : []} />
                </Col>
                <Col xs={4}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control placeholder={selectedDate} disabled />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
        {records &&
          <BarChart chartData={records} />
        }
      </Col>
    </Row>
  );
}

export default DailyRecords;