import React, { useState, useEffect } from "react";
import SetLocation from "../components/location/SetLocation";

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateName, setDateName] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [selectedStateStations, setSelectedStateStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [meta, setMeta] = useState(null);
    const [normals, setNormals] = useState(null);
    const [records, setRecords] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    return (
       <SetLocation />
    )
}

export default Home;