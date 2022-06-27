import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";

HighchartsMore(Highcharts);
HC_exporting(Highcharts);

function NormalSnowfall({ selectedStation, selectedDate }) {
  const [snow, setSnow] = useState(null);
  const [snowAverageTotal, setSnowAverageTotal] = useState(null);
  const [snowObservedTotal, setSnowObservedTotal] = useState(null);
  const [precip, setPrecip] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const day = selectedDate.getDate().toString().padStart(2, "0");
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = selectedDate.getFullYear();
  const url = "https://data.rcc-acis.org/StnData";

  useEffect(() => {
    setIsLoading(true);
    const fetchRecords = async () => {
      let startDate = "";
      let endDate = "";

      if (parseInt(month) > 7) {
        startDate = year + "-07";
        endDate = year + 1 + "-06";
        setTitle(`Snowfall for ${year} - ${year + 1} season`);
      } else {
        startDate = year - 1 + "-07";
        endDate = year + "-06";
        setTitle(`Snowfall for ${year - 1} - ${year} season`);
      }

      const _query = {
        sid: selectedStation,
        sDate: startDate,
        eDate: endDate,
        elems: [
          {
            name: "snow",
            interval: "mly",
            duration: "mly",
            reduce: {
              reduce: "sum",
            },
            normal: "91",
          },
          {
            name: "snow",
            interval: "mly",
            duration: "mly",
            reduce: {
              reduce: "sum",
              add: "mcnt",
            },
          },
        ],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify(_query),
      });

      const data = await response.json();
      let snowAverages = [];
      let _snowAverageTotal = 0;
      let snowObserved = [];
      let _snowObservedTotal = 0;
      let precipData = [];
      let categories = [];
      if (data && data.data && data.data.length > 0) {
        data.data.map((item) => {
          const date = item[0];
          categories.push(date);
          let average = parseFloat(item[1]);
          let observed = parseFloat(item[2][0]);
          snowAverages.push(average);
          snowObserved.push(observed);

          _snowAverageTotal += !isNaN(average) ? average : 0;
          _snowObservedTotal += !isNaN(observed) ? observed : 0;
        });
      }

      setSnowAverageTotal(_snowAverageTotal);
      setSnowObservedTotal(_snowObservedTotal);
      const options = {
        chart: {
          type: "column",
        },
        title: {
          text: title ? title : "",
        },

        xAxis: {
          categories: categories,
        },

        yAxis: {
          title: {
            text: "Inches",
          },
        },

        tooltip: {
          crosshairs: true,
          shared: true,
          valueSuffix: " inches",
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: "Normal",
            color: "#F3453F",
            data: snowAverages,
          },
          {
            name: "Observed",
            color: "#2A4473",
            data: snowObserved,
          },
        ],
      };

      setSnow(options);
      setIsLoading(false);
    };

    if (selectedStation) {
      fetchRecords();
    }
  }, [selectedStation, selectedDate]);

  if (snowObservedTotal && snowAverageTotal) {
    return (
      <Row>
        <Col xs={12}>
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {title ? title : ""}
              </h6>
            </div>
            {!isLoading && snowObservedTotal && snowAverageTotal && (
              <div>
                <Row>
                  <Col s={6} md={4} className="mb-2">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Observed snowfall
                            </div>
                            {isLoading && (
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                <Skeleton width={100} />
                              </div>
                            )}
                            {!isLoading && (
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {snowObservedTotal
                                  ? snowObservedTotal.toFixed(2) + "''"
                                  : ""}
                              </div>
                            )}
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-temperature-hot fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col s={6} md={4} className="mb-2">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Average snowfall
                            </div>
                            {isLoading && (
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                <Skeleton width={100} />
                              </div>
                            )}
                            {!isLoading && (
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {snowAverageTotal
                                  ? snowAverageTotal.toFixed(2) + "''"
                                  : ""}
                              </div>
                            )}
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-temperature-frigid fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="card-body">
                  {isLoading && <Skeleton count={10} />}
                  {!isLoading && snow && (
                    <HighchartsReact highcharts={Highcharts} options={snow} />
                  )}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    );
  }

  return null;
}

export default NormalSnowfall;
