import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DailyRecords({ selectedStation }) {
  const [highs, setHighs] = useState(null);
  const [lows, setLows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dt = new Date();
  const day = dt.getDate().toString().padStart(2, "0");
  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, "0");
  const shortDate = month + "-" + day;
  const dateName = dt.toLocaleString('en-US', { month: 'long' }) + ' ' + day;

  useEffect(() => {
    setIsLoading(true);
    const fetchRecords = async () => {

      const _query = {
        sid: selectedStation,
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
            shortDate,
            shortDate
          ]
        },
        {
          name: "mint",
          interval: "dly",
          duration: "dly",
          smry: {
            reduce: "min",
            add: "date",
            n: 10
          },
          smry_only: 1,
          groupby: [
            "year",
            shortDate,
            shortDate
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

      let highsData = data.smry[0][0].map(item => {
        var newDate = new Date(item[1]);
        return { temp: item[0], date: newDate.getFullYear() }
      }).sort((a, b) => a.date > b.date ? 1 : -1);;

      setHighs({
        labels: highsData.map((record) => record.date),
        datasets: [
          {
            label: "High Temperature",
            data: highsData.map((record) => record.temp),
            backgroundColor: 'rgba(231, 8, 8, 0.8)',
          }
        ]
      });

      let lowsData = data.smry[1][0].map(item => {
        var newDate = new Date(item[1]);
        return { temp: item[0], date: newDate.getFullYear() }
      }).sort((a, b) => a.date > b.date ? 1 : -1);;

      setLows({
        labels: lowsData.map((record) => record.date),
        datasets: [
          {
            label: "Low Temperature",
            data: lowsData.map((record) => record.temp),
            backgroundColor: 'rgba(8, 17, 231, 0.8)',
          }
        ]
      });

      setIsLoading(false);
    }

    fetchRecords();
  }, [selectedStation]);

  return (
    <Row>
      <Col xs={12} md={6}>
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">{`Top Ten Record High Temperatures For ${dateName}`}</h6>
          </div>
          <div className="card-body">
            {highs &&
              <BarChart
                chartData={highs} />
            }
          </div>
        </div>

      </Col>
      <Col xs={12} md={6}>
      <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">{`Top Ten Record Low Temperatures For ${dateName}`}</h6>
          </div>
          <div className="card-body">
            {lows &&
              <BarChart
                title={`Top Ten Record Low Temperatures For ${dateName}`}
                chartData={lows} />
            }
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default DailyRecords;