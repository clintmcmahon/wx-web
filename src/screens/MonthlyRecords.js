import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TopNav from "../components/navigation/TopNav"
import * as weatherService from "../services/WeatherDataService";
import Skeleton from 'react-loading-skeleton';
import SetMonth from "../components/navigation/SetMonth";

function MonthlyRecords() {
  const [monthName, setMonthName] = useState("");
  const [records, setRecords] = useState(null);
  const state = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (state.month) {

      const selectedDate = new Date(state.month + "/01/2022");
      const monthName = selectedDate.toLocaleString("en-US", { month: "long" });

      setMonthName(monthName);

      const fetchRecords = async () => {
        const startDate = state.month + "-01";
        const endDate = state.month + "-" + new Date(selectedDate.getFullYear(), state.month, 0).getDate();
        const records = await weatherService.getMonthlyRecords(state.location.station, startDate, endDate);
        console.log(records)
        setRecords(records);
        setIsLoading(false);
      }

      fetchRecords();
    }
  }, [state.month, state.location.station])

  const getSnowRecords = (value, date) => {
    if (value && value > 0) {
      return (<div>{value}'' <sup>({new Date(date).getFullYear()})</sup></div>)
    }
    else if (value === "T") {
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
              <div>
                <div><SetMonth /></div>
                <h1 className="h2 mt-4 text-gray-800">{monthName} Records</h1>
              </div>
            </div>
            <Row>
              <Col xs={12}>
                <h3>Month records</h3>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          Warmest Avg. Temp{" "}
                          {records ? `(${records.summary.warmestAvgTemp[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records ? `${Math.round(records.summary.warmestAvgTemp[0] * 100) / 100}℉` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Coldest Avg. Temp{" "}
                          {records ? `(${records.summary.coldestAvgTemp[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records ? `${Math.round(records.summary.coldestAvgTemp[0] * 100) / 100}℉` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Wettest{" "}
                          {records ? `(${records.summary.mostPrecip[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records ? `${Math.round(records.summary.mostPrecip[0] * 100) / 100}''` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Driest{" "}
                          {records ? `(${records.summary.leastPrecip[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records && records.summary.leastPrecip[0] !== "T" ? `${Math.round(records.summary.leastPrecip[0] * 100) / 100}''` : ""}

                            {records && records.summary.leastPrecip[0] === "T" ? `Trace` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Most snow{" "}
                          {records ? `(${records.summary.mostSnow[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records && records.summary.mostSnow[0] !== "T" ? `${Math.round(records.summary.mostSnow[0] * 100) / 100}''` : ""}

                            {records && records.summary.mostSnow[0] === "T" ? `Trace` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col s={6} md={2} className="mb-2">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Least snow{" "}
                          {records ? `(${records.summary.leastSnow[1].substring(0, 4)})` : ""}
                        </div>
                        {isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            <Skeleton width={100} />
                          </div>
                        )}
                        {!isLoading && (
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {records &&  records.summary.leastSnow[0] !== "T" ? `${Math.round(records.summary.leastSnow[0] * 100) / 100}''` : ""}

                            {records &&  records.summary.leastSnow[0] === "T" ? `Trace` : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h3>Daily records</h3>
                <hr />
              </Col>
            </Row>
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
                              {!isLoading && records &&
                                <small>({new Date(records.meta.valid_daterange[0][0]).getFullYear()}-{new Date(records.meta.valid_daterange[0][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
                              }
                            </div>
                          </th>
                          <th>Low
                            <div>
                              {!isLoading && records &&
                                <small>({new Date(records.meta.valid_daterange[1][0]).getFullYear()}-{new Date(records.meta.valid_daterange[1][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
                              }
                            </div>
                          </th>
                          <th>Coldest High
                            <div>
                              {!isLoading &&
                                <small>({new Date(records.meta.valid_daterange[2][0]).getFullYear()}-{new Date(records.meta.valid_daterange[2][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
                              }
                            </div>
                          </th>
                          <th>Warmest Low
                            <div>
                              {!isLoading &&
                                <small>({new Date(records.meta.valid_daterange[3][0]).getFullYear()}-{new Date(records.meta.valid_daterange[3][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
                              }
                            </div>
                          </th>
                          <th>Precip
                            <div>
                              {!isLoading &&
                                <small>({new Date(records.meta.valid_daterange[5][0]).getFullYear()}-{new Date(records.meta.valid_daterange[5][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
                              }
                            </div>
                          </th>
                          <th>Snow
                            <div>
                              {!isLoading &&
                                <small>({new Date(records.meta.valid_daterange[4][0]).getFullYear()}-{new Date(records.meta.valid_daterange[4][1]).getFullYear()})</small>
                              }
                              {isLoading &&
                                <Skeleton />
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
