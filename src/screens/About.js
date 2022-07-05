import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopNav from "../components/navigation/TopNav"
function About() {
  return (
    <>
    <TopNav hideLocation={true} />
    <div className="container-fluid">
      <Row className="mb-4 mt-4">
        <Col xs={12}>
          <h1 className="h3 mb-0 text-gray-800">About</h1>
        </Col>
        <Col xs={12} className="mt-2">
          <p>
            Look up record temperatures and normal temperatures for cities across the United States. With this dashboard
            you can find out what the record temperature is for any given date for major cities in the US. <br /><br />
            Along with record highs and lows, this site also displays:
            <ul>
              <li>
                Top ten record high temperatures
              </li>
              <li>
                Top ten record low temperatures
              </li>
              <li>
                Record highest nightime low temperature
              </li>
              <li>
                Recorded vs normal precipitation for the year
              </li>
              <li>
                Recorded vs normal snowfall for the year
              </li>
            </ul>
            
            Utilizing data from the{" "}
            <a
              href="https://www.rcc-acis.org/aboutacis_overview.html"
              target="_blank"
              rel="nofollow noreferrer"
            >
              Regional Climate Centers - Applied Climate Information System
            </a>{" "}
            web service this site displays record and normal temperatures for a
            given date from weather stations across the United States.
          </p>
        </Col>
        <Col xs={12} className="mt-2">
          <h3 className="text-gray-800">Contact</h3>
          Feel free to email me with bug reports, feature requests or if you
          found any inaccurate data at{" "}
          <a href="mailto:clintmcmahon@pm.me?subject=Hello, weather nerd">
            clintmcmahon@pm.me
          </a>{" "}
          or{" "}
          <a href="https://twitter.com/cwmcmhn" target="_blank" rel="noref">
            @cwmcmhn
          </a>
          .
        </Col>
        <Col xs={12} className="mt-2">
          <h3 className="text-gray-800">Data sources</h3>
          All the data for this site comes from the{" "}
          <a
            href="https://www.rcc-acis.org/aboutacis_overview.html"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Regional Climate Centers - Applied Climate Information System
          </a>{" "}
          and the queries were built using{" "}
          <a
            href="https://xmacis.rcc-acis.org/"
            target="_blank"
            rel="nofollow noreferrer"
          >
            xmACIS2 Query Builder
          </a>
          . The stations listed are the different ThreadEx, which stands for
          Threaded Extremes, stations that take weather data recorded at
          National Weather Service Automated Surface Observing Stations (ASOS)
          and merges it together with other nearby data to create a single data
          set of weather information. To learn more about ThreadEx, visit the{" "}
          <a
            href="http://threadex.rcc-acis.org/help/about.html"
            target="_blank"
            rel="nofollow noreferrer"
          >
            project background page
          </a>
          .
        </Col>
      </Row>
    </div>
    </>
  );
}

export default About;
