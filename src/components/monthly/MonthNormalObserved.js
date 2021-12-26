import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
function MonthNormalObserved({ selectedStation, selectedDate }) {
  const [temps, setTemps] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const day = selectedDate.getDate().toString().padStart(2, "0");
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = selectedDate.getFullYear();
  const shortDate = month + "-" + day;
  const dateName = selectedDate.toLocaleString('en-US', { month: 'long' }) + ' ' + day;
  const url = "https://data.rcc-acis.org/StnData";

  useEffect(() => {
    setIsLoading(true);
    const fetchRecords = async () => {

      const _query = {
        sid: selectedStation,
        elems: [
          { name: "maxt" },
          { name: "mint" },
          { name: "maxt", "duration": "dly", "normal": "91", "prec": 1 },
          { name: "mint", "duration": "dly", "normal": "91", "prec": 1 }
        ],
        sid: selectedStation,
        "sDate": year + "-" + month + "-01",
        "eDate": year + "-" + month + "-" + day
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(_query)
      });

      const data = await response.json();

      let highsData = [];
      let lowsData = [];
      let normalsData = [];
      let categories = [];

      data.data.map((item) => {
        const splitDate = item[0].split("-");
        const date = splitDate[1] + "-" + splitDate[2];
        categories.push(date);
        highsData.push([date, parseFloat(item[1])]);
        lowsData.push([date, parseFloat(item[2])]);
        normalsData.push([date, parseFloat(item[3]), parseFloat(item[4])]);
      });

      const options = {
        title: {
          text: 'Monthly temperature trend'
        },

        xAxis: {
          categories: categories
        },

        yAxis: {
          title: {
            text: "Temperature (°F)"
          }
        },

        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: '°F'
        },
        plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
             
          }
      },
        series: [{
          name: 'High',
          color: "#F3453F",
          data: highsData,
          zIndex: 1,
          
        }, 
        {
          name: 'Low',
          color: "#2A4473",
          data: lowsData,
          zIndex: 1,
        },
        {
          name: "Normal Range",
          data: normalsData,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false
          }
        }]
      }

      setTemps(options);

      setIsLoading(false);
    }

    if (selectedStation) {
      fetchRecords();
    }
  }, [selectedStation, selectedDate]);

  return (
    <Row>
      <Col xs={12}>
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">{`Monthly data trends`}</h6>
          </div>
          <div className="card-body">
            {isLoading &&
              <Skeleton count={10} />
            }
            {!isLoading && temps &&
              <HighchartsReact
                highcharts={Highcharts}
                options={temps}
              />
            }
          </div>
        </div>

      </Col>
    </Row>
  );
}

export default MonthNormalObserved;