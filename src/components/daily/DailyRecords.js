import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DailyRecords({selectedStation}) {
  const [records, setRecords] = useState(null);
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
      
      let chartData = data.smry[0][0].map(item => {
        var newDate = new Date(item[1]);
        return { temp: item[0], date: newDate.getFullYear() }
      }).sort((a, b) => a.date > b.date ? 1 : -1);;

      setRecords({
        labels: chartData.map((record) => record.date),
        datasets: [
          {
            label: "High Temperature",
            data: chartData.map((record) => record.temp),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',

          }
        ]
      });

      setIsLoading(false);
    }

    fetchRecords();
  }, [selectedStation]);

  return (
    <Row>
      <Col>
        {records &&
          <BarChart 
            title={`Top Ten Record High Temperatures For ${dateName}`}
            chartData={records} />
        }
      </Col>
    </Row>
  );
}

export default DailyRecords;