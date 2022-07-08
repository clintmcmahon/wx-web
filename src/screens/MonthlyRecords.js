import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TopNav from "../components/navigation/TopNav"
import * as weatherService from "../services/WeatherDataService";
import Skeleton from 'react-loading-skeleton';

function MonthlyRecords() {
  const [monthName, setMonthName] = useState("");
  const [records, setRecords] = useState(null);
  const state = useSelector((state) => state);
  const selectedDate = state.date;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const dateName = selectedDate.toLocaleString("en-US", { month: "long" });
    setMonthName(dateName);

    const fetchRecords = async () => {
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const startDate = month + "-01";
      const endDate = month + "-" + new Date(selectedDate.getFullYear(), month, 0).getDate();

      const records = await weatherService.getMonthlyRecords(state.location.station, startDate, endDate);

      setRecords(records);
      setIsLoading(false);
    }

    fetchRecords();
  }, [selectedDate])

  const getSnowRecords = (value, date) => {
    if(value && value > 0)
    {
      return (<div>{value}'' <sup>({new Date(date).getFullYear()})</sup></div>)
    }
    else if(value === "T")
    {
      return (<div>T <sup>({new Date(date).getFullYear()})</sup></div>)
    }
      
    return "--";
  }
  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <Row>
          <Col xs={12} className="form-group">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h2 mb-0 text-gray-800">{monthName} Records</h1>
            </div>
            <Row>
              <Col xs={12} className="mb-2">
                <div className="card shadow h-100 py-2">
                  <div className="card-body">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>High
                            <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[0][0]).getFullYear()}-{new Date(records.meta.valid_daterange[0][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                          <th>Low
                          <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[1][0]).getFullYear()}-{new Date(records.meta.valid_daterange[1][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                          <th>Coldest High
                          <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[2][0]).getFullYear()}-{new Date(records.meta.valid_daterange[2][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                          <th>Warmest Low
                          <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[3][0]).getFullYear()}-{new Date(records.meta.valid_daterange[3][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                          <th>Precip
                          <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[4][0]).getFullYear()}-{new Date(records.meta.valid_daterange[4][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                          <th>Snow
                          <div>
                            {!isLoading &&
                              <small>({new Date(records.meta.valid_daterange[5][0]).getFullYear()}-{new Date(records.meta.valid_daterange[5][1]).getFullYear()})</small>
                            }
                            {isLoading &&                            
                              <Skeleton  />
                            }
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading && records && records.highTemps.map((value, index) => {
                          return (<tr key={index}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {records.highTemps[index][0]}°F <sup>({new Date(records.highTemps[index][1]).getFullYear()})</sup>
                            </td>
                            <td>
                              {records.lowTemps[index][0]}°F <sup>({new Date(records.lowTemps[index][1]).getFullYear()})</sup>
                            </td>
                            <td>
                              {records.coldHighs[index][0]}°F <sup> ({new Date(records.coldHighs[index][1]).getFullYear()})</sup>
                            </td>
                            <td>
                              {records.warmLows[index][0]}°F <sup> ({new Date(records.warmLows[index][1]).getFullYear()})</sup>
                            </td>
                            <td>
                              {records.precips[index][0]}<sup>'' ({new Date(records.precips[index][1]).getFullYear()})</sup>
                            </td>
                            <td>
                              {getSnowRecords(records.snows[index][0], records.snows[index][1])}
                            </td>
                          </tr>)
                        })}
                        {isLoading &&
                          <tr>
                            <td colSpan={7}>
                             <Skeleton count={31} />
                            </td>
                            
                          </tr>
                        }
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
