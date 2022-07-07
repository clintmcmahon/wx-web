import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TopNav from "../components/navigation/TopNav"
import * as weatherService from "../services/WeatherDataService";

function MonthlyRecords() {
  const [monthName, setMonthName] = useState("");
  const [records, setRecords] = useState(null);
  const state = useSelector((state) => state);
  const selectedDate = state.date;

  useEffect(() => {
    const dateName = selectedDate.toLocaleString("en-US", { month: "long" });
    setMonthName(dateName);

    const fetchRecords = async () => {
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const startDate = month + "-01";
      const endDate = month + "-" + new Date(selectedDate.getFullYear(), month, 0).getDate();
    
      const records = await weatherService.getMonthlyRecords(state.location.station, startDate, endDate);

      setRecords(records);
    }

    fetchRecords();
  }, [selectedDate])

  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <Row>
          <Col xs={12} className="form-group">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h2 mb-0 text-gray-800">{monthName}</h1>
            </div>
            <Row>
              <Col xs={12} className="mb-2">
                <div className="card shadow h-100 py-2">
                  <div className="card-body">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>High</th>
                          <th>Low</th>
                          <th>Coldest High</th>
                          <th>Warmest Low</th>
                          <th>Precip</th>
                          <th>Snow</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records && records.highTemps.map((value, index)=>{
                          return (<tr key={index}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {records.highTemps[index][0]} ({new Date(records.highTemps[index][1]).getFullYear()})
                            </td>
                            <td>
                              {records.lowTemps[index][0]} ({new Date(records.lowTemps[index][1]).getFullYear()})
                            </td>
                            <td>
                              {records.coldHighs[index][0]} ({new Date(records.coldHighs[index][1]).getFullYear()})
                            </td>
                            <td>
                              {records.warmLows[index][0]} ({new Date(records.warmLows[index][1]).getFullYear()})
                            </td>
                            <td>
                              {records.precips[index][0]} ({new Date(records.precips[index][1]).getFullYear()})
                            </td>
                            <td>
                              {records.snows[index][0]} ({new Date(records.snows[index][1]).getFullYear()})
                            </td>
                          </tr>)
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MonthlyRecords;
