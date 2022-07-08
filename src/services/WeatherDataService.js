const dataUrl = "https://data.rcc-acis.org/StnData";
const metaUrl = "https://data.rcc-acis.org/StnMeta";

export const getRecords = async (selectedStation, startDate, endDate) => {
  const recordsQuery = {
    sid: selectedStation,
    elems: [
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "snow",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
      {
        name: "pcpn",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate],
      },
    ],
    sDate: "por",
    eDate: "por",
    meta: ["name", "state", "valid_daterange", "sids"],
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(recordsQuery),
  });
  const json = await response.json();

  const records = {
    highTemp: json.smry[0][0][0],
    highDate: json.smry[0][0][1] ? new Date(json.smry[0][0][1]) : "",
    lowTemp: json.smry[1][0][0],
    lowDate: json.smry[1][0][1] ? new Date(json.smry[1][0][1]) : "",
    coldHigh: json.smry[2][0][0],
    coldDate: json.smry[2][0][1] ? new Date(json.smry[2][0][1]) : "",
    warmLow: json.smry[3][0][0],
    warmDate: json.smry[3][0][1] ? new Date(json.smry[3][0][1]) : "",
    mostSnow: json.smry[4][0][0],
    mostSnowDate: json.smry[4][0][1] ? new Date(json.smry[4][0][1]) : "",
    mostPrecip: json.smry[5][0][0],
    mostPrecipDate: json.smry[5][0][1] ? new Date(json.smry[5][0][1]) : "",
  };

  return records;
};

export const getMonthlyRecords = async (selectedStation, startDate, endDate) => {
  const recordsQuery = {
    sid: selectedStation,
    elems: [
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
      {
        name: "maxt",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "min",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
      {
        name: "mint",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
      {
        name: "snow",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
      {
        name: "pcpn",
        interval: "dly",
        duration: "dly",
        smry: {
          reduce: "max",
          add: "date",
        },
        smry_only: 1,
        groupby: ["year", startDate, endDate]
      },
    ],
    sDate: "por",
    eDate: "por",
    meta: ["name", "state", "valid_daterange"]
  };

  const response = await fetch(dataUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(recordsQuery),
  });
  const json = await response.json();
  const records = {
    highTemps: json.smry[0],
    lowTemps: json.smry[1],
    coldHighs: json.smry[2],
    warmLows: json.smry[3],
    snows: json.smry[4],
    precips: json.smry[5],
    meta: json.meta
    };

  return records;
};

export const getNormals = async (selectedStation, startDate, endDate) => {

  const normalsQuery = {
    sid: selectedStation,
    sDate: startDate,
    eDate: endDate,
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

  return {
    date: json.data[0][0],
    high: json.data[0][1],
    low: json.data[0][2]
  };
}

export const getRecordHighsAndLows = async (selectedStation, shortDate) => {

  const query = {
    sid: selectedStation,
    sdate: "1870-01-01",
    edate: "2022-12-31",
    elems: [{
      name: "maxt",
      interval: "dly",
      duration: "dly",
      smry: {
        reduce: "max",
        add: "date",
        n: 5
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
        n: 5
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
    body: JSON.stringify(query)
  });

  const data = await response.json();

  let highsData = data.smry[0][0].map(item => {
    var newDate = new Date(item[1]);
    return { temp: item[0], date: newDate.getFullYear() }
  });

  const highs = {
    labels: highsData.map((record) => record.date),
    datasets: [
      {
        label: "High Temperature",
        data: highsData.map((record) => record.temp),
        backgroundColor: 'rgba(231, 8, 8, 0.8)',
      }
    ]
  };

  let lowsData = data.smry[1][0].map(item => {
    var newDate = new Date(item[1]);
    return { temp: item[0], date: newDate.getFullYear() }
  });

  const lows = {
    labels: lowsData.map((record) => record.date),
    datasets: [
      {
        label: "Low Temperature",
        data: lowsData.map((record) => record.temp),
        backgroundColor: 'rgba(8, 17, 231, 0.8)',
      }
    ]
  };

  return { highs, lows };
}
