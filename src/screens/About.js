import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function About() {
  return (
    <>
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="h3 mb-0 text-gray-800">About</h1>
        </Col>
        <Col xs={12} className="mt-2">
          <p>
            I created this site to be a simple dashboard to allow users to
            quickly see how the current temperatures in their area compare to
            historical temperatures for a given date. Utilizing data from the{" "}
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
    </>
  );
}

export default About;
