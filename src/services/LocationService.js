import stationData from "../data/stationData.json";

export const setLocation = (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    document.cookie="location=" + jsonValue;
  } catch (e) {
    // saving error
  }
};

export const getLocation = () => {
  try {
    const jsonValue = localStorage.getItem("location");
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    
    if (cookie["location"]) {
      console.log("Found location:" + JSON.stringify(cookie["location"]));
      return JSON.parse(cookie["location"]);
    }
    else
    {
      return getDefaultLocation();
    }

  } catch (e) {
    console.log("error");
  }
};

export const getDefaultLocation = () => { 
  const defaultState = "AL";
  const defaultStateStations = getStationsByState(defaultState);
  return {
    state: defaultState,
    station: defaultStateStations[0].sids[0],
  };
}

export const getStationsByState = (stateShortCode) => {
  const state = stationData.find(
    (state) => state.shortCode.toLowerCase() === stateShortCode.toLowerCase()
  );
  if (state) {
    const stations =  state.stations.filter((station) =>
      station.name.toLowerCase().endsWith("area")
    ).sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    
    return stations;
  }

  return null;
};

export const getStationIdByStateAndStationName = (state, stationName) => {
  const stations = getStationsByState(state);
  if (stations) {
    return stations.find(
      (station) => station.name.toLowerCase() === stationName.toLowerCase()
    );
  }

  return null;
};
